import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../Feature/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      return toast.error("All fields are required!");
    }

    const response = await axios.post("http://localhost:8000/user/create", {
      name: name,
      email: email,
      password: password,
    });

    if (response.status === 201) {
      toast.success("Login successful!");
      dispatch(addUser(response.data.user));
      navigate("/contacts");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="w-full h-full flex rounded-2xl items-center justify-center bg-gradient-to-br bg-white  px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Sign Up
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              name="password"
              id="password"
              type="password"
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
              handleSignUp();
            }}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
          <Link to={"/"}>Already have an account</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
