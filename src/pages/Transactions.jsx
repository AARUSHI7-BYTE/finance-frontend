import { useEffect, useState } from "react";
import api from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.log("Transaction fetch error:", error.response?.data);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("Category fetch error:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <ExpenseForm
        categories={categories}
        onSuccess={fetchTransactions}
      />

      <h1
        className="bg-gradient-to-r from-[#0f172a] to-[#111827] 
        border border-cyan-500/20 
        rounded-2xl p-5 
        hover:shadow-lg hover:shadow-cyan-500/20 
        transition-all duration-300"
      >
        Transactions
      </h1>

      <TransactionList
        transactions={transactions}
        onDelete={fetchTransactions}
      />
    </div>
  );
}