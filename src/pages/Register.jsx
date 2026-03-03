import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { createDefaultCategories } from "../api/axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Register user
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      // If your backend returns token on register
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        // 2️⃣ Create default categories
        await createDefaultCategories();
      }

      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-green-900 to-black">
      <div className="w-full max-w-sm sm:max-w-md bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-green-700">

        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full mb-4 px-4 py-2 text-sm sm:text-base bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

           {/* Password with Toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 pr-10 text-sm sm:text-base bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-2.5 rounded-lg transition duration-300 font-medium text-sm sm:text-base"
          >
            Register
          </button>
        </form>

        {/* Login Redirect Section */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:text-green-300 font-medium transition"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}