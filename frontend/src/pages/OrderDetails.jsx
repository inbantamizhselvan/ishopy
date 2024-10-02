import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const OrderDetails = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const loadOrderDetails = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/order/userorders`, { orderId }, {
        headers: { token },
      });

      if (response.data.success) {
        const order = response.data.orders.find(order => order._id === orderId);
        setOrderDetails(order);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const downloadReceipt = () => {
    const doc = new jsPDF();
    const logo = assets.logo;
    const logoWidth = 40;
    const logoHeight = 20;
    const logoX = 15;
    const logoY = 10;

    doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
    doc.setFontSize(24);
    doc.setTextColor(40);
    doc.text('Order Receipt', 20, 35);
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 40, 200, 40);

    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.setFont('bold');
    const detailsY = 40;
    doc.text(`Order ID: ${orderDetails._id}`, 20, detailsY);
    doc.text(`Date: ${new Date(orderDetails.date).toDateString()}`, 20, detailsY + 10);
    doc.text(`Payment Method: ${orderDetails.paymentMethod}`, 20, detailsY + 20);
    doc.text(`Payment Status: ${orderDetails.payment ? "Paid" : "Pending"}`, 20, detailsY + 30);
    doc.text(`Customer Name: ${orderDetails.address.firstName} ${orderDetails.address.lastName}`, 20, detailsY + 40);
    doc.text(`Phone: ${orderDetails.address.phone}`, 20, detailsY + 50);
    doc.text(`Address:`, 20, detailsY + 60);
    const address = `${orderDetails.address.street}, ${orderDetails.address.city}, ${orderDetails.address.state}, ${orderDetails.address.country} - ${orderDetails.address.zipcode}`;
    doc.text(address, 20, detailsY + 65);
    doc.text(`Order Status: ${orderDetails.status}`, 20, detailsY + 75);

    doc.setFontSize(16);
    doc.setTextColor(40);
    const itemsStartY = detailsY + 90;
    doc.text('Items Ordered', 20, itemsStartY);

    const itemRowHeight = 10;

    doc.setFontSize(12);
    doc.setTextColor(100);
    const headerY = itemsStartY + 5;
    doc.line(20, headerY, 190, headerY);
    doc.text('Item Name', 20, headerY + 10);
    doc.text('Size', 110, headerY + 10);
    doc.text('Price', 140, headerY + 10);
    doc.text('Quantity', 160, headerY + 10);
    doc.text('Total', 180, headerY + 10);

    doc.line(10, headerY + 15, 190, headerY + 15);

    orderDetails.items.forEach((item, index) => {
      const y = headerY + (index + 2) * itemRowHeight;
      doc.text(item.name, 20, y);
      doc.text(item.size, 110, y);
      doc.text(`${currency}${item.price.toFixed(2)}`, 140, y);
      doc.text(item.quantity.toString(), 160, y);
      doc.text(`${currency}${(item.price * item.quantity).toFixed(2)}`, 180, y);
      doc.line(10, y + 2, 200, y + 2);
    });

    doc.setFontSize(14);
    doc.setTextColor(60);
    const summaryY = headerY + (orderDetails.items.length + 2) * itemRowHeight + 10;

    doc.line(10, summaryY - 5, 200, summaryY - 5);
    doc.text('Order Summary', 20, summaryY);
    doc.line(10, summaryY + 5, 200, summaryY + 5);

    const subtotal = (orderDetails.amount - 10).toFixed(2);
    doc.text(`Subtotal: ${currency}${subtotal}`, 20, summaryY + 15);
    doc.text(`Delivery Fee: ${currency}10.00`, 20, summaryY + 25);
    doc.text(`Total: ${currency}${orderDetails.amount.toFixed(2)}`, 20, summaryY + 35);

    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text(`Total: ${currency}${orderDetails.amount.toFixed(2)}`, 20, summaryY + 50);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for your order!', 20, summaryY + 70);
    doc.text('Please keep this receipt for your records.', 20, summaryY + 75);

    doc.save(`receipt_${orderDetails._id}.pdf`);
  };

  const getOrderStatusStep = (status) => {
    switch (status) {
      case 'Order Placed': return 1;
      case 'Order Processing': return 2;
      case 'Shipped': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 0;
    }
  };
  
  const renderProgressBar = () => {
      const stages = [
          { label: 'Order Placed', color: '#4caf50' },  
          { label: 'Order Processing', color: '#ff9800' }, 
          { label: 'Shipped', color: '#2196f3' },         
          { label: 'Out for Delivery', color: '#f44336' }, 
          { label: 'Delivered', color: '#9c27b0' }        
      ];
  
      const statusStep = getOrderStatusStep(orderDetails.status);
      const totalSteps = stages.length;  
      return (
          <div className="flex flex-col items-start mt-6">
              {stages.map((stage, index) => {
                  const isActive = index + 1 <= statusStep;
                  const isCompleted = index < statusStep;
                  const isHovered = hoveredIndex === index;
  
                  return (
                      <div 
                          key={index} 
                          className="flex items-center relative mb-6"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                      >
                          <motion.div
                              className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                                  isActive ? `border-${stage.color}` : 'border-gray-300 bg-white'
                              } ${isCompleted ? `${stage.color} bg-opacity-100` : 'bg-opacity-0'}`}
                              style={{ backgroundColor: isCompleted ? stage.color : 'white' }}
                              animate={{ scale: isHovered ? 1.1 : 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          >
                              {isActive ? (
                                  <span className="text-white font-bold">{index + 1}</span>
                              ) : (
                                  <span className="text-gray-500 font-bold">{index + 1}</span>
                              )}
                          </motion.div>
  
                          <span className={`ml-4 text-sm ${isActive ? `${stage.color} font-semibold` : 'text-gray-500'}`}>
                              {stage.label}
                          </span>
  
                          {/* Tooltip */}
                          {isHovered && (
                              <motion.div
                                  className="absolute left-16 top-10 bg-gray-800 text-white text-xs rounded-md p-2 shadow-lg"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                              >
                                  {stage.label}
                              </motion.div>
                          )}
  
                          {/* Connecting line for all stages except the last one */}
                          {index < totalSteps - 1 && (
                              <div
                                  className={`absolute left-5 top-12 w-1 h-16 transition-all duration-300 ${
                                      isCompleted ? `${stage.color}` : 'bg-gray-300'
                                  }`}
                              ></div>
                          )}
                      </div>
                  );
              })}
          </div>
      );
  };


  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Order details and items */}
        <div className="col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Order Details</h1>
          <div className="order-summary mb-4 p-4 bg-gray-50 rounded-md shadow-sm">
            <p className="text-lg text-gray-900">
              <strong>Order ID:</strong> {orderDetails._id}
            </p>
            <p className="text-lg text-gray-900">
              <strong>Date:</strong> {new Date(orderDetails.date).toDateString()}
            </p>
            <p className="text-lg text-gray-900">
              <strong>Payment Method:</strong> {orderDetails.paymentMethod}
            </p>
            <p className="text-lg text-gray-900">
              <strong>Payment Status:</strong>{" "}
              <span className={orderDetails.payment ? "text-green-600" : "text-red-600"}>
                {orderDetails.payment ? "Paid" : "Pending"}
              </span>
            </p>
            <p className="text-lg text-gray-900">
              <strong>Customer Name:</strong> {orderDetails.address.firstName} {orderDetails.address.lastName}
            </p>
            <p className="text-lg text-gray-900">
              <strong>Phone:</strong> {orderDetails.address.phone}
            </p>
            <p className="text-lg text-gray-900">
              <strong>Address:</strong> {orderDetails.address.street}, {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.country} - {orderDetails.address.zipcode}
            </p>
            <p className="text-lg text-gray-900">
              <strong>Order Status:</strong>{" "}
              <span className={`status-${orderDetails.status.toLowerCase()}`}>
                {orderDetails.status}
              </span>
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Items Ordered:</h2>
          <ul className="space-y-4">
            {orderDetails.items.map((item) => (
              <li key={item._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="text-lg text-gray-900">
                  <strong>{item.name}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Size:</strong> {item.size}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> {currency}{item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total:</strong> {currency}{(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - Actions */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Actions</h2>
          <button
            onClick={downloadReceipt}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
          >
            Download Receipt
          </button>

          {/* Render progress bar vertically below the button */}
          {renderProgressBar()}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
