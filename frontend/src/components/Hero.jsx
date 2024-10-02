import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Hero = () => {
  const { navigate } = useContext(ShopContext);

  return (
    <div className='relative  w-full rounded sm:rounded'>
      {/* Background Image */}
      <img 
        src={assets.hero_img} 
        className='w-full h-[75vh] object-cover rounded sm:rounded' 
        alt="Fashionable clothes on display"
        loading="lazy"
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-25 sm:rounded'></div>

      {/* Hero Content */}
      <div className='absolute inset-0 mt-6 gap-5 flex flex-col items-start sm:flex-row mt-6 gap-3 items-center  px-4 sm:px-10'>
        <div className='text-center sm:text-left max-w-lg text-white'>
          <div className='flex items-center gap-2 justify-center sm:justify-start'>
            <p className='w-8 md:w-11 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'></p>  {/* Gradient line */}
            <p className='font-medium text-sm md:text-base tracking-wide text-gray-300'>
              OUR BESTSELLERS
            </p>
          </div>

          {/* Title Styling */}
          <h1 className='text-4xl sm:text-5xl lg:text-7xl font-semibold my-4 leading-snug transition-transform transform hover:scale-105'>
            <span className='text-gray-100'>Latest Arrivals</span> <br />
            <span className='text-gray-300 font-light'>Just for You</span>
          </h1>

          {/* Subtitle */}
          <p className='text-base md:text-lg text-zinc-200 mt-3 leading-relaxed tracking-wide'>
            Explore the latest trends in fashion. Discover the new collections!
          </p>

          {/* Call to Action Button */}
          <div className='mt-6 self-end'>
            <button 
              onClick={() => navigate('/collection')} 
              className='bg-gradient-to-r from-[#69159d] to-[#550e7c] hover:from-[#550e7c] hover:to-[#69159d] text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105'
              aria-label="Navigate to Collection"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
