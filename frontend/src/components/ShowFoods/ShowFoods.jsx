import { useContext } from "react";
import "./ShowFoods.css";
import { StoreContext } from "../Context/StoreContext";

import FoodItem from "../FoodItem/FoodItem";
// eslint-disable-next-line react/prop-types
const ShowFoods = ({ category }) => {
 

  const { food_list } = useContext(StoreContext);
  return (
    <div className="showfoods">
      <div className="dishes">
        {food_list.map((item, index) => {
          if (item.category === category || category === "all") {
            return (
              <div key={index}>
                  <FoodItem key={index} item={item}/>
              </div>

             
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShowFoods;
