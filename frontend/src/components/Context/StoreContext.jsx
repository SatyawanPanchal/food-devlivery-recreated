/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken]=useState("");
 
  const url='http://localhost:4000'
console.log('cartItems=>',cartItems);

  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      // it means if there is no member in cart with this itemId then set it to 1
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post(url+'/api/cart/add',{itemId},{headers:{token}});
    }

  };

  const removeFromCart = async(itemId) => {
    if(cartItems[itemId]>0)
    {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    if(token)
    {
      await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}});
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (let item in cartItems) {
      let currentItem = food_list.find((product) => product._id === item);
      totalAmount += currentItem.price * cartItems[item];
    }
    return totalAmount;
  };

  const loadCartData=async (token)=>{
    const response=await axios.post(url+'/api/cart/get',{ },{headers:{token}});
    setCartItems(response.data.cartData);
  }
  useEffect(() => {
    async function loadData() {
    //  await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    url,
    setToken,
    loadCartData,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    food_list,
    cartItems
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
