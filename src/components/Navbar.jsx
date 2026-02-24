import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
  className="sticky top-0 z-50
             bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a]
             backdrop-blur-lg
             border-b border-cyan-500/20
             shadow-lg shadow-cyan-500/10
             px-8 py-4
             flex items-center justify-between"
>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/budgets">Budgets</Link>
      <Link to="/goals">Goals</Link>
    </nav>
  );
}