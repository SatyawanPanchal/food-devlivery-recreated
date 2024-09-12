/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { food_list } from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
console.log('cartItems=>',cartItems);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      // it means if there is no member in cart with this itemId then set it to 1
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    if(cartItems[itemId]>0)
    {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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

  

  const contextValue = {
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
