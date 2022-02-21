import './App.css';
import Header from './componenets/Header';
import Tasks from './componenets/Tasks';
import { useState } from 'react';
import AddTask from './componenets/AddTask';
import { useEffect } from 'react';
function App() {

  const [showAddTask,setShowAddTask]=useState(true)
  const [tasks,setTasks]=useState([])
  useEffect(()=>{

    const getTasks=async()=>
    {
      const tasksFromServer=await fetchTasks()
      setTasks(tasksFromServer)

    }
    
    getTasks()
  },[])
  // fetch tasks
const fetchTasks=async()=>
    {
      const res =await fetch('http://localhost:5000/tasks')
      const data=await res.json()
      return data
    }
    // delete task
    const deleteTask =(id) =>
    {
      setTasks(tasks.filter((task)=>task.id!==id))
    }
    // toggle reminder
    const toggleReminder=(id)=>
    {
      setTasks(tasks.map((task)=>task.id===id?{...task,reminder:!task.reminder}:task))
      console.log(id)
    }
    // add task
    const addTask= (task)=>
    {
     const id=Math.floor(Math.random()*10000)+1
     const newTask={id,...task}
     setTasks([...tasks,newTask])
    }
  return (
    <div className="container">
      
      <Header  onAdd={()=> setShowAddTask (!showAddTask)} showAdd={showAddTask}></Header>
      {showAddTask && <AddTask onAdd={addTask}></AddTask> }
      { tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks> :'NO TASKS TO SHOW'}
      </div>
    
  );
}

export default App;
