import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsRoute } from '../utils/APIRoutes';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastStyle } from '../utils/Constant';



const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [user, setUser] = useState();

  const navigate = useNavigate();


  useEffect(() => {


    const getUserDetails = async () => {
      const { data } = await axios.post(getUserDetailsRoute, { token });
      console.log('user data', data);
      if (data.invalidToken) {
        toast.error(data.msg, toastStyle);
        setTimeout(() => {
          localStorage.clear();
          navigate('/login');
        }, 3000);
      }
      else {
        if (data.status) {
          setUser(data.user);
        }
      }
    }

    const token = localStorage.getItem('todo-token');
    console.log('token', token);
    if (!token) {
      navigate('/login');
    }
    else {
      getUserDetails();
    }
  }, []);



  const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);

    try {
      const response = await axios.post('/api/uploadProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">User Profile</h1>
        <div className="mb-4 flex justify-center items-center">
          {user?.isAvatarImageSet ?

            <img src={user?.avatarImage} alt="Profile" className="rounded-full h-32 w-32 object-cover border-2 border-blue-600" />
            :
            profileImage ? <img src={profileImage} alt="Profile" className="rounded-full h-32 w-32 object-cover  border border-blue-600" />
            :
            <p className='mr-2 select-none'> 
            <svg width="140" height="140">
            <circle cx="70" cy="70" r="50" fill="#6c757d" />
                <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="50px">{user?.username.substring(0, 1).toUpperCase()}</text>
              </svg>
            </p>
          }
        </div>

        <div className="mb-4 flex justify-center items-center">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Update Profile Image
          </label>
          <button onClick={handleImageUpload} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Upload
          </button>
        </div>

        <p className="text-green-600">{uploadMessage}</p>
        {/* <p className="text-green-500">uploaded</p> */}
        <div className="mb-4">
          <p><strong>Name:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;
