import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  
  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <div className="text-2xl text-center">
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className="flex flex-col gap-3 mt-4 text-sm">
        <div className="flex justify-between py-2 border-b border-gray-300">
          <p className="font-medium">Subtotal</p>
          <p className="font-semibold">{currency} {getCartAmount()}.00</p>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <p className="font-medium">Shipping Fee</p>
          <p className="font-semibold">{currency} {delivery_fee}.00</p>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <p className="font-medium">Total</p>
          <p className="font-semibold">{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-medium text-lg">Final Amount</p>
          <p className="font-semibold text-lg text-purple-600">{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
