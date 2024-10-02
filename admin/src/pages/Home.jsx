import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Home = ({ token }) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-md p-16 min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
      
      {/* Welcome Section */}
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-white mb-2'>Welcome to Your Dashboard</h1>
        <p className='text-white text-lg'>Explore the options below to manage your tasks</p>
      </div>

      {/* Navigation Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
        {/* Add Items */}
        <NavLink
          to="/add"
          className='flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-purple-100'>
          <img className='w-14 h-14 mb-4' src={assets.add_icon} alt="Add Items" />
          <p className='text-xl font-semibold text-gray-700 transition-all hover:text-purple-600'>Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className='flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-pink-100'>
          <img className='w-14 h-14 mb-4' src={assets.list_icon} alt="List Items" />
          <p className='text-xl font-semibold text-gray-700 transition-all hover:text-pink-600'>List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className='flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-red-100'>
          <img className='w-14 h-14 mb-4' src={assets.order_icon} alt="Orders" />
          <p className='text-xl font-semibold text-gray-700 transition-all hover:text-red-600'>Orders</p>
        </NavLink>

        {/* Chats */}
        <NavLink
          to="/chat"
          className='flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-yellow-100'>
          <img className='w-14 h-14 mb-4' src={assets.chat_icon} alt="Chats" />
          <p className='text-xl font-semibold text-gray-700 transition-all hover:text-yellow-600'>Chats</p>
        </NavLink>
        <NavLink
          to="/chat"
          className='flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:bg-yellow-100'>
          <img className='w-14 h-14 mb-4' src={assets.email_icon} alt="Chats" />
          <p className='text-xl font-semibold text-gray-700 transition-all hover:text-yellow-600'>Email Offers</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
