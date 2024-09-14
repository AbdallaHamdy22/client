import React from 'react';
import axiosInstance from './../axiosConfig/instance';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`users/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>Are you sure you want to delete this user?</h2>
            <button onClick={handleDelete}>Yes, Delete</button>
        </div>
    );
};

export default DeleteUser;
