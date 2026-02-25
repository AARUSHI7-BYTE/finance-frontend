import axios from "axios";
import { useState } from "react";
// import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3500/api/auth/register", { email, password });

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-900 to-black">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-2xl shadow-2xl border border-green-700">

        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Register
        </h2>
    <form onSubmit={handleRegister}>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <br /> <br />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <br /> <br />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300 font-medium"
      >
        Register
      </button>
    </form>
        </div>
        </div>
  );
}