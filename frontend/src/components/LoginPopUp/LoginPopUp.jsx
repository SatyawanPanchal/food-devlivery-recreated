/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./LoginPopUp.css";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin, setName }) => {
  const [currState, setCurrState] = useState("Register");
  const { url, setToken, loadCartData } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChageHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log("data=", data);
  };

  const handleState = () => {
    if (currState === "Login") {
      setCurrState("Register");
    } else {
      setCurrState("Login");
    }
  };

  const onLogin = async (e) => 
  {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    console.log("name of the person logged in =", response.data.username);
    setName(response.data.username);
    if (response.data.success) {
      console.log("token we got after login=", response.data.token);

      setToken(response.data.token);

      localStorage.setItem("token", response.data.token);
      loadCartData(response.data.token);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={(e) => onLogin(e)} className="login-popup-container">
        <h2>{currState}</h2>
        {currState === "Register" ? (
          <input
            type="text"
            name="name"
            onChange={onChageHandler}
            placeholder="Enter you name"
            required
          />
        ) : (
          <></>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email here"
          onChange={onChageHandler}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password here"
          onChange={onChageHandler}
          required
        />

        <button className="btn-submit" type="submit">
          {currState === "Register" ? "Register" : "Login"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <div>
          {currState === "Register" ? (
            <p>
              Already have an account?
              <span onClick={() => handleState()} className="login-span">
                Login here.
              </span>
            </p>
          ) : (
            <p>
              Are you new customer?
              <span onClick={() => handleState()} className="login-span">
                Register here.
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
export default LoginPopUp;
