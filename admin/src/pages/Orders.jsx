import React, { useEffect, useState } from "react";
import { currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000" + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000" + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePrint = (order) => {
    const printContents = document.getElementById(
      `print-${order._id}`
    ).innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) => {
    return (
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.userId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <h3 className="w-full text-base text-xl font-medium">Received Orders</h3>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Order ID or User ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded mb-4"
      />
      <div>
        {filteredOrders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 rounded-md bg-purple-100 border-purple-600 p-5 md:p-8 my-3 md:my-4 text-sm sm:text-md text-black hover:border-black"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <div key={index}>
                        <p className="text-green-600">OrderId: {order._id}</p>
                        <p className="py-0.5">
                          {item.name} X {item.quantity} <span>{item.size}</span>
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} X {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              Order Amount: {currency} {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Order Processing">Order Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <div className="flex justify-end items-center col-span-5">
              <button
                onClick={() => handlePrint(order)}
                className="font-semibold bg-purple-800 px-4 py-2 text-xs rounded text-white flex items-center"
              >
                <i className="bi bi-receipt mr-1"></i>
                Print Receipt
              </button>
            </div>
            <div
              id={`print-${order._id}`}
              className="hidden p-6 border-2 border-gray-300 rounded-xl shadow-lg max-w-lg mx-auto bg-white font-sans"
            >
              <header className="text-center mb-6">
                <h2 className="text-3xl text-gray-800 font-extrabold uppercase tracking-wide">
                  Order Receipt
                </h2>
                <p className="text-sm text-gray-600">
                  Thank you for your purchase!
                </p>
              </header>

              <section className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Order Details
                </h3>
                <hr className="border-gray-300 mb-4" />
                <p className="mb-2">
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Payment Status:</span>{" "}
                  {order.payment ? "Paid" : "Pending"}
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Customer Information
                </h3>
                <hr className="border-gray-300 mb-4" />
                <p className="mb-2">
                  <span className="font-medium">Name:</span>{" "}
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.address.phone}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Address:</span>{" "}
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zipcode}
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Order Items
                </h3>
                <hr className="border-gray-300 mb-4" />
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b border-gray-200 pb-2"
                    >
                      <span>
                        {item.name} ({item.size})
                      </span>
                      <span className="font-medium">
                        {item.quantity} x {currency} {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <footer className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Amount: {currency} {order.amount}
                </h3>
                <p className="text-sm text-gray-600">Thank you for shopping with us!</p>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
