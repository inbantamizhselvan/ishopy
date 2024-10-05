import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [otp, setOtp] = useState(''); 
  const [isOtpSent, setIsOtpSent] = useState(false); 
  const { token, setToken, navigate, backendURL } = useContext(ShopContext); 
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        if (isOtpSent) {
          console.log("hello")
          const response = await axios.post(`${backendURL}/api/user/verifyotp`, { email, otp });
          console.log(response.data);
          if (response.data.success) {
            console.log(response.data);
            toast.success("Account created successfully! You can now login.");
            setEmail('');
            setName('');
            setPassword('');
            setOtp('');
            setCurrentState('Login'); 
            setIsOtpSent(false);
          } else {
            toast.error(response.data.message);
          }
        } else {
          const response = await axios.post(`${backendURL}/api/user/register`, { name, email, password });
          if (response.data.success) {
            toast.success(response.data.message);
            setIsOtpSent(true); 
          } else {
            toast.error(response.data.message);
          }
        }
      } else {
        const response = await axios.post(`${backendURL}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token); 
          localStorage.setItem('token', response.data.token); 
          toast.success("Login successful!");
          navigate('/'); 
        } else {
          setName('');
          setEmail('');
          setPassword('');
          setOtp('');
          toast.error(response.data.message); 
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); 
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center p-10 bg-cover bg-center" 
         style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,water')" }}>
      <div className="bg-white bg-opacity-90 rounded-lg border-2 shadow-lg p-8 w-full max-w-md transition-transform transform hover:scale-105 sm:p-6 md:p-8">
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>{currentState}</h1>
        <hr className='border-none h-[2px] w-12 bg-purple-600 mx-auto mb-4' />

        <form onSubmit={onSubmitHandler}>
          {currentState === 'Sign Up' && !isOtpSent && (
            <input
              required
              className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 transform hover:scale-105'
              type="text"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            required
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 transform hover:scale-105'
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isOtpSent && (
            <input
              required
              className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 transform hover:scale-105'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {isOtpSent && currentState === 'Sign Up' && (
            <input
              required
              className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 transform hover:scale-105'
              type="text"
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          <div className='flex flex-col items-center'>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105 mb-4"
            >
              {currentState === 'Sign Up' ? (isOtpSent ? 'Verify OTP' : 'Sign Up') : 'Login'}
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentState(currentState === 'Sign Up' ? 'Login' : 'Sign Up');
                setIsOtpSent(false);
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              {currentState === 'Sign Up' ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
