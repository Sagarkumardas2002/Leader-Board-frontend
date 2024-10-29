import React, { useState } from "react";
import Popup from "./../component/Popup";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => setIsPopupOpen(!isPopupOpen);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-black p-4 md:p-6 text-white shadow-md">
      <ul className="flex justify-between items-center  mx-auto px-2">
        {/* Left side - Leaderboard */}
        <li className="text-lg md:text-xl font-semibold">
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-blue-400")}
            style={{ textTransform: "uppercase" }}
          >
            Leaderboard
          </NavLink>
        </li>

        {/* Right side - Other links */}
        <div className="flex items-center space-x-4 text-sm md:text-base">
          {!auth?.user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-blue-400")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-blue-400")}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-blue-400")}
                >
                  Home
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-blue-400")}
                >
                  Home
                </NavLink>
              </li>
              <li className="relative">
                <button onClick={handleProfile} className="hover:text-blue-400">
                  {auth.user.username}
                </button>
                {isPopupOpen && (
                  <Popup
                    name={auth.user.username}
                    points={auth.user.Points}
                    email={auth.user.email}
                    onClose={handleClosePopup}
                  />
                )}
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-blue-400">
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;
