import React, { useState, useEffect } from 'react';
import Task from './Task';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, addDoc,getDoc,updateDoc,doc,deleteDoc } from 'firebase/firestore';
import { auth } from '../Config/firebase';
import { v4 as uuidv4 } from 'uuid';
import img from '../Images/Golden line div.png'

const db = getFirestore();

function TaskRectangle() {
  const [task, setTask] = useState({
    identification: uuidv4(),
    taskText: '',
    imp: '',
    dif: '',
    sum: 0,
    isDone: false,
  });
  const [toDoArray, setToDoArray] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        // Listen for changes to the user's tasks collection
        const q = query(collection(db, `users/${user.uid}/tasks`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newToDoArray = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            newToDoArray.push({ id: doc.id, ...data });
          });
          newToDoArray.sort((a, b) => b.sum - a.sum); // sort by sum in descending order
          setToDoArray(newToDoArray);
        });

        return unsubscribe;
      } else {
        setToDoArray([]);
      }
    });
  }, [user]);

  function sortTasks(toDoArray) {
    const newToDoArray = [...toDoArray];
    newToDoArray.sort((a, b) => b.sum - a.sum);
    return newToDoArray;
  }

  const addToTaskArray = async (e) => {
    e.preventDefault();
    const newTask = { ...task, sum: parseInt(task.imp) + parseInt(task.dif) };
    if (user) {
      await addDoc(collection(db, `users/${user.uid}/tasks`), newTask);
    } else {
      setToDoArray(sortTasks([...toDoArray, newTask]));
    }
    setTask({
      taskText: '',
      imp: '',
      dif: '',
      sum: 0,
      isDone: false,
      identification: uuidv4(),
    });
  };

  const deleteTask = async (id,e,taskText) =>{
    e.preventDefault();
      if (user) {
        await deleteDoc(doc(db, `users/${user.uid}/tasks/${id}`));
      } else {
        const newToDoArray = [...toDoArray];
        const index = newToDoArray.findIndex((task) => task.taskText === taskText);
        newToDoArray.splice(index, 1);
        setToDoArray(newToDoArray);
      } 
  }

  const toggleDone = async (id,identification) => {
    if (user) {
      const taskRef = doc(db, `users/${user.uid}/tasks/${id}`);
      const taskSnapshot = await getDoc(taskRef);
      const taskData = taskSnapshot.data();
      await updateDoc(taskRef, { isDone: !taskData.isDone });
    } else {
      
      
      const newToDoArray = [...toDoArray];
      const index = newToDoArray.findIndex((task) => task.identification === identification);
      newToDoArray[index] = { ...newToDoArray[index], isDone: !newToDoArray[index].isDone };
      setToDoArray(newToDoArray);
    }
  };

  return (
    <div className='taskRectangle'>
      <h1 className='masterychecklist'>Mastery checklist</h1>
      <form className='RecFrom'>
        
        <input placeholder='Type task you want to finish' className='text-input input' type='text' value={task.taskText} onChange={(e) => setTask({ ...task, taskText: e.target.value })} />
        <div className='cont-num-inputs'>
          <input placeholder='Imp' type='number' className='num-input input' value={task.imp} onChange={(e) => setTask({ ...task, imp: e.target.value })} />
          <input placeholder='Dif' type='number' className='num-input input' value={task.dif} onChange={(e) => setTask({ ...task, dif: e.target.value })} />
          <button onClick={(e) => addToTaskArray(e)} style={{cursor: 'pointer'}}className='num-input input'  >+</button>  
        </div>
      </form>
      <img src={img} alt="" className='img-under-form'/>
      <div className='tasks-container'>
        <Task toDoArray={toDoArray} setToDoArray={setToDoArray} deleteTask={deleteTask} toggleDone={toggleDone} user={user} />
      </div>
    </div>
  );
}

export default TaskRectangle;
