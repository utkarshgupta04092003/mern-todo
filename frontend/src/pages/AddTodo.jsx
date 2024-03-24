import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addTodoRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import { toastStyle } from '../utils/Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTodo() {

    const navigate = useNavigate();
    const [token, setToken] = useState();
    useEffect(() => {
        const t = localStorage.getItem('todo-token');
        if (t) {
            setToken(t);
        }
        else {
            navigate('/login');
        }
    }, []);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        dueDate: ''
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

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        else if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }

        else if (!formData.category) {
            errors.category = 'Category is required';
        }

        else if (!formData.dueDate) {
            errors.dueDate = 'Date is required';
        }

        return errors;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);

        if (Object.keys(errors).length === 0) {
            const response = await axios.post(addTodoRoute, {
                token: token, ...formData
            }); // Adjust the endpoint accordingly
            // console.log('Todo added successfully:', response.data);
            // Optionally, you can reset the form fields after successful submission
            setFormData({
                title: '',
                description: '',
                category: '',
                dueDate: ''
            });
        }
        else {
            // Display validation errors
            for (const error in errors) {
                toast.error(errors[error], toastStyle);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 shadow-md p-8 bg-white rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700">Category:</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md">
                        <option value="">Select Category</option>
                        <option value="personal">Personal</option>
                        <option value="professional">Professional</option>
                        <option value="daily">Daily</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-gray-700">Due Date:</label>
                    <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Task</button>
            </form>

            <ToastContainer/>
        </div>
    );
}

export default AddTodo;
