import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets'; 
import { ShopContext } from '../context/ShopContext';

const PrintReceipt = ({ order }) => {
    const {currency} = useContext(ShopContext);

  const handlePrint = () => {
    const printContents = document.getElementById(`print-${order.orderId}`).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  useEffect(() =>{
    handlePrint();
  }, [order])

  return (
    <>

      {/* Hidden receipt section for printing */}
      <div
        id={`print-${order.orderId}`}
        className='hidden p-6 border-2 border-gray-300 rounded-xl shadow-lg max-w-lg mx-auto bg-white font-sans'
      >
        <header className='text-center mb-6'>
          <img className='w-36' src={assets.logo} alt="" />
          <h2 className='text-3xl text-gray-800 font-extrabold uppercase tracking-wide'>
            Order Receipt
          </h2>
          <p className='text-sm text-gray-600'>Thank you for your purchase!</p>
        </header>

        <section className='mb-6'>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>Order Details</h3>
          <hr className='border-gray-300 mb-4' />
          <p className='mb-2'>
            <span className='font-medium'>Order ID:</span> {order.orderId}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Date:</span> {new Date(order.date).toLocaleDateString()}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Payment Method:</span> {order.paymentMethod === 'COD'? 'Cash On Delivery':order.paymentMethod}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Payment Status:</span> {order.payment ? "Paid" : "Pending"}
          </p>
        </section>

        <section className='mb-6'>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>Customer Information</h3>
          <hr className='border-gray-300 mb-4' />
          <p className='mb-2'>
            <span className='font-medium'>Name:</span> {order.firstName + '' + order.lastName}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Phone:</span> {order.phone}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Address:</span> {order.street + ", " + order.city + ", " + order.state + ", " + order.country + "-" + order.zipcode}
          </p>
        </section>

        <section className='mb-6'>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>Order Items</h3>
          <hr className='border-gray-300 mb-4' />
          <ul className='space-y-2'>
            <li
              className='flex justify-between items-center border-b border-gray-200 pb-2'
            >
              <span>{order.name} ({order.size})</span>
              <span className='font-medium'>{order.quantity} x {currency}{order.price}</span>
            </li>
            {/* Delivery fee */}
            <li className='flex justify-between items-center border-b border-gray-200 pb-2'>
              <span>Delivery Fee</span>
              <span className='font-medium'>{currency} 10</span>
            </li>
          </ul>
          <p className='mt-4 text-right font-semibold text-gray-800'>
            Total: {currency}{order.price * order.quantity}
          </p>
        </section>

        <footer className='text-center mt-8'>
          <hr className='border-gray-300 mb-4' />
          <p className='text-sm text-gray-500'>
            Need help? Contact our support at support@IshopY.com.
          </p>
          <p className='text-sm text-gray-500'>
            © 2024 IshopY. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default PrintReceipt;
