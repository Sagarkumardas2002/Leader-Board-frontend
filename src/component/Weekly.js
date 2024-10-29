import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Navbar/Footer";
import TabButton from "../Pages/Tab";
import Header from "../Navbar/Header";

const Monthly = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  // Fetch data from backend API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://leader-board-backend-ovod.onrender.com/api/user/v1/your-weekly-history"
      );
      const data = response.data;
      if (data.success) {
        const sortedUsers = data.data.sort((a, b) => b.Points - a.Points);
        setUsers(sortedUsers);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full max-w-5xl mx-auto px-6 py-5">
        {/* Tabs */}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 text-xl">
          {users.slice(0, 3).map((user) => (
            <div className="bg-green-200 p-6 rounded-lg  text-center " key={user._id}>
              <div className="font-semibold">{user.username}</div>
              <div className="text-gray-600">Total Points: {user.totalPoints}</div>
              <div className="text-orange-500">Prize: ₹{user.totalPoints}</div>
            </div>
          ))}
        </div>

        {/* Rank List */}
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={user._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4 text-xl">
                <CiUser size={28} className="text-gray-700" />
                <div>
                  <div className="font-semibold">{user.username}</div>
                  <span className="text-gray-500">Rank: {index + 1}</span>
                </div>
              </div>
              <div className="text-orange-500 font-bold">Prize: ₹{user.totalPoints}</div>
              <div className="text-green-500 font-bold">{user.totalPoints}</div>
            </li>
          ))}
        </ul>

        {/* Bottom Navigation Bar */}
        <Footer />
      </div>
    </>
  );

};

export default Monthly;
