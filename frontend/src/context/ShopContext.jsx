import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = process.env.REACT_APP_CURRENCY || '$';
  const delivery_fee = Number(process.env.REACT_APP_DELIVERY_FEE);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    const savedExpiry = localStorage.getItem("tokenExpiry");
    // Check if the token is expired
    return (savedToken && savedExpiry && Date.now() < savedExpiry) ? savedToken : "";
  });
  const navigate = useNavigate();
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size", { autoClose: 1900 });
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendURL + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    toast.success("Product has been added to cart", { autoClose: 1900 });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (err) {}
      }
    }
    return totalCount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendURL + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserMessages = async (token) => {
    try {
      const response = await axios.post(backendURL + '/api/chats/messagecount', {}, { headers: { token } });
      if (response.data.success) {
        setNewMessagesCount(response.data.messageCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (token) {
      // Set the token in local storage along with its expiration time
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", Date.now() + 3600000); // 1 hour expiry
      getUserCart(token);
      getUserMessages(token);

      const tokenTimeout = setTimeout(() => {
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        toast.info("Your session has expired. Please login again.");
      }, 3600000); // Same duration as the token expiry

      return () => clearTimeout(tokenTimeout);
    }
  }, [token]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        const newToken = event.newValue;
        if (newToken) {
          setToken(newToken);
          getUserCart(newToken);
          getUserMessages(newToken);
        } else {
          setToken("");
          localStorage.removeItem("tokenExpiry"); // Clear expiry if token is cleared
        }
      }
    };

    // Listen to storage changes (for when localStorage changes in other tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    // On component unmount, remove the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendURL + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    setToken,
    token,
    getUserMessages,
    newMessagesCount,
    setNewMessagesCount,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
