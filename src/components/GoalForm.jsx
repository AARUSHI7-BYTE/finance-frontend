import { useState } from "react";
import api from "../api/axios";

export default function GoalForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    target_amount: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/goals", {
      ...form,
      target_amount: Number(form.target_amount),
    });

    setForm({
      title: "",
      target_amount: "",
      deadline: "",
    });

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Add Goal</h2>

      <input
        type="text"
        name="title"
        placeholder="Goal Title"
        value={form.title}
        onChange={handleChange}
        required
        className="p-3 w-full mb-4 rounded-xl"
      />

      <input
        type="number"
        name="target_amount"
        placeholder="Target Amount"
        value={form.target_amount}
        onChange={handleChange}
        required
        className="p-3 w-full mb-4 rounded-xl"
      />

      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        required
        className="p-3 w-full mb-4 rounded-xl"
      />

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold"
      >
        Create Goal
      </button>
    </form>
  );
}