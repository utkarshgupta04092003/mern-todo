import SingleTask from "./SingleTask";

function TaskContainer({title, tasks, DeleteTask}) {
  console.log("task in conatiner",tasks)
  return (tasks.length == 0 )? 
  (
    <div>
      <h2 className="font-bold text-2xl text-center my-7">{title}</h2>
      <div className="border  flex justify-between items-center p-2 my-2">No items found</div>
    </div>
  ): 
  (
    <div className="border border-gray-500 p-2">
        <hr/>
        <h2 className="font-bold text-2xl text-center my-7">{title}</h2>

        
        {tasks.map((task) => (
            <SingleTask oneTask ={task} DeleteTask={DeleteTask} key={task.id}/>    
        ))}

        </div>
  );
}
export default TaskContainer;
