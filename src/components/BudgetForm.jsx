import { useEffect, useState } from "react";
import api from "../api/axios";

export default function BudgetForm({ onSuccess }) {
  const [form, setForm] = useState({
    category_id: "",
    monthly_limit: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/budgets", {
      ...form,
      monthly_limit: Number(form.monthly_limit),
    });

    setForm({
      category_id: "",
      monthly_limit: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Add Budget</h2>

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        required
        className="p-3 w-full mb-4 rounded-xl"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="monthly_limit"
        placeholder="Monthly Limit"
        value={form.monthly_limit}
        onChange={handleChange}
        required
        className="p-3 w-full mb-4 rounded-xl"
      />

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold"
      >
        Create Budget
      </button>
    </form>
  );
}