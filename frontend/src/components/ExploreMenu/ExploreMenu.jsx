/* eslint-disable react/prop-types */
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useEffect  } from "react";

const ExploreMenu = ({category,setCategory}) => {
     
    const handleCategory=(menu_name)=>{
        setCategory(menu_name)
        
    }

    useEffect(()=>{
        
        
    },[category])
  return (
    <div className="explore-menu" id="explore-menu">
      <p className="exploremenu">Explore the menu</p>
      <p className="menu-description">  Choose the food from our diverse menu </p>
      <div className="explore-menu-items">
        {menu_list.map((item, index) => {
          return (
            <div  key={index} onClick={()=>{handleCategory(item.menu_name)}} className={category===item.menu_name?"menu-type-list-active":"menu-type-list"}>
              <img src={item.menu_image} alt="" />
           <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
