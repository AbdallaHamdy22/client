import React, { useState, useEffect } from 'react';
import axiosInstance from './../axiosConfig/instance';
import { Link } from 'react-router-dom';
import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosInstance.get('users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    return (
        <div className="user-list">
            <h2>Users List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/readusers/${user._id}`}><button>View</button></Link>
                                <Link to={`/updateuser/${user._id}`}><button>Update</button></Link>
                                <Link to={`/deleteuser/${user._id}`}><button>Delete</button></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/adduser'><button className="add-user-btn">Add a New User</button></Link>
        </div>
    );
}

export default UserList;
