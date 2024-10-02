import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        const foundProduct = products.find(item => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    return productData ? (
        <div className='p-8 bg-gray-50 shadow-lg rounded-lg transition-transform duration-300 '>
            <div className='flex flex-col sm:flex-row gap-8'>
                {/* Image Section */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[20%] w-full'>
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className='w-20 border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200 rounded-lg cursor-pointer'
                                alt={productData.name}
                            />
                        ))}
                    </div>
                    <div className='flex-1 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105'>
                        <img src={image} className='w-full h-auto transition-transform duration-200 hover:scale-110' alt={productData.name} />
                    </div>
                </div>

                {/* Details Section */}
                <div className='flex-1'>
                    <h1 className='font-bold text-3xl text-gray-900 mt-2'>{productData.name}</h1>
                    <div className='flex items-center mt-2'>
                        {[...Array(4)].map((_, index) => (
                            <img src={assets.star_icon} alt="" className="w-4" key={index} />
                        ))}
                        <img src={assets.star_dull_icon} alt="" className="w-4" />
                        <p className='pl-2 text-gray-600'>(122 reviews)</p>
                    </div>
                    <p className='mt-5 text-4xl font-medium text-purple-800'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-700 md:w-4/5'>{productData.description}</p>
                    
                    {/* Size Selection */}
                    <div className='flex flex-col gap-4 my-4'>
                        <p className='font-semibold text-lg'>Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 rounded-full transition-all duration-300 ${item === size ? 'bg-purple-600 text-white border-blue-700' : 'bg-gray-200 text-black border-gray-400 hover:bg-purple-400 hover:text-white'}`}
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className='bg-amber-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-400 active:bg-yellow-300 transition duration-200 flex items-center justify-center'
                    >
                        <span className='mr-2'>🛒</span>
                        ADD TO CART
                    </button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original Product.</p>
                        <p>Cash on Delivery is available.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description and Reviews Section */}
            <div className='mt-20'>
                <div className='flex border-b'>
                    <b className='border px-5 py-3 text-sm font-semibold cursor-pointer hover:bg-gray-200 transition duration-200'>Description</b>
                    <p className='border px-5 py-3 text-sm cursor-pointer hover:bg-gray-200 transition duration-200'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
                    <p>{productData.description}</p>
                </div>
            </div>

            {/* Related Products Section */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : (
        <div className='opacity-0'></div>
    );
};

export default Product;
