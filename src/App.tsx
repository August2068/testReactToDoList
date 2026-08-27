import React, { useState } from 'react'
import './App.css'

function App() {
  const [toDoList, setTodoList] = useState<string[]>([]);
  const [task, setTask] = useState('');
  function addToDo(){
    task!=""?setTodoList([...toDoList,task]):alert("You cannot add an empty task");
  }
  return (
    <>
    <div>
      <label>
        To do : <input placeholder='Task' value={task} onChange={e=> setTask(e.target.value)}></input>
      </label>
      <button onClick={addToDo}>add</button>
    </div>
    <div>
      <ul>
        {toDoList.map((task)=>(
          <div>
            <li key={task}>{task}</li>
            <button>edit</button>
            <button>remove</button>
          </div>
          
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
