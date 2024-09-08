import { useContext } from "react";
import rating from "../../assets/rating_starts.png";

import "./ShowFoods.css";
import { StoreContext } from "../Context/StoreContext";
import add_icon_green from "../../assets/add_icon_green.png";
import add_icon_white from "../../assets/add_icon_white.png";
import remove_icon_red from "../../assets/remove_icon_red.png";
const ShowFoods = ({ category }) => {
  console.log("category in showfood", category);

  const { food_list } = useContext(StoreContext);
  return (
    <div className="showfoods">
      <div className="dishes">
        {food_list.map((item, index) => {
          if (item.category === category || category === "all") {
            return (
              <div key={index}>
               
                <div className="single-dish">
                 
                 
                    <img className="img-dish" src={item.image} alt="" />

                    <div className="add-remove-div">
                      <img src={remove_icon_red} alt="" />
                      <span>2</span>
                      <img src={add_icon_white} alt="" />      

                  </div>

                  {/* add remove icons  */}

                  <div className="star-rating">
                    <p>{item.name}</p> <img src={rating} alt="" />
                  </div>
                  <p className="dish-info">
                    Food provides essential nutrients for overall health and
                    well-being
                  </p>
                  <p className="price-info">${item.price}</p>
                </div>
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
