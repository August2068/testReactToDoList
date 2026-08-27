import React, { useState } from 'react'
import './App.css'

function App() {
  const [toDoList, setTodoList] = useState<typeof toDo[]>([]);
  const [id, setId] = useState(0);
  const [toDo, setToDo] = useState({
    id:0,
    name:"",
    checked:false,
    display:true
  });
  function addToDo(){
    let curId = id;
    curId+=1;
    setId(curId);
    setToDo({...toDo,id:curId});
    toDo.name!=""?setTodoList([...toDoList,toDo]):alert("You cannot add an empty task");
  }
  function checkToDo(index:number){
    const checkList = toDoList.slice();
    checkList[index].checked=!checkList[index].checked;
    setTodoList(checkList);
  }
  function displayTask(index:number){
    const checkList = toDoList.slice();
    checkList[index].display=!checkList[index].display;
    setTodoList(checkList);
  }
  function editTask(index:number){
    const checkList = toDoList.slice();
    checkList[index].name=toDo.name;
    checkList[index].display=!checkList[index].display;
    setTodoList(checkList);
  }
  return(
    <>
    <div>
      <label>
        To do : <input placeholder='Task' value={toDo.name} onChange={e=> setToDo({...toDo,name:e.target.value})}></input>
      </label>
      <button onClick={addToDo}>add</button>
      <button onClick={()=>{
        setTodoList(toDoList.filter(a=>a.checked==false));
      }}>Remove every done tasks</button>
    </div>
    <div>
      <ul>
        {toDoList.map((task, i)=>(
          <div>
            <input type="checkbox" id={task.name} onChange={()=>checkToDo(i)}></input>
            {task.display && (<li key={task.id} className={task.checked}>{task.name}</li>)}
            {!task.display&& 
            <div>
              <input placeholder='Task' value={toDo.name} onChange={e=> setToDo({...toDo,name:e.target.value})}></input>
              <button onClick={()=>editTask(i)}>save</button>
            </div>
            }
            <button onClick={()=>displayTask(i)}>edit</button>
            <button onClick={()=>{
              setTodoList(toDoList.filter(a=>a.id != task.id));
            }}>remove</button>
          </div> 
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
