import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addCategoryRoute } from '../utils/APIRoutes';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { toastStyle } from '../utils/Constant';



export default function HomeLeft({ categories, currUser, setCategories, setSelected, selected }) {

    const [add, setAdd] = useState(false);
    const [input, setInput] = useState();

    const handleAddList = async (e) => {
        e.preventDefault();
        console.log('handleadd list');
        if(!input){
            toast.error('Input cannot be blank', toastStyle);
            return;
        }
        // call add to list api
        const token = localStorage.getItem('todo-token');
        const {data} = await axios.post(addCategoryRoute, {token, category: input});
        console.log('add category response', data);
        if(data.status){
            toast.success(data.msg, toastStyle);
            setCategories(prev => [...prev, data.category])
        }
        else{
            toast.error(data.msg, toastStyle);
        }
        setInput('');
        setAdd(false);
    }
    const handleSelected = (category) =>{
        console.log('selected category', category);
        setSelected(category);
    }
    return (
        <div className='w-1/4 h-screen flex flex-col justify-between border border-red-500'>
            <div className=" h-full border border-gray-500 p-4">
                {/* User Profile */}
                <div className="flex items-center mb-4">
                    {currUser?.isAvatarImageSet ?

                        <img src="" alt="User Profile" className="w-12 h-12 rounded-full mr-2 border border-green-600" /> :
                        <p className='border border-red-500 mr-2'>
                            <svg width="60" height="60" className='border border-green-500'>
                                <circle cx="30" cy="30" r="25" fill="#6c757d" />
                                <text x="51%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="20px">{currUser?.username.substring(0, 1).toUpperCase()}</text>
                            </svg>
                        </p>
                    }
                    <div>
                        <h3 className="font-bold">{currUser?.username}</h3>
                        <p className="text-gray-600">{currUser?.email}</p>
                    </div>
                </div>


                {/* display categories/list section */}


                <div className="h-[75vh] overflow-y-scroll scrollbar pr-2">
                    <h2 className="text-lg font-bold mb-4">Text List</h2>

                    {
                        categories?.map((category, index) => (


                            <div className={`flex items-center mb-4 pl-2 border border-gray-500 p-2 rounded-md ${selected?._id == category?._id ? "bg-gray-400 text-white": ""} capitalize`} onClick={()=>{handleSelected(category)}} key={index}>

                                <svg viewBox="0 0 18 15" className='w-5 h-5 mr-3'>
                                    <path fill="#42 rounded-md4242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z" />
                                    <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z" />
                                    <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z" />
                                </svg>


                                <span className="flex-grow">{category.category }</span>
                                <div className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-300 text-gray-700">
                                    0
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>

            {/* create list section */}
            <div className='border border-red-500 relative'>

                {add &&
                    <div className='flex items-center my-1 absolute -top-12 bg-gray-100 w-full p-2'>

                        <svg viewBox="0 0 18 15" className='w-5 h-5 mr-3 mx-3'>
                            <path fill="#42 rounded-md4242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z" />
                            <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z" />
                            <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z" />
                        </svg>
                        <form onSubmit={handleAddList}>
                            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                                className='p-1 w-full border rounded-md focus:outline-none focus:border-gray-200' />

                        </form>
                    </div>
                }

                <div className="flex items-center  pl-2 border border-gray-500 p-2" onClick={() => setAdd(!add)}>


                    <span className='mr-4 text-sm' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                    </span>

                    <span className="flex-grow">New Category</span>
                    {/* <div className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-300 text-gray-700">
    
                    </div> */}
                </div>



            </div>

            <ToastContainer/>
        </div>
    )
}
