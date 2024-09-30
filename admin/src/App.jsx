import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Order from "./pages/order/Order";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  const serverUrl = "http://localhost:4000";
  return (
    <>
      <BrowserRouter>
        <Navbar /> <hr />
        <div className="app-content">
          <div className="leftbar">
            <Sidebar />
          </div>

          <div className="rightbar">
            <Routes>
              <Route path="/add" element={<Add serverUrl={serverUrl} />} />
              <Route path="/list" element={<List serverUrl={serverUrl} />} />
              <Route path="/order" element={<Order serverUrl={serverUrl} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
