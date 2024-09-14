import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserList from './Components/UserList';
import Register from './Components/Register'; 
import UpdateUser from './Components/Update';
import DeleteUser from './Components/Delete';
import ReadOneUser from './Components/ReadOneUser';
import './App.css';
import axiosInstance from './axiosConfig/instance';

function App() {
    const [backendMessage, setBackendMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axiosInstance.get('/');
                setBackendMessage(response.data);
            } catch (error) {
                console.error('Error fetching backend message:', error);
            }
        };
        fetchMessage();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <nav className='nav'>
                    <h1><Link to={'/'}>My Application</Link></h1>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/adduser">Register</Link></li>
                    </ul>
                </nav>
            </header>
            <div>
                <h2>{backendMessage}</h2>
            </div>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/adduser" element={<Register />} />
                <Route path="/readusers/:id" element={<ReadOneUser />} />
                <Route path="/updateuser/:id" element={<UpdateUser />} />
                <Route path="/deleteuser/:id" element={<DeleteUser />} />
            </Routes>
        </div>
    );
}

export default App;
