import React from 'react'
import axios from 'axios';
import { toggleCompleted } from '../utils/APIRoutes';

export default function ParticularTodo({todo, index, setTodos, todos}) {

  // delete todo  
  // delete category
  // add to important
  // filter all todos based on completed or not
  const handleChecked = async () =>{
    console.log('clicked', todo?.title)
    const token = localStorage.getItem('todo-token');
    const {data} = await axios.post(toggleCompleted, {token, todo});
    if(!data.status){
      alert('something went wrong');
    }
    else{
      const remaining = todos?.filter((t)=>t._id != todo?._id);
      remaining.push(data.updatedTodo);
      setTodos(remaining);
      console.log(remaining);
    }
    
  }
  return (
    <div className='m-3 border border-gray-400 flex justify-between items-center py-2 pr-5 pl-3 bg-gray-100 rounded-md shadow-md'>
      <div className='flex justify-center items-center '>
        <div className="round flex items-center">
          
          <input type="checkbox" id={`checkbox-${index}`}  onClick={handleChecked} checked={todo.isCompleted}/>
          <label for={`checkbox-${index}`}></label>
        </div>


        <label className={`content ml-6 text-lg capitalize ${todo.isCompleted && 'line-through'}`}>
          {todo?.title}
        </label>

      </div>
      <div className="important">
        important
      </div>

    </div>
  )
}
