import React from 'react';

function Task({ toDoArray, toggleDone,  deleteTask}) {
  
  const handleDeleteTask =(id,e,taskText) => {
    deleteTask(id,e,taskText);
  };

  const handleToggleDone = (id,taskText) => {
    
    toggleDone(id,taskText);
  };

  
  return (
    <div>
      {toDoArray.map((elemnt, index) => (
        <div className="task-div" key={index}>
          <h3 onClick={() => handleToggleDone(elemnt.id,elemnt.taskText)} className={elemnt.isDone ? "done" : "taskText"}>{elemnt.taskText}</h3>
          <div className="scores">
            <h3 className="score">{elemnt.imp}</h3>
            <h3 className="score">{elemnt.dif}</h3> {/* Edit on double click */}
            <button>Edit</button>
            <button onClick={(e) => handleDeleteTask(elemnt.id,e,elemnt.taskText)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Task;
