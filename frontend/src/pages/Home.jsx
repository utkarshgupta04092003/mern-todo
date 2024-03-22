import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllCategoryRoute, getCategoryData } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import HomeLeft from '../components/HomeLeft';
import HomeMiddle from '../components/HomeMiddle';

export default function Home() {

  const [token, setToken] = useState();
  const [categories, setCategories] = useState();
  const [currUser, setCurrUser] = useState();
  const [selected, setSelected] = useState();


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
      console.log('selected', selected);
      const {data} = await axios.post(getCategoryData, {token, selected})
    }

    fetchCategoryData();
  }, [selected]);

 
  return (
    <div className="flex  justify-between h-screen bg-gray-100">
      {/* Left Section */}
      <HomeLeft categories={categories} currUser={currUser} setCategories={setCategories} setSelected={setSelected} selected={selected}/>

      {/* Middle Section */}
      <HomeMiddle selected={selected}/>

      {/* Right Section */}
      <div></div>
      
    </div>
  );
}
