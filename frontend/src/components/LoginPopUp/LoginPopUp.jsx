import "./LoginPopUp.css";
const LoginPopUp = () => {
  return (
    <div className="login-popup">
      <form onSubmit="" className="login-popup-container">
        <input type="text" placeholder="Enter you name" required />
        <input type="email" placeholder="Enter email here" required />
        <input type="password" placeholder="Enter password here" required />
        
        <button type="submit"> Create Account</button>
        <div className="login-condition">
          <input type="checkbox" />{" "}
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
         
        </div>
        <p>Already have an account?<button>Login here.</button> </p>

      </form>
    </div>
  );
};
export default LoginPopUp;
