import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken, navigate, backendURL} = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios .post(backendURL + '/api/user/register', {name, email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else{
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendURL + '/api/user/login', {email, password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else{
          toast.error(response.data.message);
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/');
    }
  })

  return (
    <div className="flex justify-center items-center p-10 bg-cover bg-center" 
         style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,water')" }}>
      <div className="bg-white bg-opacity-90 rounded-lg border-2 shadow-lg p-8 w-full max-w-md transition-transform transform hover:scale-105 sm:p-6 md:p-8">
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>{currentState}</h1>
        <hr className='border-none h-[2px] w-12 bg-purple-600 mx-auto mb-4' />

        <form onSubmit={onSubmitHandler}>
          {currentState === 'Sign Up' && (
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

          <input
            required
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 transform hover:scale-105'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='flex flex-col justify-between text-sm mt-4'>
            <p className='text-purple-600 hover:underline cursor-pointer text-center'>Forgot Password?</p>
            <p 
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className='text-purple-600 hover:underline cursor-pointer text-center'
            >
              {currentState === 'Login' ? 'Create Account' : 'Login Here!'}
            </p>
          </div>

          <button type="submit" className='bg-purple-600 text-white font-semibold py-3 rounded-lg mt-6 w-full transition duration-300 hover:bg-purple-700 transform hover:scale-105'>
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
