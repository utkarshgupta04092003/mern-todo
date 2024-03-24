import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastStyle } from '../utils/Constant';
import { loginRoute } from '../utils/APIRoutes'; // Assuming you have a login route defined
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  useEffect(()=>{

    let val = localStorage.getItem('todo-token');
    if(val){
      navigate('/');
    }
  }, []);

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
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

    if (!formData.usernameOrEmail.trim()) {
      errors.usernameOrEmail = 'Username/email is required';
    }
    else if (!formData.password) {
      errors.password = 'Password is required';
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission logic using API call
      const { data } = await axios.post(loginRoute, {
        username_email: formData.usernameOrEmail,
        password: formData.password
      });
      if (data.status) {
        toast.success(data.msg, toastStyle);
        localStorage.setItem('todo-token', data.token);
        setTimeout(()=>{
          navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-FFFDF4 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md md:w-1/4 w-full space-y-8 border border-gray-200 shadow-md rounded-md p-5">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm ">
            <div>
              <label htmlFor="usernameOrEmail" className="sr-only">Username or Email</label>
              <input id="usernameOrEmail" name="usernameOrEmail" type="text" autoComplete="username" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username or Email" value={formData.usernameOrEmail} onChange={handleChange} />
            </div>
            <div className='mt-5'>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
        <div className='text-md text-center'>
          <span>Create an account ? <Link to={'/signup'} className='text-blue-600'>Click here</Link></span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
