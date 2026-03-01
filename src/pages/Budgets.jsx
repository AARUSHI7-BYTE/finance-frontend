import { useEffect, useState } from "react";
import api from "../api/axios";
import BudgetCard from "../components/BudgetCard";
import BudgetForm from "../components/BudgetForm";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;

    try {
      await api.delete(`/budgets/${id}`);
      fetchBudgets();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBudgets = async () => {
    const res = await api.get("/budgets");
    setBudgets(res.data);
  };

  const fetchTransactions = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  // Calculate spent
  const enrichedBudgets = budgets.map((budget) => {
    const spent = transactions
      .filter(
        (t) =>
          t.category_id === budget.category_id &&
          t.type === "expense"
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      ...budget,
      spent_amount: spent,
    };
  });

return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    
    {/* Page Title */}
    <h1 className="text-2xl sm:text-3xl font-bold mb-6">
      Budgets
    </h1>

    {/* Budget Form */}
    <div className="mb-8">
      <BudgetForm onSuccess={fetchBudgets} />
    </div>

    {/* Budget Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrichedBudgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          onDelete={handleDelete}
        />
      ))}
    </div>

  </div>
);
}