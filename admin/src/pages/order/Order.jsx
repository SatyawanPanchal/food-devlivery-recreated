/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const Order = ({ serverUrl }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${serverUrl}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
      console.log("fetched orders ", response.data.data);
    } else {
      toast.error("Error in loading data");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

 

   const statusHandler = async (event, orderId) => {
    //console.log("calling the status Handler on Select",event,orderId)
    const response = await axios.post(serverUrl + "/api/order/status", {
      orderId,
      status: event.target.value,
    });

    console.log(response)

    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  return (
    <div>
      <h3>Orders Page</h3>
      <div className="order-list">
     
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.Items.map((item, index) => {
                  if (index === order.Items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity;
                  }
                })}
              </p>

              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", "}</p>
                <p>{order.address.state + ", "}</p>
                <p>{order.address.country + ", "}</p>
                <p>{order.address.zipcode + ", "}</p>
              </div>
              <p className="order-item-phone">
                <p>{order.address.phone + ", "}</p>
              </p>
            </div>
            <p>Items :{order.items?order.items.length:"0"}</p>
            <p>Rs.{order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

 

export default Order;
