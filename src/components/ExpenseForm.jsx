import { useState } from "react";
import axios from "../api/axios";

export default function ExpenseForm({ onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    category_id: "",
    type: "expense",
    description: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/transactions", {
        ...form,
        amount: Number(form.amount),
        tags: form.tags.split(",").map((tag) => tag.trim()),
      });

      // Reset form
      setForm({
        amount: "",
        category_id: "",
        type: "expense",
        description: "",
        tags: "",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="bg-gradient-to-br from-[#0f172a] to-[#111827]
               border border-cyan-500/20
               rounded-2xl p-8 mb-8
               backdrop-blur-lg
               shadow-lg shadow-cyan-500/10
               transition-all duration-300"
  >
    <h2 className="text-2xl font-semibold mb-6 text-white">
      Add Transaction
    </h2>

    {/* Amount */}
    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={form.amount}
      onChange={handleChange}
      required
      className="bg-white/5 border border-white/10
                 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40
                 text-white placeholder-gray-400
                 p-3 w-full mb-4 rounded-xl
                 outline-none transition-all duration-300"
    />

    {/* Category */}
    <input
      type="text"
      name="category_id"
      placeholder="Category ID"
      value={form.category_id}
      onChange={handleChange}
      required
      className="bg-white/5 border border-white/10
                 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40
                 text-white placeholder-gray-400
                 p-3 w-full mb-4 rounded-xl
                 outline-none transition-all duration-300"
    />

    {/* Type */}
    <select
      name="type"
      value={form.type}
      onChange={handleChange}
      className="bg-white/5 border border-white/10
                 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40
                 text-white
                 p-3 w-full mb-4 rounded-xl
                 outline-none transition-all duration-300"
    >
      <option value="expense" className="bg-[#0f172a]">Expense</option>
      <option value="income" className="bg-[#0f172a]">Income</option>
    </select>

    {/* Description */}
    <input
      type="text"
      name="description"
      placeholder="Description"
      value={form.description}
      onChange={handleChange}
      className="bg-white/5 border border-white/10
                 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40
                 text-white placeholder-gray-400
                 p-3 w-full mb-4 rounded-xl
                 outline-none transition-all duration-300"
    />

    {/* Tags */}
    <input
      type="text"
      name="tags"
      placeholder="Tags (comma separated)"
      value={form.tags}
      onChange={handleChange}
      className="bg-white/5 border border-white/10
                 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40
                 text-white placeholder-gray-400
                 p-3 w-full mb-6 rounded-xl
                 outline-none transition-all duration-300"
    />

    {/* Button */}
    <button
      type="submit"
      disabled={loading}
  className="w-full py-3 rounded-xl font-semibold
           bg-gradient-to-r from-green-400 to-green-600
           hover:from-green-500 hover:to-green-700
           text-white
           shadow-lg shadow-green-500/30
           transition-all duration-300
           disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add Transaction"}
    </button>
  </form>
);
}