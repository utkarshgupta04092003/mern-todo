import { useContext, useState } from "react";
import { TaskContext } from "../utils/TaskContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Taskform({AddTask}) {


    const [taskName, setTaskName]  = useState('');
    const [taskCategory, setTaskCategory]  = useState('');
    const [taskDeadline, setTaskDeadline]  = useState('');
    const navigate = useNavigate();
   
    const {task, updateTask} = useContext(TaskContext);
    function AddTask(title,category,deadline){

        console.log("all tasks from app",task.length != 0 ? task[0].id : 0);
        // const lastIndex = task? task[0].id+1 : 0;
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
        // setRender(render+1);
        navigate(-1);
        
      }
    
    function Add(){

        if(taskName == '' || taskCategory == '' || taskDeadline === ''){
            alert('Please Enter All fields. !');
            return;
        }
        console.log(taskName);
        console.log(taskCategory);
        console.log(taskDeadline);
        AddTask(taskName, taskCategory, taskDeadline);
    }



    


    return (
        <div className="border border-gray-500 w-1/2 m-auto  text-gray-600">
            <Header/>
            <h2 className="font-bold text-2xl text-center p-5">Todo list</h2>

            <div>

                <div className="w-full flex flex-col p-2 ">
                    <label htmlFor="taskName" className="font-bold text-xl">
                        Task Name
                    </label>
                    <input
                        type="text"
                        id="taskName"
                        className="border border-gray-400 mt-2 p-1"
                        placeholder="Enter Task"
                        maxLength="25"
                        required
                        value={taskName}
                        onChange={(e)=>{setTaskName(e.target.value)}}
                    />
                </div>
                
                <div className="flex">
                    <div className="w-1/2  flex flex-col p-2">
                        <label htmlFor="category" className="font-bold text-xl">
                            Category
                        </label>

                        <select className="border border-gray-400 mt-2 p-1" id="category"
                        required
                        value={taskCategory} 
                        onChange={(e)=>setTaskCategory(e.target.value)}>
                            <option value="" disabled>Select a category</option>
                            <option value="personal">Personal Task</option>
                            <option value="office">Office Task</option>
                            <option value="home">Home Task</option>
                            <option value="social">Social Task</option>
                            <option value="financial">Financial Task</option>
                        </select>
                    </div>

                    <div className="w-1/2  flex flex-col p-2 ">
                        <label htmlFor="deadline" className="font-bold text-xl">
                            Deadline
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            className="border border-gray-400 mt-2 p-1"
                            required
                            value={taskDeadline}
                            onChange={(e)=>{setTaskDeadline(e.target.value)}}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col p-2 ">
                    <button type="button"
                        className="border border-gray-400 mt-2 p-1 text-white  text-xl bg-gray-500 rounded-md"
                        onClick={Add}
                        >
                        Add
                    </button>
                </div>
            </div>



        </div>
    )
}

export default Taskform;