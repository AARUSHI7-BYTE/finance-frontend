import { useEffect, useState } from "react";
import api from "../api/axios";
import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this goal?")) return;

    try {
      await api.delete(`/goals/${id}`);
      fetchGoals();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await api.get("/goals");
      setGoals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

    {/* Page Title */}
    <h1 className="text-2xl sm:text-3xl font-bold mb-6">
      Goals
    </h1>

    {/* Goal Form */}
    <div className="mb-8">
      <GoalForm onSuccess={fetchGoals} />
    </div>

    {/* Goals Grid */}
    {goals.length === 0 ? (
      <p className="text-gray-400 text-center mt-10">
        No goals created yet.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onUpdate={fetchGoals}
            onDelete={handleDelete}
          />
        ))}
      </div>
    )}

  </div>
);
}