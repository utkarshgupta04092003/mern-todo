import { useState } from "react";
import { Link } from "react-router-dom";
function SingleTask({task, DeleteTask}){

    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    
    

    return (
        <div className="border  flex justify-between items-center p-2 my-2" id={task.id}>


            <div>
                <input type="checkbox" name="" id={task.id} checked={isCompleted}
                onChange={completeTask} 
                />
            </div>
            <div className={isCompleted?
                "line-through border-gray-500 font-bold":
                "border-gray-500 font-bold"} >
                {task.id}-{task.taskName}
            </div>
            <div>
                {task.taskCategory}
            </div>
            <div>
                {task.taskDeadline}
            </div>

            <div className="">
            <Link to={`/update/${task.id}`} type="button" className="mr-5  p-1 bg-gray-400 text-white rounded-sm"
            taskdetails = {task}
            
            >Update</Link>
            <button type="button" className="mr-5 bg-red-500 rounded-sm text-white p-1"
            onClick={() => DeleteTask(task.id)}
            >Delete</button>
            </div>
        </div> 

    )
}
export default SingleTask;