import './Navbar.css'
import logo from "../../assets/logo.png";
import search from '../../assets/search_icon.png'
import basket from '../../assets/basket_icon.png'


const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logodiv navbar-left">
        <img src={logo} alt="img" />
      </div>

      <div className="navbar-middle">
        <ul className="navbar">
          <li>Home</li>
          <li>Menu</li>
          <li>Mobile-App</li>
          <li>Contact-Us</li>
        </ul>
      </div>
<div className="navbar-right">
<img src={search} alt="" />
<img src={basket} alt="" />
<button className='btn-login'>Log-In</button>
</div>



    </div>
  );
};

export default Navbar;
