import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteCategoryRoute, deleteTodoRoute, getAllCategoryRoute, getImportantTodosRoute, getParticularTodo, getTodosRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import HomeLeft from '../components/HomeLeft';
import HomeMiddle from '../components/HomeMiddle';
import Welcome from './Welcome';
import { toastStyle } from '../utils/Constant';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditTodo from '../components/EditTodo';


export default function Home() {

  const [token, setToken] = useState();
  const [categories, setCategories] = useState();
  const [currUser, setCurrUser] = useState();
  const [selected, setSelected] = useState();
  const [todos, setTodos] = useState([]);
  const [fetchImp, setFetchImpt] = useState();
  const [particular, setParticular] = useState();


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
      if(selected != 'important'){

        const {data} = await axios.post(getTodosRoute, {token, category: selected?._id});
        console.log('get todos', data);
        if(data.status){
          setTodos(data.todos);
        }
      }
      else{
        // alert('called important');
        const {data} = await axios.post(getImportantTodosRoute, {token});
        // console.log('imp clicked', data);
        if(data.status){
          setTodos(data.todos);
        }
      }

    }

    fetchCategoryData();
    setParticular();
  }, [selected, fetchImp]);


  // handle change particular todo
  const handleSetParticular = async (todo) =>{
    // console.log('clcked hadnle particular', todo);
    // fetch particular todo details and then set
    if(particular?._id !== todo?._id){
      const { data } = await axios.post(getParticularTodo, {token, todo});
      // console.log('updated particular', data.updated);
      setParticular(data.updated);
    }
    else{
      setParticular('');
    }
  } 

  const deleteCategory = async () =>{
    // delete selected category
    // console.log('delete categoyr called');
    if(selected == 'important'){
      toast.error('Cannot delete this category', toastStyle);
      return;
    }
    const {data} = await axios.post(deleteCategoryRoute, {token, selected});
    // console.log('category after deleted', data);
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

  const deleteTodo = async (todo) =>{
    const token = localStorage.getItem('todo-token');
    const {data} = await axios.post(deleteTodoRoute, {token, todo});
    console.log('delete todo', data);
    if(data.status){
      const remaining = todos.filter((t)=>t._id !== todo?._id);
      setTodos(remaining);
      setParticular('');
    }
  }

 
  return (
    <div className="flex  justify-between h-screen bg-white">
      {/* Left Section */}
      <HomeLeft categories={categories} currUser={currUser} setCategories={setCategories} setSelected={setSelected} selected={selected}/>

      {/* Middle Section */}
      {
        selected ? 
        <HomeMiddle setFetchImpt={setFetchImpt} selected={selected} currUser={currUser} todos={todos} setTodos={setTodos} setSelected={setSelected} deleteCategory={deleteCategory} handleSetParticular={handleSetParticular}/>
        : <Welcome/>
      }

      {/* Right Section */}
      {
        particular && <EditTodo todo={particular} setParticular={setParticular} deleteTodo={deleteTodo}/>
      }

      <ToastContainer/>
      
    </div>
  );
}
