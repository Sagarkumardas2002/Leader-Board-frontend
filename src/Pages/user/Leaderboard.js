import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Navbar/Header";

// Modal Component for displaying user history
const UserHistoryModal = ({ isOpen, onClose, history, username }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-auto">
        <div className="bg-white p-4 rounded-lg max-w-lg w-full">
          <h2 className="text-lg font-bold mb-4">{username}'s History</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="border-b py-2">
                <div>Date: {entry.date}</div>
                <div>Points Awarded: {entry.pointsAwarded}</div>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

const Leaderboard = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from the backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://leader-board-backend-ovod.onrender.com/api/user/v1/get-users"
      );
      const data = await response.json();

      if (data.success) {
        // Sort users by Points in descending order
        const sortedUsers = data.data.sort((a, b) => b.Points - a.Points);
        setUsers(sortedUsers);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle fetching the user history when a user is clicked
  const handleGetUserHistory = async (username) => {
    try {
      const response = await fetch(
        "https://leader-board-backend-ovod.onrender.com/api/user/v1/your-history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setUserHistory(data.data); // Store user history
        setSelectedUser(username); // Set the selected user
        setIsModalOpen(true); // Open the modal
      } else {
        console.error("Failed to fetch user history:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getButtonStyle = (path) => {
    return location.pathname === path
      ? "bg-orange-500 text-white"
      : "bg-gray-200 text-gray-700";
  };

  return (
    <>
      <Header />
      <div>
        {/* Tabs */}
        <div className="flex justify-center space-x-4 my-4">
          <Link to="/">
            <button className={`${getButtonStyle("/")} py-2 px-4 rounded-full`}>
              Daily
            </button>
          </Link>
          <Link to="/weekly">
            <button
              className={`${getButtonStyle("/weekly")} py-2 px-4 rounded-full`}
            >
              Weekly
            </button>
          </Link>
          <Link to="/monthly">
            <button
              className={`${getButtonStyle("/monthly")} py-2 px-4 rounded-full`}
            >
              Monthly
            </button>
          </Link>
        </div>

        {/* Top Users */}
        <div className="flex justify-around items-center my-4">
          {users.slice(0, 3).map((user, index) => (
            <div className="text-center" key={user._id}>
              <div>{user.username}</div>
              <div>{user.Points}</div>
              <div className="text-orange-500">Prize: ₹{user.Points}</div>
            </div>
          ))}
        </div>

        {/* Rank List */}
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={user._id}
              onClick={() => handleGetUserHistory(user.username)} // Add onClick handler here
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <div className="flex items-center space-x-4">
                <CiUser />
                <div>
                  <div>{user.username}</div>
                  <span>Rank : {index + 1}</span>
                </div>
              </div>
              <div className="text-orange-500">Prize: ₹{user.Points}</div>
              <div className="text-green-500">{user.Points}</div>
            </li>
          ))}
        </ul>

        {/* Modal for showing user history */}
        <UserHistoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          history={userHistory}
          username={selectedUser}
        />
      </div>
    </>
  );
};

export default Leaderboard;
