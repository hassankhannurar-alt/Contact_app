import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../Feature/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("All fields are required!");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        dispatch(addUser(response.data.user));

        // Navigate based on role
        if (response.data.user.role === "admin") {
          navigate("/admin/user");
        } else {
          navigate("/contacts");
        }
      } else {
        toast.error("Login failed! Please try again.");
      }
    } catch (err) {
      toast.error(
        "Login error: " + (err.response?.data?.message || err.message)
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="w-full h-full flex rounded-2xl items-center justify-center bg-gradient-to-br bg-white px-4">
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

          <div className="text-center mt-4">
            <Link to="/signup" className="text-purple-600 hover:underline">
              Not yet registered?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
