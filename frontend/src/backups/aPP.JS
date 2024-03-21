import React, { useState, useContext } from "react";
import TaskContainer from "./components/TaskContainer";
import Taskform from "./components/Taskform";
import { TaskContext } from "./utils/TaskContext";



function App() {



  const {task, updateTask} = useContext(TaskContext);
  const [render, setRender] = useState(0);
  // const [counter, setCounter] = useState(lastIndex);
  function AddTask(title,category,deadline){

    console.log("all tasks from app",task.length != 0 ? task[0].id : 0);
    const lastIndex = task.length != 0 ? task[0].id+1 : 0;
    const prevTasks = task;
    prevTasks.unshift({
      id: lastIndex,
      taskName: title,
      taskCategory: category,
      taskDeadline: deadline,
      isCompleted: false,
    })
    updateTask(prevTasks);
    setRender(render+1);
    
  }

  function DeleteTask(id){

    console.log('delete function working in parent',id);
    // alert('Delete button works',id);
    let newList = task.filter(task => task.id !== id);
    updateTask(newList);
  }

  return (
    <div className=" border-gray-500 w-full md:w-1/2 m-auto text-gray-600">
          <Taskform AddTask={AddTask} />
          <TaskContainer tasks={task} DeleteTask={DeleteTask}/>
    </div>
  );
}

export default App;