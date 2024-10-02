import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link 
            className='block group text-gray-800 cursor-pointer transition-transform ease-in-out duration-600 hover:scale-105 max-w-xs mx-auto'
            to={`/product/${id}`}
        >
            <div className='relative overflow-hidden rounded-lg border-2 border-gray-200 shadow-lg transition-shadow duration-600 group-hover:shadow-xl'>
                {/* Image with Hover Effects */}
                <img 
                    className='border border-gray-200 rounded-lg object-cover transition-transform duration-600 group-hover:scale-110'
                    src={image[0]}
                    alt={name}
                />
                {/* Sliding Glare Effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 transition-all duration-600 group-hover:opacity-100 group-hover:translate-x-full'></div>
            </div>
            <div className='mt-4 text-center'>
                {/* Product Name with Gradient Text */}
                <p className='text-base font-semibold group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-600'>
                    {name}
                </p>
                {/* Price with Hover Effect */}
                <p className='text-sm font-medium text-gray-500 group-hover:text-purple-600 transition-colors duration-600'>
                    {currency}{price}
                </p>
            </div>
        </Link>
    );
}

export default ProductItem;
