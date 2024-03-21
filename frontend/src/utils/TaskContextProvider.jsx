// task context provider
import React, { useState } from "react";

import {TaskContext} from "./TaskContext";


const TaskContextProvider = ({children}) =>{
    const [task, setTask] = useState([]);

    function updateTask(newTask){
        console.log("update task function called");
        setTask(newTask);
    }

    return (
        <TaskContext.Provider value={{task, setTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    )
}
export default TaskContextProvider;




// {
//     id: -2,
//     taskName: "Drinking milk",
//     taskCategory: "Personal",
//     taskDeadline: "10/10/2000",
//     isCompleted: false,
//   },
//   {
//     id: -1,
//     taskName: "Bathing ",
//     taskCategory: "Personal",
//     taskDeadline: "10/10/2000",
//     isCompleted: false,

//   }