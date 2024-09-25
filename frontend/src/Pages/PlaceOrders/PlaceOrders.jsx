import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../components/Context/StoreContext";
import "./PlaceOrders.css";
import axios from "axios";
import { food_list } from "../../assets/assets";
const PlaceOrders = () => {
  const { url, token, getTotalCartAmount, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        // if food item exists in cartItems
        console.log("food item in placeorder ", item);
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log("token in placeorder=", token);
    console.log("ordered items  -->", orderData);

    //const response=await axios.post(url+'/api/order/placeorder',data,{ headers : {token}  });
    const response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    console.log('session url we got =',response.data.session_url);
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <form className="place-order" onSubmit={(e) => placeOrder(e)}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="firstname"
            onChange={onChangeHandler}
            value={data.firstname}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>₹ {getTotalCartAmount() * 86}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{86 * getTotalCartAmount() + 200}</b>
            </div>
            <hr />
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrders;
