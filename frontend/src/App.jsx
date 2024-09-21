 
import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import LoginPopUp from "./components/LoginPopUp/LoginPopUp"
import Cart from "./Pages/Cart/Cart"
import { useState } from "react"

 

const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  return (
    <div className="app">
    <Navbar setShowLogin={setShowLogin}/>

<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/login" element={<LoginPopUp/>}></Route>
  <Route path="/cart" element={<Cart/>}></Route>
</Routes>


        
    

     <Footer/>
    
    
    </div>
  )
}

export default App
