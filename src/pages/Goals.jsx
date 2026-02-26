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
    <div className="p-6">
      <GoalForm onSuccess={fetchGoals} />

      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onUpdate={fetchGoals}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}