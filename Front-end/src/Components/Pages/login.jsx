import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../Feature/userSlice";
import { Link, useNavigate, Navigate } from "react-router-dom";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("All fields are required!");
    }

    const response = await axios.post(
      "http://localhost:8000/user/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response, email, password);

    if (response.status === 200) {
      toast.success("Login successful!");
      console.log("lgoin");
      dispatch(addUser(response.data.user));
      // localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      if (
        response.data.user.role &&
        response.data.user.role.toLowerCase() === "admin"
      ) {
        navigate("");
      } else {
        navigate("");
      }
    } else {
      toast.error("Login failed! Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex rounded-2xl items-center justify-center bg-gradient-to-br bg-white  px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Login
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password webauthn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Submit
          </button>
          <Link to={"/signup"}>Not yet regiter</Link>
        </form>
      </div>
    </div>
  );
};

export default login;
