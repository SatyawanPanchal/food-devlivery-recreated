 
import header_image from "../../assets/header_img.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
     
      <div className="header">
        <img className="img-header" src={header_image} alt=" " />
        
        <div className="inside-header">
          <p className="frndsfood"> Friends foods your food here </p>
          <p className="foodintro">choose from the menu items given below here . 
          they are made all by teach PrakashTechs </p>
        <button>View Menu</button>
        </div>
     
      </div>
    </div>
  );
};

export default Header;
