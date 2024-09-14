import React, { useState, useEffect } from 'react';
import axiosInstance from './../axiosConfig/instance'; // Axios instance setup
import { useParams } from 'react-router-dom';

const ReadOneUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`users/${id}`); // Make sure the ID is correct
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('User not found');
            }
        };

        fetchUser();
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
        </div>
    );
};

export default ReadOneUser;
