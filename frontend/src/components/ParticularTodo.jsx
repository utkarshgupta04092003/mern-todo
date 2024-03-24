import React from 'react'
import axios from 'axios';
import { addToImportantRoute, toggleCompleted } from '../utils/APIRoutes';
import Important from '../assets/filledstar.svg';
import notImportant from '../assets/emptystar.svg';

export default function ParticularTodo({todo, index, setTodos, todos,  setFetchImpt, handleSetParticular}) {


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
  const handleClickImportant = async ()=>{
    console.log('clicked handle click importnant');
    const token = localStorage.getItem('todo-token');
    const {data} = await axios.post(addToImportantRoute, { token, todo })
    if(!data.status){
      alert('Something went wrong');
    }
    else{
      const remaining = todos?.map((cat)=>{
        if(cat._id == todo._id)
        return { ...cat, important: !todo.important };
      else  
        return cat

      })
      setTodos(remaining);
      setFetchImpt(prev=>prev+1);
      console.log('reminng', remaining);
    }
    console.log('important fetched data', data);
  }
  return (
    <div className='m-3 border border-gray-400 flex justify-between items-center py-2 pr-5 pl-3 bg-gray-100 rounded-md shadow-md'>
      <div className='flex justify-center items-center '>
        <div className="round flex items-center">
          
          <input type="checkbox" id={`checkbox-${index}`}  onClick={handleChecked} checked={todo.isCompleted}/>
          <label for={`checkbox-${index}`}></label>
        </div>


        <label className={`content ml-6 text-lg capitalize cursor-pointer ${todo.isCompleted && 'line-through'}`} onClick={()=>handleSetParticular(todo)}>
          {todo?.title}
        </label>

      </div>
      <div className="cursor-pointer" onClick={handleClickImportant}>
        <img src={todo?.important ? Important : notImportant} alt="" className='w-6 h-6' />
      </div>

    </div>
  )
}
