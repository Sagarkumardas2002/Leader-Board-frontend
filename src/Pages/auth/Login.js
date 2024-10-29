import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../../context/AuthContext';
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`https://leader-board-backend-ovod.onrender.com/api/auth/v1/login`, data);

      if (response?.data?.success) {
        console.log(response.data);
        toast.success(response.data.message);

        // Save user and token to local storage
        localStorage.setItem('auth', JSON.stringify({
          user: response.data.data, // Assuming 'data' contains user info
          token: response.data.token // Use the token returned
        }));

        // Update auth state
        setAuth({
          user: response.data.data,
          token: response.data.token
        });

        navigate("/"); // Redirect after successful login
      } else {
        console.log(response);
        toast.error(response.data.message || "User login failed");
      }
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Header /> {/* Include the Header component */}
      <div
        className="w-full max-w-md mx-auto mt-10 p-8 mt-20 border border-gray-300 rounded-lg shadow-2xl transition-transform transform hover:scale-105"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(229,229,229,1) 50%, rgba(207,207,207,1) 100%)'
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
              {...register("password", {
                required: "Password is required",
                maxLength: 128,
              })}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-blue-500 focus:outline-none mt-5"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>


      </div>
      <Footer /> {/* Include the Footer component */}
    </>
  );
};

export default Login;
