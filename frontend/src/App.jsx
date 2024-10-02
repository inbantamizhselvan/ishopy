import React from 'react';
import {Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import MyProfile from "./pages/MyProfile"
import OrderDetails from './pages/OrderDetails';
import Chats from './pages/Chats';

const App = () => {
  return (
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/product/:productId" element={<Product />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/place-order" element={<PlaceOrder />}/>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/verify" element={<Verify />}/>
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/order/:orderId' element={<OrderDetails />} />
          <Route path='/chats' element={<Chats />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
