import React, { useEffect, useState } from 'react'
import ParticularTodo from './ParticularTodo';
import axios from 'axios';
import { addTodoRoute } from '../utils/APIRoutes';
import { toastStyle } from '../utils/Constant';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Right from '../assets/right.svg';
import Bottom from '../assets/bottom.svg';



export default function HomeMiddle({ currUser, selected, todos, setTodos }) {
  const [input, setInput] = useState('');
  const [completed, setCompleted] = useState([]);
  const [notCompleted, setNotCompleted] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleAddTodo = async (e) => {
    setLoading(true)
    console.log('add todo');
    e.preventDefault();

    const token = localStorage.getItem('todo-token');
    if (!input) {
      toast.error('Input box is empty', toastStyle);
      return;
    }
    const { data } = await axios.post(addTodoRoute, {
      title: input,
      description: '',
      token,
      category: selected?._id,
      dueDate: ''
    })
    if (data.status) {
      setTodos(prev => [...prev, data?.todo])
      setInput('');
      setTimeout(() => {
        toast.success(data.msg, toastStyle);
      },10);
      setTimeout(() => {
        setLoading(false)
      },2000)
      return;
    }
    else {
      toast.error(data.msg, toastStyle);
      return
    }
  }

  useEffect(() => {
    const completedTodos = todos.filter((t) => t.isCompleted == true);
    const notCompletedTodos = todos.filter((t) => t.isCompleted === false);
    console.log('completed', completedTodos);
    console.log('not completed', notCompletedTodos);
    setCompleted(completedTodos);
    setNotCompleted(notCompletedTodos);

  }, [todos]);

  return (
    <div className='border border-red-500 w-full p-3 bg-[#536fcd] flex flex-col justify-between'>
      <div className='flex justify-between pr-10 items-center text-white'>
      <h1 className='capitalize font-bold text-2xl text-white select-none'>{selected?.category}</h1>
        <span className='text-2xl font-bold cursor-pointer'>...</span>
      </div>
      {/* <h2>{todos.length}</h2> */}
      <div className='h-[80vh] overflow-y-scroll scrollbar p-0'>

        {notCompleted?.map((todo, index) => (

          <ParticularTodo todo={todo} key={index} index={index} setTodos={setTodos} todos={todos} />
        ))}

        <div className='border border-gray-500 bg-white inline-flex p-1 rounded-md ml-3 mt-3' onClick={()=>setShowCompleted(!showCompleted)}>
          
          <img src={showCompleted ? Bottom : Right} alt="" className='w-6 h-6'/>
          <h2>Completed</h2>
          <div className="w-6 h-6 ml-1 flex justify-center items-center rounded-full bg-gray-300 text-gray-700">
            {completed.length}
          </div>
        </div>

        { showCompleted && completed?.map((todo, index) => (

          <ParticularTodo todo={todo} key={index} index={index + 'c'} setTodos={setTodos} todos={todos} />
        ))}
      </div>

      <form className='border border-gray-400 rounded-md m-2 flex items-center p-2 bg-white' onSubmit={handleAddTodo}>
        <div className="round mx-3 mt-1"><input type="checkbox" /> <label htmlFor=""></label></div>
        <input type="text"
          placeholder='Type something to add'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='p-1 w-full border-none rounded-md focus:outline-none focus:border-gray-000' 
          disabled={loading}
          />
      </form>
      <ToastContainer />
    </div>
  )

}
