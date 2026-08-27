import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [toDoList, setTodoList] = useState<typeof toDo[]>([]);
  const [id, setId] = useState(0);
  const today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate()-1);
  const [toDo, setToDo] = useState({
    id:0,
    name:"",
    checked:false,
    display:true,
    class:"",
    deadline:"",
    completed:""
  });

  useEffect(()=>{
    const data = localStorage.getItem("toDoList");
    if(data!=null){
          setTodoList(JSON.parse(data))
    }
  },[]);
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
    checkList[index].checked?checkList[index].class="checked":checkList[index].class="";
    checkList[index].completed=`${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
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
    checkList[index].deadline=toDo.deadline;
    checkList[index].display=!checkList[index].display;
    setTodoList(checkList);
    setToDo({...toDo,name:""});
  }
  function uncheck(){
    const checklist = document.getElementsByTagName("input");
    for(let i=0;i<checklist.length;i++){
      checklist[i].checked=false;
    }
  }
  function saveToLocal(){
    localStorage.setItem('toDoList',JSON.stringify(toDoList));
  }
  return(
    <>
    <div className='flex'>
      <label>
        To do : <input placeholder='Task' value={toDo.name} onChange={e=> setToDo({...toDo,name:e.target.value})}></input>
      </label>
      <label>
        Deadline : <input type="date" onChange={e=> setToDo({...toDo,deadline:e.target.value})}></input>
      </label>
      <button onClick={()=>addToDo()}>➕</button>
      <button onClick={()=>{
        setTodoList(toDoList.filter(a=>a.checked==false)),uncheck();
      }}>Remove every completed tasks</button>
      <button onClick={saveToLocal}>💾 Save To Do List</button>
    </div>
    <div>
      <ul>
        {toDoList.map((task, i)=>(
          <div className='flex'>
            <input type="checkbox" id={task.name} onChange={()=>checkToDo(i)}></input>
            {task.display && (<div>
              <li key={task.id} className={task.class}>{task.name}</li>
              {task.deadline!=""&& !task.checked &&(<div>
                <p>deadline : {task.deadline}</p>
                {new Date(task.deadline).getTime()<yesterday.getTime()&&<p className="late">You're late</p>}
              </div>)}
              {task.checked &&(<div>
                <p>completed : {task.completed}</p>
              </div>)}
            </div>)}
            {!task.display&& 
            <div className='gap'>
              <input placeholder='Task' value={toDo.name} onChange={e=> setToDo({...toDo,name:e.target.value})}></input>
              <input type="date" onChange={e=> setToDo({...toDo,deadline:e.target.value})}></input>
              <button onClick={()=>editTask(i)}>💾</button>
            </div>
            }
            {task.display&& <button onClick={()=>displayTask(i)}>✏️</button>}
            
            <button onClick={()=>{
              setTodoList(toDoList.filter(a=>a.id != task.id));
            }}>🚮</button>
          </div> 
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
