 
import { useContext } from "react";
import "./CartItems.css";
import { StoreContext } from "../Context/StoreContext";
 
const CartItems = () => 
{
  const {cartItems,getTotalCartAmount,food_list,removeFromCart}=useContext(StoreContext)
  return (
    <div className="items-container">
      
      <div className="cartitems">
        <div>Products</div>
        <div>Title</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
        <div>Remove</div>
      </div>

      <hr className="product-hr" />

{food_list.map((item,index)=>{
  if(cartItems[item._id])
    {
      return (
            <div key={index}>
              <div className="cartitem-products" key={index}>
                <div className="product-pic">
                  <img src={item.image} alt="" />
                </div>
                <div className="product-title">
                  <p>{item.name}</p>
                </div>
                <div className="product-price">
                  <p>₹ {item.price*80}</p>
                </div>

                <div className="product-quantity">
                  <p>{cartItems[item._id]}</p>
                </div>

                <div className="product-total">
                  <p>₹ {(item.price*80)*cartItems[item._id]}</p>
                </div>

                <div className="product-remove">
                  <button onClick={() => removeFromCart(item._id)}>⚔️</button>
                </div>
              </div>
              <hr className="product-hr" />
            </div>
          );
  }
  else{
    return null;
  }
})}

      <div className="sec-div">

        <div className="left-div">
          
          <div className="subtotal">
            <span>Subtotal</span>
            <span>₹ {getTotalCartAmount()*80}</span>
          </div>

          <div className="shipping-free">
            <span>Shipping</span>
            <span>₹ 200</span>                  
          </div>
          <div className="total">
            <span>Total</span>
            <span>₹ {(getTotalCartAmount()*80)+200} </span>
          </div>
          
          <button className="btn-proceed">PROCEED TO CHECKOUT</button>
        </div>

        <div className="right-div">
          <p>If you have a promo code , Enter it here</p>
          <div className="promo-div">
            <input type="text" placeholder="promo code" />
            <button className="btn-promo">Submit</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CartItems;
