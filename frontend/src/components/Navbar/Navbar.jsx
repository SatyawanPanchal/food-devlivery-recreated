import "./Navbar.css";
import logo from "../../assets/logo.png";
import search from "../../assets/search_icon.png";
import basket from "../../assets/basket_icon.png";
import { Link } from "react-router-dom";
 
 
// eslint-disable-next-line react/prop-types
const Navbar = ({setShowLogin,name,setName,token1}) => {
 
 
 
  

  const handleLogout=()=>{
          setName("")
          localStorage.removeItem("token") ;
          localStorage.removeItem("userName")
          window.location.reload();
  }

  return (
    <div className="navbar-container">
      <div className="logodiv navbar-left">
        <Link to={"/"}>
          {" "}
          <img src={logo} alt="img" />{" "}
        </Link>
      </div>

      <div className="navbar-middle">
        <ul className="navbar">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <a href="#explore-menu">
            <li>Menu</li>
          </a>
          <a href="#app-download">
            <li>Mobile-App</li>
          </a>
          <a href="#footer">
            <li>Contact-Us</li>
          </a>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="" />
        <Link to={"/cart"}>
          {" "}
          <img src={basket} alt="" />{" "}
        </Link>
         {token1&&name?<><p>Welcome {name}</p> <button className="btn-login" onClick={()=>handleLogout()} >Log-out</button> </> :<button className="btn-login" onClick={()=>setShowLogin(true)}>Log-in</button>}
        
         
      </div>
    </div>
  );
};

export default Navbar;
