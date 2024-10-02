import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3 text-center">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-6">
        <div>
          {cartData.length === 0
          ? (<p className='text-center text-gray-400 pl-10 mt-8'>There are no products added to your cart yet, Try adding something which you like!</p>
          ):(cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) {
              return null; 
            }

            return (
              <div
                key={index}
                className="py-6 px-2 border-b border-gray-200 transition-all duration-200 sm:py-3 px-3 hover:shadow-lg hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <img
                      className="w-20 h-20 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                      src={productData.image[0]} // Access image only if productData is defined
                      alt=""
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="text-xl font-bold text-purple-600">
                          {currency}
                          {productData.price}
                        </p>
                        <p className="px-2 text-sm font-medium text-white bg-purple-600 rounded-full">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      required
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "" && value !== "0") {
                          updateQuantity(item._id, item.size, Number(value));
                        }
                      }}
                      className="border-2 border-purple-400 rounded-full max-w-[80px] sm:max-w-[100px] px-2 py-1 transition-all duration-200 focus:border-purple-600 focus:outline-none"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />
                    <img
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="w-5 h-5 ml-4 cursor-pointer transition-transform duration-300 hover:scale-125"
                      src={assets.bin_icon}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          }))
        }
        </div>

        {/* Cart Total Section */}
        <div className="flex flex-col justify-end mt-4 lg:mt-0">
          <CartTotal />
          <div className="w-full text-end mt-4">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-purple-600 text-white text-sm my-8 px-8 py-3 rounded-full transition-transform duration-200 hover:bg-purple-700 hover:scale-105"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
