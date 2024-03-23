import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteCategoryRoute, getAllCategoryRoute, getTodosRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import HomeLeft from '../components/HomeLeft';
import HomeMiddle from '../components/HomeMiddle';
import Welcome from './Welcome';
import { toastStyle } from '../utils/Constant';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  const [token, setToken] = useState();
  const [categories, setCategories] = useState();
  const [currUser, setCurrUser] = useState();
  const [selected, setSelected] = useState();
  const [todos, setTodos] = useState([]);


  const navigate = useNavigate();
  useEffect(()=>{

    const fetchToken = async ()=>{
      const t = localStorage.getItem('todo-token');
      if(!t){
        navigate('/login');
      }
      else{
        setToken(t); 
        const {data} = await axios.post(getAllCategoryRoute, {token : t});
        console.log('fetch data', data);
        if(data.status){
          setCurrUser(data.user);
          setCategories(data.categories);
        }
        
      }  
    }
    fetchToken();
  }, [])

  useEffect(()=>{

    const fetchCategoryData = async() =>{
      // console.log('selected', selected);
      const {data} = await axios.post(getTodosRoute, {token, category: selected?._id});
      console.log('get todos', data);
      if(data.status){
        setTodos(data.todos);
      }

    }

    fetchCategoryData();
  }, [selected]);

  const deleteCategory = async () =>{
    // delete selected category
    console.log('delete categoyr called');
    const {data} = await axios.post(deleteCategoryRoute, {token, selected});
    console.log('category after deleted', data);
    if(data.status){
      toast.success(data.msg, toastStyle);
      setTimeout(() => {
        const filtered = categories.filter((c)=>c?._id != selected?._id);
        setCategories(filtered);
        setSelected('');
      }, 3000);
    }
    else{
      toast.error(data.msg, toastStyle);
    }
  }

 
  return (
    <div className="flex  justify-between h-screen bg-white">
      {/* Left Section */}
      <HomeLeft categories={categories} currUser={currUser} setCategories={setCategories} setSelected={setSelected} selected={selected}/>

      {/* Middle Section */}
      {
        selected ? 
        <HomeMiddle selected={selected} currUser={currUser} todos={todos} setTodos={setTodos} setSelected={setSelected} deleteCategory={deleteCategory}/>
        : <Welcome/>
      }

      {/* Right Section */}
      <div></div>

      <ToastContainer/>
      
    </div>
  );
}
