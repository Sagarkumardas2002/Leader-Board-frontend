import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Footer from "./Navbar/Footer";
import Header from "./Navbar/Header";
import Home from "./Pages/user/Home";
import UserPopup from "./component/Popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import Weekly from "./component/Weekly";
import Monthly from "./component/Monthly";
import Leaderboard from "./Pages/user/Leaderboard";
import Help from "./Pages/Help";
import About from "./Pages/About";

function App() {
  return (
    <Router>
      <div className="containermin-h-screen w-full">
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/username" element={<UserPopup />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Global Toast Container */}
        <ToastContainer
          position="top-right" // Position can be top-right, top-left, bottom-right, etc.
          autoClose={5000} // Auto-close after 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Footer />
    </Router>

  );
}

export default App;
