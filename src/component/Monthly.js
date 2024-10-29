import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";
import TabButton from "../Pages/Tab";

const Monthly = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  // Fetch data from backend API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://leader-board-backend-ovod.onrender.com/api/user/v1/your-monthly-history"
      );
      const data = response.data; // Correctly access data
      if (data.success) {
        const sortedUsers = data.data.sort((a, b) => b.Points - a.Points);
        setUsers(sortedUsers);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Log the error
    }
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <> <Header />
      <div className="bg-gray-100 min-h-screen pb-20 flex flex-col items-center">


        <div className="flex justify-center space-x-4 my-8">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 text-center text-lg font-semibold w-full max-w-4xl">
          {users.slice(0, 3).map((user) => (
            <div
              className="bg-white p-6 rounded-lg shadow-md"
              key={user._id}
            >
              <div className="font-semibold">{user._id}</div>
              <div className="text-gray-600">Total Points: {user.totalPointsAwarded}</div>
              <div className="text-orange-500">Prize: ₹{user.totalPointsAwarded}</div>
            </div>
          ))}
        </div>

        {/* Rank List */}
        <ul className="space-y-4 w-full max-w-4xl">
          {users.map((user, index) => (
            <li
              key={user._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
            >
              <div className="flex items-center space-x-4">
                <CiUser size={28} className="text-gray-700" />
                <div>
                  <div className="font-semibold text-xl">{user._id}</div>
                  <span className="text-gray-500">Rank: {index + 1}</span>
                </div>
              </div>
              <div className="text-orange-500 font-bold">Prize: ₹{user.totalPointsAwarded}</div>
              <div className="text-green-500 font-bold">{user.totalPointsAwarded}</div>
            </li>
          ))}
        </ul>

        <Footer />
        {/* Bottom Navigation Bar */}
      </div>
    </>
  );

};

export default Monthly;
