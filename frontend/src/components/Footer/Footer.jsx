import "./Footer.css";
import logo from "../../assets/logo.png";

import facebook_icon from "../../assets/facebook_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import insta_icon from "../../assets/linkedin_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left-footer">
        <img src={logo} alt="" />
        <p> This website is created by satyawan</p>
        <div className="logos">
          <img src={facebook_icon} alt="" />
          <img src={twitter_icon} alt="" />
          <img src={insta_icon} alt="" />
        </div>
      </div>

      <div className="middle-footer">
        <h2>Company</h2>

        <ul className="company-navbar">
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      
      </div>

      <div className="right-footer middle-footer">
      <h2>Company</h2>

<ul className="company-navbar">
  <li>+91-9992026085</li>
  <li>Satyawan@gmail.com</li>
  <li>CopyRight@</li>
  <li>Roshni Education</li>
</ul>

      </div>
    </div>
  );
};

export default Footer;
