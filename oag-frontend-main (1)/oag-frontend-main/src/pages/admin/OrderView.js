import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderView = () => {
    const [shippingInfo, setShippingInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShippingInfo = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getShipping`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setShippingInfo(data.shippingDetails); 
            } catch (error) {
                console.error("Error fetching shipping information:", error);
                setError("Failed to fetch shipping information. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchShippingInfo();
    }, []);

    const removeShipping = async (shippingId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/removeShipping/${shippingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete shipping information');
            }

            setShippingInfo(shippingInfo.filter(info => info._id !== shippingId));
        } catch (error) {
            console.error("Error deleting shipping information:", error);
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Shipping Information Management</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pin Code</th>
                        <th>Phone</th>
                        <th>Payment Method</th>
                        <th>User ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shippingInfo.length > 0 ? (
                        shippingInfo.map(info => (
                            <tr key={info._id}>
                                <td>{info._id}</td>
                                <td>{info.streetAddress}</td>
                                <td>{info.city}</td>
                                <td>{info.state}</td>
                                <td>{info.pinCode}</td>
                                <td>{info.phone}</td>
                                <td>{info.paymentMethod}</td> {/* Display payment method */}
                                <td>{info.user}</td>
                                <td>
                                    <button 
                                        onClick={() => removeShipping(info._id)} 
                                        className="btn btn-danger btn-sm">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No Shipping Information Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderView;