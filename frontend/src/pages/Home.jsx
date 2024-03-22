import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllTodosRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import HomeLeft from '../components/HomeLeft';
import HomeMiddle from '../components/HomeMiddle';

export default function Home() {
  const [allTodos, setAllTodos] = useState();
  const [token, setToken] = useState();
  const [todos, setTodos] = useState();

  const navigate = useNavigate();
  useEffect(()=>{

    const fetchToken = async ()=>{
      const t = localStorage.getItem('todo-token');
      if(!t){
        navigate('/login');
      }
      else{
        setToken(t); 
        const {data} = await axios.post(getAllTodosRoute, {token: t});
        console.log('al todos', data);
        setAllTodos(data);
        setTodos(data);
      }  
    }
    fetchToken();
  }, [])

  useEffect(()=>{

  }, []);
  return (
    <div className="flex  justify-between h-screen bg-gray-100">
      {/* Left Section */}
      <HomeLeft/>

      {/* Middle Section */}
      <HomeMiddle/>

      {/* Right Section */}
      <div></div>
      
    </div>
  );
}
