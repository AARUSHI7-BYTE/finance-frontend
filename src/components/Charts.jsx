import { useEffect, useState } from "react";
import api from "../api/axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Charts() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const expenseMap = {};

  transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        new Date(t.transaction_date).getMonth() === currentMonth &&
        new Date(t.transaction_date).getFullYear() === currentYear
    )
    .forEach((t) => {
      const category = t.category_name || "Other";
      if (!expenseMap[category]) {
        expenseMap[category] = 0;
      }
      expenseMap[category] += Number(t.amount);
    });

  const data = {
    labels: Object.keys(expenseMap),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(expenseMap),
        backgroundColor: "#10b981", // emerald green
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
      },
      y: {
        ticks: { color: "#9ca3af" },
      },
    },
  };

  return <Bar data={data} options={options} />;
}