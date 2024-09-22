/* eslint-disable react/prop-types */

import './FoodItem.css'
import add_icon_white from "../../assets/add_icon_white.png";
import remove_icon_red from "../../assets/remove_icon_red.png";
import rating from "../../assets/rating_starts.png";
import {   useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({ item }) => {
  const { _id,  image,   name, price } = item;
 const {cartItems,addToCart,removeFromCart} = useContext(StoreContext)
 
 
  return (
    <div>
      <div className="single-dish">
        <img className="img-dish" src={image} alt="" />

        <div className="add-remove-div">
        {cartItems[_id]>0? <> <img onClick={()=>removeFromCart(_id)} src={remove_icon_red} alt="" /></>:<></> }
          
          <span>{cartItems[_id]>0?cartItems[_id]:0}</span>
          <img src={add_icon_white} onClick={()=>addToCart(_id)} alt="" />
        </div>

        {/* add remove icons  */}

        <div className="star-rating">
          <p>{name}</p> <img src={rating} alt="" />
        </div>
        <p className="dish-info">
          Food provides essential nutrients for overall health and well-being
        </p>
        <p className="price-info">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
