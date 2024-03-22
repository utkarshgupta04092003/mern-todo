import React, { useState } from 'react'
import ParticularTodo from './ParticularTodo';
import axios from 'axios';
import { addTodoRoute } from '../utils/APIRoutes';
import { toastStyle } from '../utils/Constant';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function HomeMiddle({ currUser, selected, todos, setTodos }) {
  const [input, setInput] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    console.log(input);
    console.log(selected)
    console.log(currUser);

    const token = localStorage.getItem('todo-token');

    if (!input) {
      toast.error('Input box is empty', toastStyle);
      return;
    }
    const { data } = await axios.post(addTodoRoute, {
      title: input,
      description: '',
      token,
      category: selected?._id
    })
    if (data.status) {
      toast.success(data.msg, toastStyle);
      setTodos(prev => [...prev, data?.todo])
      setInput('');
    }
    else {
      toast.error(data.msg, toastStyle);
    }

    console.log('added', data);



  }

  return (
    <div className='border border-red-500 w-full p-3 bg-white'>
      <h1 className='capitalize'>{selected?.category}</h1>
      <h2>{todos.length}</h2>
      <div className='h-[80vh] overflow-y-scroll scrollbar border border-red-500'>

        {todos?.map((todo, index) => (

          <ParticularTodo todo={todo} key={index} index={index} />
        ))}
      </div>

      <form className='border border-gray-400 rounded-md m-2 flex items-center p-2' onSubmit={handleAddTodo}>
       
        <div className="round mx-3 mt-1"><input type="checkbox" /> <label htmlFor=""></label></div>
        <input type="text"
          placeholder='Add something to do'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='p-1 w-full border-none rounded-md focus:outline-none focus:border-gray-000' />
      </form>
      <ToastContainer />
    </div>
  )

}
