import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import EditProfile from '../components/EditProfile';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const { token, backendURL } = useContext(ShopContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.post(backendURL + '/api/user/profile', {}, { headers: { token } });
                if (response.data.success) {
                    setUser(response.data.user);
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, [backendURL, token, isEditing]);


    const handleUpdateUser = (updatedUser) => {
        setUser(updatedUser); 
    };

    if (!user) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{user.name}'s Profile</h2>
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={user.profileImage || "https://via.placeholder.com/150"}
                            alt="User Profile"
                        />
                    </div>
                    <div className="text-gray-700">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone || 'Edit this to update your phone'}</p>
                        <p><strong>Address:</strong> {user.address || 'Edit this to update your address'}</p>
                        <p><strong>Joined On:</strong> {new Date(user.joined).toDateString()}</p>
                    </div>
                </div>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => setIsEditing(true)}
                >
                    Edit Profile
                </button>
            </div>
            {/* EditProfile Component */}
            {isEditing && (
                <EditProfile user={user} onClose={() => setIsEditing(false)} onUpdate={handleUpdateUser} />
            )}
            {/* Order History Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Order History</h3>
                {orders.length > 0 ? (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b">
                                    <td className={`px-4 py-2 ${order.status === 'Delivered'?'text-green-600':'text-orange-400'}`}>{order._id}</td>
                                    <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">${order.amount}</td>
                                    <td className="px-4 py-2">{order.status}</td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-500 hover:underline">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-4">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
