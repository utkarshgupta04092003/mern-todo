

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../utils/TaskContext";

function Update() {

    const { id } = useParams();
    const { task, updateTask } = useContext(TaskContext);

    // console.log('all task: ', task);
    // console.log("id: ", typeof(+id))
    // let currentTask = task.map((t)=>(
    //     t.id == (+id)
    // ))
    let index;
    for(let i=0;i<task.length;i++){
        if(task[i].id == (+id)){
            index = i;
            break;
        }
    }
    const [currentTask, setCurrentTask] = useState({
        id: task[index].id,
        taskName:  task[index].taskName,
        taskCategory:  task[index].taskCategory,
        taskDeadline:  task[index].taskDeadline,
        isCompleted:  task[index].isCompleted,
    
    })
    console.log('current task', currentTask);


    const [taskName, setTaskName]  = useState(currentTask.taskName);
    const [taskCategory, setTaskCategory]  = useState(currentTask.taskCategory);
    const [taskDeadline, setTaskDeadline]  = useState();


    function Update(){

        if(taskName == '' || taskCategory == '' || taskDeadline === undefined){
            alert('Please Enter All fields. !');
            return;
        }

        
        console.log("update called");
        for(let i=0;i<task.length;i++){
            if(task[i].id == (+id)){
                task[i].taskName = taskName;
                task[i].taskCategory = taskCategory;
                task[i].taskDeadline = taskDeadline;
                // task[i].isCompleted = isCompleted,
            }
        }

        updateTask(task);
        console.log('update executed');
        console.log(task)
    }

 
    return (
        <div className="border border-gray-500 w-3/4 m-auto mt-5">
            <h2 className="font-bold text-2xl text-center p-5">Todo list</h2>

            <div>

                <div className="w-full flex flex-col p-2 ">
                    <label for="taskName" className="font-bold text-xl">
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
                        onChange={(e) => { setTaskName(e.target.value) }}
                    />
                </div>

                <div className="flex">
                    <div className="w-1/2  flex flex-col p-2">
                        <label for="category" className="font-bold text-xl">
                            Category
                        </label>

                        <select className="border border-gray-400 mt-2 p-1"
                            required
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}>
                            <option value="" disabled>Select a category</option>
                            <option value="personal">Personal Task</option>
                            <option value="office">Office Task</option>
                            <option value="home">Home Task</option>
                            <option value="social">Social Task</option>
                            <option value="financial">Financial Task</option>
                        </select>
                    </div>

                    <div className="w-1/2  flex flex-col p-2 ">
                        <label for="deadline" className="font-bold text-xl">
                            Deadline
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            className="border border-gray-400 mt-2 p-1"
                            required
                            value={taskDeadline}
                            onChange={(e) => { setTaskDeadline(e.target.value) }}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col p-2 ">
                    <button type="button"
                        className="border border-gray-400 mt-2 p-1 text-white  text-xl bg-gray-500 rounded-md"
                        onClick={Update}
                    >
                        Update
                    </button>
                </div>
            </div>



        </div>
    )

}
export default Update;