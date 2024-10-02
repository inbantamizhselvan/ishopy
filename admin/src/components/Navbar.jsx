import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from "react-router-dom"; 

const Navbar = ({ setToken }) => {
  const navigate = useNavigate(); 

  return (
    <div className='flex items-center mt-2 px-[4%] justify-between'>
      {/* Logo with clickable navigation */}
      <img 
        onClick={() => navigate("/")} 
        className='cursor-pointer w-[max(16%,100px)] pt-1' 
        src={assets.logo} 
        alt="Logo" 
      />

      {/* Logout button */}
      <button 
        onClick={() => setToken('')} 
        className='bg-gray-800 text-white px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
