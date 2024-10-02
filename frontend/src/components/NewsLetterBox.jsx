import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from "axios";

const NewsLetterBox = () => {
    const { token, backendURL } = useContext(ShopContext); 
    const [email, setEmail] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(backendURL + '/api/user/subscribeEmail', { email }, { headers: { token } });

            if (response.data.success) {
                setMessage('You have successfully subscribed! A confirmation email has been sent.');
            } else {
                setMessage(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage('There was an error processing your request.');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 2000);

            return () => clearTimeout(timer); 
        }
    }, [message]); 

    return (
        <div className='bg-white rounded-2xl shadow-lg p-6 text-center max-w-lg mx-auto border border-gray-200 transition-transform duration-200 hover:scale-105 hover:shadow-xl'>
            <p className='text-2xl font-semibold text-gray-800'>Subscribe now and get 20% off</p>
            <p className='text-gray-500 mt-2'>
                Join our newsletter for exclusive updates and offers.
            </p>

            {message && (
                <p className={`my-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}

            <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row items-center gap-3 my-6'>
                <input 
                    required 
                    className='flex-1 p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200' 
                    type="email" 
                    placeholder='Enter your email'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={loading} 
                />
                <button 
                    type='submit' 
                    className={`bg-purple-600 text-white text-xs font-semibold px-8 py-3 rounded-full transition-transform duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading} 
                >
                    {loading ? 'Submitting...' : 'SUBSCRIBE'}
                </button>
            </form>
        </div>
    );
}

export default NewsLetterBox;
