import React from 'react';
import { assets } from '../assets/assets';

const OurPolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Easy Exchange Icon" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400 text-sm'>Enjoy a hassle-free exchange process for your purchases, ensuring your satisfaction.</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Return Policy Icon" />
            <p className='font-semibold'>7-Day Return Policy</p>
            <p className='text-gray-400 text-sm'>Return any item within 7 days for a full refund—no questions asked!</p>
        </div>
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Customer Support Icon" />
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400 text-sm'>Our dedicated team is available 24/7 to assist you with any queries or concerns.</p>
        </div>
    </div>
  )
}

export default OurPolicies;
