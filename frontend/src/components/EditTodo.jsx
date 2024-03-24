import React, { useEffect, useState } from 'react'
import Important from "../assets/filledstar.svg";
import notImportant from '../assets/emptystar.svg';
import close from '../assets/close.svg';
import axios from 'axios';

import { addDescriptionRoute } from '../utils/APIRoutes';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastStyle } from '../utils/Constant';


export default function EditTodo({ todo, setParticular, deleteTodo }) {

    const [input, setInput] = useState();
    const [updateMsg, setUpdateMsg] = useState();
    const [minDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState();


    useEffect(() => {
        // console.log('desc', todo.description);
        setInput(todo.description);
        setDueDate(todo.dueDate ? todo.dueDate?.split('T')[0]  : '');
    }, [todo]);


    const handleAddDescription = async (e) => {
        e.preventDefault();
       
        if (!input) {
            toast.error('Input should not be blank', toastStyle);
            return;
        }
        const token = localStorage.getItem('todo-token');

        const { data } = await axios.post(addDescriptionRoute, { token, description: input, todo ,dueDate});
        // console.log('added descptiotn', data);
        if (data.status) {
            setUpdateMsg(data.msg);
            setTimeout(() => {
                setUpdateMsg('');
            }, 2000);
            setParticular(data.updated);
        } else {
            toast.error(data.msg, toastStyle);
        }
    }

    const hadnleDeleteTodo = (e) => {
        e.preventDefault();
        deleteTodo(todo);
    }

    return (
        <div className='border border-red-500 w-2/5 h-screen select-none'>
            {/* top part */}
            <div className='flex flex-col items-end  relative top-5 right-5 ' >
                <img src={close} alt="" className='relative w-8 h-8 cursor-pointer' onClick={() => setParticular('')} />
                <p className={`${updateMsg ? 'inline  text-green-500' : 'text-transparent'}`}>{updateMsg ? updateMsg : 'bkl'}</p>
            </div>
            <div className='m-3 mt-16 border border-gray-400 flex justify-between items-center py-2 pr-5 pl-3 bg-whtie rounded-md shadow-md'>
                <div className='flex justify-center items-center '>

                    <div className="round flex items-center">

                        <input type="checkbox" id={`checkbox`} checked={todo.isCompleted} />
                        <label for={`checkbox`}></label>
                    </div>

                    <label className={`content ml-6 text-xl capitalize  ${todo.isCompleted && 'line-through'}`} >
                        {todo?.title}
                    </label>

                </div>
                <div className="" >
                    <img src={todo?.important ? Important : notImportant} alt="" className='w-8 h-8' />
                </div>

            </div>

            {/* add description */}

            <div>

                <form className='border border-red-500 '>

                    <div className='m-3 mt-16 border border-gray-400 flex justify-between items-end py-2 pr-5 px-3 bg-whtie rounded-md shadow-md'>

                        <textarea name="" id="" cols="145" rows="3" placeholder='Add note' className='text-lg focus:outline-none focus:border-gray-000 w-full' onChange={(e) => setInput(e.target.value)} value={input}>{input}</textarea>
                    </div>
                    <div className='m-3 border border-gray-400 flex justify-between items-end pr-5 px-3 bg-whtie rounded-md shadow-md'>

                        <input type="date" name="" id="" min={minDate} className=' w-1/2 p-1 mx-auto focus:outline-none'
                        value={dueDate}
                        onChange={(e)=>setDueDate(e.target.value)}/>
                        
                    </div>
                    <div className='px-3 bg-whtie flex justify-between'>

                    <button className='border border-blue-500 bg-[#536fcd] px-7 py-1 rounded-md text-white text-md'  onClick={handleAddDescription}>Save</button>
                    <button className='border border-red-500  bg-red-500 px-7 py-1 rounded-md text-white text-md'  onClick={hadnleDeleteTodo}>Delete</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
