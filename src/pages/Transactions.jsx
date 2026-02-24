import { useEffect, useState } from "react";
import axios from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    axios.get("/transactions").then((res) => setTransactions(res.data));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-6">
      <ExpenseForm onSuccess={fetchTransactions} />

      <h1 className="bg-gradient-to-r from-[#0f172a] to-[#111827] 
           border border-cyan-500/20 
           rounded-2xl p-5 
           hover:shadow-lg hover:shadow-cyan-500/20 
           transition-all duration-300">Transactions</h1>

      <TransactionList
        transactions={transactions}
        onDelete={fetchTransactions}
      />
    </div>
  );
}