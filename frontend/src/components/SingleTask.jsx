import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../utils/TaskContext";
function SingleTask({oneTask, DeleteTask}){

    const [isCompleted, setIsCompleted] = useState(oneTask.isCompleted);

    const {task, updateTask} = useContext(TaskContext);

    function completeTask(e){
        const id = e.target.id;
        
        for(let i=0;i<task.length;i++){
            if(task[i].id == (+id)){
                console.log("id found");
                task[i].isCompleted = !isCompleted;
                break;
            }
        }
        updateTask(task);
        setIsCompleted(!isCompleted);

    }
    
    

    return (
        <div className="border  flex justify-between items-center p-2 my-2" id={oneTask.id}>


            <div>
                <input type="checkbox" name="" id={oneTask.id} checked={isCompleted}
                onChange={completeTask} 
                />
            </div>
            <div className={isCompleted?
                "line-through border-gray-500 font-bold":
                "border-gray-500 font-bold"} >
                {oneTask.taskName}
            </div>
            <div>
                {oneTask.taskCategory}
            </div>
            <div>
                {oneTask.taskDeadline}
            </div>

            <div className="">
            <Link to={`/update/${oneTask.id}`} type="button" className="mr-5  p-1 bg-gray-400 text-white rounded-sm"
            taskdetails = {oneTask}
            
            >Update</Link>
            <button type="button" className="mr-5 bg-red-500 rounded-sm text-white p-1"
            onClick={() => DeleteTask(oneTask.id)}
            >Delete</button>
            </div>
        </div> 

    )
}
export default SingleTask;