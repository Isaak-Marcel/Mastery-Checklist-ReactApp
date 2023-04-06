import React from 'react';


function Task({ toDoArray, toggleDone,  deleteTask}) {
  
  const handleDeleteTask =(id,e,identification ) => {
    deleteTask(id,e,identification );
  };

  const handleToggleDone = (id,identification ) => {
    console.log(identification )
    toggleDone(id,identification );
  };

  
  return (
    <div>
      {toDoArray.map((elemnt) => (
        <div className={ elemnt.isDone ? "task-div div-done-class": "task-div "} key={elemnt.identification}>
          <h3 onClick={() => handleToggleDone(elemnt.id, elemnt.identification )} className={elemnt.isDone ? "done task-text" : "taskText task-text"}>{elemnt.taskText}</h3>
          <div className="scores">
            <h3 className="score imp">{elemnt.imp}</h3>
            <h3 className="score dif">{elemnt.dif}</h3> {/* Edit on double click */}
            {/* } <button>Edit</button> {*/}
            <button onClick={(e) => handleDeleteTask(elemnt.id,e,elemnt.identification ) } className='delete-button' >Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Task;
