import React, { useState, useContext } from "react";
import TaskContainer from "./components/TaskContainer";
import Taskform from "./components/Taskform";
import { TaskContext } from "./utils/TaskContext";
import Header from "./components/Header";



function App() {



  const {task, updateTask} = useContext(TaskContext);
  const [title, setTitle] = useState('All Task');
  const [render, setRender] = useState(0);

  const [currentTasks , setCurrentTasks] = useState(task);
  function DeleteTask(id){

    console.log('delete function working in parent',id);
    let newList = task.filter(task => task.id !== id);
    let newCurr = currentTasks.filter(task => task.id !== id);
    updateTask(newList);
    setCurrentTasks(newCurr);
  }

  function allTaskFilter(){
    setCurrentTasks(task);
    setTitle("All Tasks");
  }

  function completedTaskFilter(){
    console.log('complete called')
    let c = [];
    for(let i=0;i<task.length;i++){
      if(task[i].isCompleted)
          c.unshift(task[i])   
    }
    setCurrentTasks(c);
    console.log("Curet completed: ",c)
    setTitle("Completed Tasks")
  }
  function dueTaskFilter(){
    
    let c = [];
    for(let i=0;i<task.length;i++){
      if(!task[i].isCompleted)
          c.unshift(task[i])   
    }
    setCurrentTasks(c);
    console.log("Curet completed: ",c)
    setTitle("Due Tasks")
  }

  return (
    <div className=" border-gray-500 w-full md:w-1/2 m-auto text-gray-600">
      
          <Header/>
          <ul className="flex w-full justify-around cursor-pointer p-3 font-bold text-lg">
            <li onClick={allTaskFilter}>All Tasks</li>
            <li onClick={completedTaskFilter}>Completed Tasks</li>
            <li onClick={dueTaskFilter}>Due Tasks</li>
          </ul>
          <TaskContainer title={title} tasks={currentTasks} DeleteTask={DeleteTask}/>

    </div>
  );
}

export default App;