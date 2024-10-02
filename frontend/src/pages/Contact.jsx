import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className='max-w-screen-lg mx-auto p-8'>
      <div className='text-center text-3xl font-bold pt-10 border-t'>
        <Title text1={'CONTACT'} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img 
          className='w-full md:max-w-[480px] rounded-lg shadow-lg object-cover' 
          src={assets.contact_img} 
          alt="Contact Us" 
        />
        <div className='flex flex-col justify-center items-center gap-6'>
          <p className='font-semibold text-xl text-gray-800'>Our Location</p>
          <p className='text-gray-600 text-center'>
            27453 Rockford Street <br />
            Suite 280, Dartmouth, USA
          </p>
          <p className='text-gray-600 text-center'>
            Tel: <a href='+1(684)-879-4264' className='text-purple-600 hover:underline'>+1(684)-879-4264</a> <br />
            Email: <a href="mailto:admin@isphopy.com" className='text-purple-600 hover:underline'>admin@isphopy.com</a>
          </p>
          <p className='font-semibold text-xl text-gray-800'>Join Our Team</p>
          <p className='text-gray-600 text-center'>
            Discover more about our teams and explore exciting job openings that could be the perfect fit for you!
          </p>
          <button className='border-2 border-purple-600 text-purple-600 rounded px-8 py-4 text-sm hover:bg-purple-600 hover:text-white transition-all duration-500'>
            Explore Careers
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default Contact;
