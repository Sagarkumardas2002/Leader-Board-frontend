import React, { useEffect, useState, useCallback } from "react";
import { CiUser } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { useAuth } from "./../../context/AuthContext";
import Message from "./message";
import TabButton from "../Tab";

const Home = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        "https://leader-board-backend-ovod.onrender.com/api/user/v1/get-users"
      );
      const data = await response.json();

      if (data.success) {
        const sortedUsers = data.data.sort((a, b) => b.Points - a.Points);
        setUsers(sortedUsers);
      } else {
        handleError("Failed to fetch users.");
      }
    } catch (error) {
      handleError("Error fetching users.");
    }
  }, []);

  const handleError = (message) => {
    console.error(message);
    toast.error(message);
  };

  const handleClaimPoints = async (username) => {
    if (!auth.user) {
      setIsPopupOpen(true);
      return;
    }

    try {
      const response = await fetch(
        "https://leader-board-backend-ovod.onrender.com/api/user/v1/claim-points",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success(`Points claimed successfully for ${username}`);
        fetchUsers();
      } else {
        handleError("Failed to claim points.");
      }
    } catch (error) {
      handleError("Error claiming points.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Header />

      <div className="bg-gray-100 flex flex-col items-center min-h-screen">
        {isPopupOpen && (
          <Message
            message="Please login to vote."
            onClose={() => setIsPopupOpen(false)}
          />
        )}

        <div className="w-full max-w-4xl px-6">
          {/* Tabs */}
          <div className="flex justify-center space-x-6 my-8">
            <TabButton to="/" isActive={location.pathname === "/"}>
              Daily
            </TabButton>
            <TabButton to="/weekly" isActive={location.pathname === "/weekly"}>
              Weekly
            </TabButton>
            <TabButton to="/monthly" isActive={location.pathname === "/monthly"}>
              Monthly
            </TabButton>
          </div>

          {/* Top Users */}
          <div className="grid grid-cols-3 gap-4 my-8 text-center text-lg font-semibold">
            {users.slice(0, 3).map((user) => (
              <div className="p-4 bg-white rounded-lg shadow-md" key={user._id}>
                <div>{user.username}</div>
                <div className="text-gray-600">Points: {user.Points}</div>
                <div className="text-orange-500">Prize: ₹{user.Points}</div>
              </div>
            ))}
          </div>

          {/* Rank List */}
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={user._id}
                onClick={() => handleClaimPoints(user.username)}
                className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition duration-200"
              >
                <div className="flex items-center space-x-4">
                  <CiUser size={28} className="text-gray-700" />
                  <div>
                    <div className="font-semibold text-xl">{user.username}</div>
                    <span className="text-gray-500">Rank: {index + 1}</span>
                  </div>
                </div>
                <div className="text-orange-500 font-bold">Prize: ₹{user.Points}</div>
                <div className="text-green-500 font-bold">Points: {user.Points}</div>
              </li>
            ))}
          </ul>
        </div>

        <Footer />
      </div>
    </>

  );
};

export default Home;
