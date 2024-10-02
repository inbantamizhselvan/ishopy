import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-white text-gray-700 mt-10 py-10 border-t border-gray-200'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-start px-6'>
        
        {/* Logo and Description */}
        <div className='flex flex-col mb-8 md:mb-0'>
          <Link to='/'>
            <img className='w-36 h-auto mb-4' src={assets.logo} alt="Logo" />
          </Link>
          <p className='text-gray-600 text-sm mb-4'>
            At IShopY, we strive to provide you with quality products and exceptional services.
          </p>
          <div className='flex space-x-4 text-xl sm:text-4xl'>
          <a href="#" className='transition duration-300' title="Facebook">
              <i className="fa fa-facebook-square text-blue-600 hover:text-blue-800"></i>
            </a>
            <a href="#" className='transition duration-300' title="Twitter">
              <i className="fa fa-twitter-square text-blue-400 hover:text-blue-600"></i>
            </a>
            <a href="#" className='transition duration-300' title="Instagram">
              <i className="fa fa-instagram text-pink-500 hover:text-pink-700"></i>
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className='flex flex-col mb-8 md:mb-0'>
          <h3 className='text-lg font-semibold mb-4 text-purple-600'>COMPANY</h3>
          <ul className='flex flex-col space-y-2'>
            {['Home', 'Collection', 'About Us', 'Contact'].map((item, index) => (
              <li key={index}>
                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className='text-gray-600 hover:text-purple-600 transition duration-300'>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in Touch */}
        <div className='flex flex-col'>
          <h3 className='text-lg font-semibold mb-4 text-purple-600'>GET IN TOUCH</h3>
          <ul className='flex flex-col space-y-2'>
            <li>
              <a href="tel:+15231248759" className='text-gray-600 hover:text-purple-600 transition duration-300'>+1 523 124 8759</a>
            </li>
            <li>
              <a href="mailto:contact@ishopy.com" className='text-gray-600 hover:text-purple-600 transition duration-300'>contact@ishopy.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='py-3 mt-10'>
        <hr className='border-gray-300 ' />
        <p className='text-center mt-1 text-sm text-gray-600'>
          © {new Date().getFullYear()} IShopY. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
