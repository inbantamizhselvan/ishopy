import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-4 items-center mb-6 animate-fadeIn'>
      {/* Animated Text */}
      <p className='text-gray-400 text-lg sm:text-xl font-light tracking-wide transition-transform duration-500 transform hover:translate-x-1'>
        {text1} <span className='text-gray-900 font-semibold'>{text2}</span>
      </p>
      
      {/* Gradient Line */}
      <div className='relative'>
        <p className='w-12 sm:w-16 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-500'></p>
        <p className='absolute top-0 left-0 w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-transparent hover:from-purple-400 hover:to-red-400 transition-all duration-500'></p>
      </div>
    </div>
  )
}

export default Title
