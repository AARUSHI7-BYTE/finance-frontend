import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 
      bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a]
      backdrop-blur-lg
      border-b border-cyan-500/20
      shadow-lg shadow-cyan-500/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo / Title */}
          <Link 
            to="/dashboard" 
            className="text-white font-semibold text-lg sm:text-xl"
          >
            Finance Tracker
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <Link to="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
            <Link to="/transactions" className="hover:text-cyan-400 transition">Transactions</Link>
            <Link to="/budgets" className="hover:text-cyan-400 transition">Budgets</Link>
            <Link to="/goals" className="hover:text-cyan-400 transition">Goals</Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden flex flex-col gap-4 pb-4 text-sm text-gray-300">
            <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link to="/transactions" onClick={() => setOpen(false)}>Transactions</Link>
            <Link to="/budgets" onClick={() => setOpen(false)}>Budgets</Link>
            <Link to="/goals" onClick={() => setOpen(false)}>Goals</Link>
          </div>
        )}
      </div>
    </nav>
  );
}