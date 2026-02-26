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
  <div className="p-6">
    <BudgetForm onSuccess={fetchBudgets} />

    {enrichedBudgets.map((budget) => (
      <BudgetCard
        key={budget.id}
        budget={budget}
        onDelete={handleDelete}
      />
    ))}
  </div>
);
}