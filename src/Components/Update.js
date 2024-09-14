import React, { useEffect, useState } from 'react';
import axiosInstance from './../axiosConfig/instance';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`users/${id}`);
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setPass(response.data.password);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`users/${id}`, { name, email, password: pass });
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name"
            />
            <input
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input
                type="text" 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                placeholder="Password"
            />
            <button type="submit">Update User</button>
        </form>
    );
};

export default UpdateUser;
