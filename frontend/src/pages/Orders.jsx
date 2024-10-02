import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PrintReceipt from '../components/PrintReceipt';

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate(); 
  const [print, setPrint] = useState();
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendURL + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['orderId'] = order._id;
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['firstName'] = order.address.firstName;
            item['lastName'] = order.address.lastName;
            item['email'] = order.address.email;
            item['street'] = order.address.street;
            item['city'] = order.address.city;
            item['state'] = order.address.state;
            item['zipcode'] = order.address.zipcode;
            item['country'] = order.address.country;
            item['phone'] = order.address.phone;
            allOrdersItem.push(item); 
          })
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16 bg-gradient-to-b from-purple-50 to-white'>
      <div className='text-2xl text-center font-bold mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className='max-w-5xl mx-auto'>
        {orderData.length === 0 ? (
          <p className='text-center text-gray-500 mt-8'>You have no orders yet.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className='bg-white max-w-[90%] rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl mb-4 p-3 w-full sm:w-[60%] md:w-[80%] lg:w-[80%] mx-auto'
            >
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-4 text-sm'>
                  <img
                    className='w-14 sm:w-16 rounded-md shadow-md'
                    src={item.image[0]}
                    alt={item.name}
                  />
                  <div>
                    <p className='sm:text-base font-semibold text-gray-800'>{item.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-base text-gray-700'>
                      <p className='text-lg font-bold text-purple-800'>
                        {currency}{item.price}
                      </p>
                      <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                      <p className='text-sm text-gray-500'>Size: {item.size}</p>
                    </div>
                    <p className='mt-1 text-sm text-gray-500'>
                      Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                      Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Status text with styling */}
                <div className="mt-4 md:mt-0">
                  <p className={`font-bold text-sm px-3 py-1 rounded-lg ${
                    item.status === "Delivered" ? 'text-green-700 bg-green-200' :
                    item.status === "Shipped" ? 'text-blue-700 bg-blue-200' :
                    item.status === "Order Processing" ? 'text-yellow-700 bg-yellow-200' :
                    'text-gray-700 bg-gray-200'
                  }`}>
                    Status: {item.status}
                  </p>
                </div>

                {/* View Order button */}
                <div className='flex justify-end items-center'>
                  <button
                    onClick={() => handleViewOrder(item.orderId)}
                    className='font-semibold bg-blue-600 px-4 py-2 text-xs rounded text-white flex items-center'
                  >
                    <i className='bi bi-eye mr-1'></i>
                    View Order
                  </button>
                </div>

                {/* Print receipt button */}
                <div className='flex justify-end items-center'>
                  <button
                    onClick={() => setPrint(item)}
                    className='font-semibold bg-purple-800 px-4 py-2 text-xs rounded text-white flex items-center'
                  >
                    <i className='bi bi-receipt mr-1'></i>
                    Print Receipt
                  </button>
                </div>

                {/* Hidden receipt section for printing */}
              </div>
              <div>
                {
                  print && <PrintReceipt order = {print} />
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
