import './App.css';
import Header from './componenets/Header';
import Tasks from './componenets/Tasks';
import { useState } from 'react';
import AddTask from './componenets/AddTask';
import { useEffect } from 'react';
import axios from 'axios';
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
      const res =await axios.get('https://62a31a9721232ff9b2186c2c.mockapi.io/tasks')
      const data=await res.data;
      return data
    }
    // delete task
    const deleteTask =async (id) =>
    {
      //await fetch( `http://localhost:5000/tasks/${id}`,{method :'DELETE'})
      //setTasks(tasks.filter((task)=>task.id!==id))

      // using axios
      await axios({
        method:'delete',url:`https://62a31a9721232ff9b2186c2c.mockapi.io/tasks/${id}`,
        headers:{'Content-type':'application/json'}
      })
      setTasks(tasks.filter((task)=>task.id!==id))
   
    }
      // Fetch Task
  const fetchTask = async (id) => {
    const res = await axios(`https://62a31a9721232ff9b2186c2c.mockapi.io/tasks/${id}`)
    const data = await res.data;

    return data
  }
    // toggle reminder
    const toggleReminder=async(id)=>
    {

    
      const taskToToggle = await fetchTask(id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
  
      const res = await axios( {
        method: 'put',
        url:`https://62a31a9721232ff9b2186c2c.mockapi.io/tasks/${id}`,
        headers: {
          'Content-type': 'application/json',
        },
        data:updTask
      })
  
      const data = await res.data;
     
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        )
      ) 
    }
    // add task
    const addTask= async(task)=>
    {
      
    // const res=await fetch('http://localhost:5000/tasks',{method :'POST',
    // headers:{'Content-type':'application/json'},body:JSON.stringify(task)})
    // const data=await res.json()
    // setTasks([...tasks,data])
  
// using axios
  const res=await axios({
    method:'post',url:'https://62a31a9721232ff9b2186c2c.mockapi.io/tasks',
      data:task,
      headers:{'Content-type':'application/json'}
  })
  const data=res.data;
  setTasks([...tasks,data])



    //  const id=Math.floor(Math.random()*10000)+1
    //  const newTask={id,...task}
    //  setTasks([...tasks,newTask])

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
