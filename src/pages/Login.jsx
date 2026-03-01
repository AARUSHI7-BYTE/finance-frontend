import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
 
    const { data } = await axios.post("/auth/login", {
      email,
      password,
    });


    login(data.token);

    
    await axios.post("/categories/default");


    navigate("/dashboard");

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-green-900 to-black">
    <div className="w-full max-w-sm sm:max-w-md bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-green-700">
      
      <h2 className="text-xl sm:text-2xl font-semibold text-white text-center mb-6">
        Login
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-2 text-sm sm:text-base bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full mb-4 px-4 py-2 text-sm sm:text-base bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-2.5 rounded-lg transition duration-300 font-medium text-sm sm:text-base"
        >
          Register
        </button>
      </form>

    </div>
  </div>
);
}   