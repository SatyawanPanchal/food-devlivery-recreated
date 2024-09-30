 
 
 
 
 
 
 
 
 {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {orders.Items.map((item, index) => {
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