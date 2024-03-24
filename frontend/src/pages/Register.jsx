import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastStyle } from '../utils/Constant';
import { registerRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();
  useEffect(()=>{

    let val = localStorage.getItem('todo-token');
    if(val){
      navigate('/');
    }
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }

    else if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    else if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission logic using API call
      const { data } = await axios.post(registerRoute, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      if (data.status) {
        toast.success(data.msg, toastStyle);
        setTimeout(()=>{
          navigate('/login');
        }, 3000);
      }
      else {
        toast.error(data.msg, toastStyle);
      }
      // console.log('data', data);
      // console.log(formData);
      // Simulating form submission success with toast
    }
    else {
      // Display validation errors
      for (const error in errors) {
        toast.error(errors[error], toastStyle);
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-FFFDF4 py-12 px-4 sm:px-6 lg:px-8s">
      <div className="max-w-md md:w-1/4 w-full space-y-8 border border-gray-200 shadow-md rounded-md p-5">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm ">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" autoComplete="username" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={formData.username} onChange={handleChange} />
            </div>
            <div className='mt-5'>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleChange} />
            </div>
            <div className='mt-5'>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <div className='mt-5'>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

              Sign up
            </button>
          </div>
        </form>

        <div className='text-md text-center'>
          <span>Alread have an account ? <Link to={'/login'} className='text-blue-600'>Click here</Link></span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
