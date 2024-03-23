import React, { useEffect, useState } from 'react'
import ParticularTodo from './ParticularTodo';
import axios from 'axios';
import { addTodoRoute } from '../utils/APIRoutes';
import { toastStyle } from '../utils/Constant';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Right from '../assets/right.svg';
import Bottom from '../assets/bottom.svg';



export default function HomeMiddle({ currUser, selected, todos, setTodos, setSelected, deleteCategory, setFetchImpt }) {
  const [input, setInput] = useState('');
  const [impAndCom, setImpAndCom] = useState();
  const [impAndNotCom, setImpAndNotCom] = useState();
  const [notImpAndCom, setNotImpAndCom] = useState();
  const [notImpAndNotCom, setNotImpAndNotCom] = useState();
  const [loading, setLoading] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    // Handle option click here
    console.log(`Option clicked: ${option}`);
    if (option == "Close Todo")
      setSelected('');
    else if (option == 'Delete Category') {
      deleteCategory();
      setIsOpen(false);
    }
  };



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
      }, 10);
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      return;
    }
    else {
      toast.error(data.msg, toastStyle);
      return
    }
  }

  useEffect(() => {

    const impCom = todos.filter((t) => t.isCompleted === true && t.important === true);
    const impNotCom = todos.filter((t) => t.isCompleted === false && t.important === true);
    const notImpCom = todos.filter((t) => t.isCompleted === true && t.important === false);
    const notImpNotCom = todos.filter((t) => t.isCompleted === false && t.important === false);


    setImpAndCom(impCom);
    setImpAndNotCom(impNotCom);
    setNotImpAndCom(notImpCom);
    setNotImpAndNotCom(notImpNotCom);
    setIsOpen(false);

  }, [todos]);

  return (
    <div className='border border-red-500 w-full p-3 bg-[#536fcd] flex flex-col justify-between select-none'>
      <div className='flex justify-between pr-10 items-center text-white'>
        <h1 className='capitalize font-bold text-2xl text-white select-none'>{!selected?.category ? "Important" : selected?.category}</h1>
        <span className='text-2xl font-bold cursor-pointer relative' onClick={toggleDropdown}>...</span>
        {/* dropdown for close and delete category */}
        {isOpen && (
          <div
            className="top-10 right-10 absolute select-none mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1 w-full" role="none">
              <button
                onClick={() => handleOptionClick('Close Todo')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Close Todo
              </button>
              <button
                onClick={() => handleOptionClick('Delete Category')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Delete Category
              </button>
            </div>
          </div>
        )}

      </div>
      {/* <h2>{todos.length}</h2> */}
      <div className='h-[80vh] overflow-y-scroll scrollbar p-0'>

        {impAndNotCom?.map((todo, index) => (
          <ParticularTodo todo={todo} key={index} index={index + 'a'} setTodos={setTodos} todos={todos} setFetchImpt={setFetchImpt} />
        ))}
        {notImpAndNotCom?.map((todo, index) => (
          <ParticularTodo todo={todo} key={index} index={index + 'b'} setTodos={setTodos} todos={todos} setFetchImpt={setFetchImpt} />
        ))}

        <div className='border border-gray-500 bg-white inline-flex p-1 rounded-md ml-3 mt-3' onClick={() => setShowCompleted(!showCompleted)}>

          <img src={showCompleted ? Bottom : Right} alt="" className='w-6 h-6' />
          <h2>Completed</h2>
          <div className="w-6 h-6 ml-1 flex justify-center items-center rounded-full bg-gray-300 text-gray-700">
            {impAndCom?.length + notImpAndCom?.length}
          </div>
        </div>

        {/* display completed todo */}
        <div>
          {showCompleted && impAndCom?.map((todo, index) => (
            <ParticularTodo todo={todo} key={index} index={index + 'c'} setTodos={setTodos} todos={todos} setFetchImpt={setFetchImpt} />
          ))}
          {showCompleted && notImpAndCom?.map((todo, index) => (
            <ParticularTodo todo={todo} key={index} index={index + 'd'} setTodos={setTodos} todos={todos} setFetchImpt={setFetchImpt} />
          ))}
        </div>
      </div>



        {
          selected != 'important' &&
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
        }
      <ToastContainer />
    </div>
  )

}
