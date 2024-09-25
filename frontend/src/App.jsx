import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import Cart from "./Pages/Cart/Cart";
import { useEffect, useState } from "react";
import PlaceOrders from "./Pages/PlaceOrders/PlaceOrders";
import Verify from "./Pages/Verify/Verify";
import MyOrders from "./Pages/MyOrders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState("");
  const [token1, setToken1] = useState("");
  useEffect(() => {
    setToken1(localStorage.getItem("token"));
    setName(localStorage.getItem("userName"));
  }, []);
  return (
    <>
      {showLogin ? (
        <LoginPopUp setShowLogin={setShowLogin} setName={setName} />
      ) : (
        <></>
      )}
      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          setName={setName}
          name={name}
          token1={token1}
        />

        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/placeOrders" element={<PlaceOrders />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/myorders" element={<MyOrders />}></Route>
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
