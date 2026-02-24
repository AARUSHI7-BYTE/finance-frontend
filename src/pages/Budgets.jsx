import { useEffect, useState } from "react";
import axios from "../api/axios";
import BudgetCard from "../components/BudgetCard";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    axios.get("/budgets").then((res) => setBudgets(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Budgets</h1>

      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
}