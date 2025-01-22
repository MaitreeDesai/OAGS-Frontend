import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/userlist`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const removeUser = async (userId) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/removeUser/${userId}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete user');
          }
          setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
          console.error("Error deleting user:", error);
          setError(error.message);
        }
      };
      

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">User Management</h2>
            <Link to="/dashboard" className="btn btn-secondary mb-3">Back to Dashboard</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role Name</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.role?.role_name || "No Role"}</td>
                            <td>
                                <button 
                                    onClick={() => removeUser(user._id)} 
                                    className="btn btn-danger btn-sm">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;