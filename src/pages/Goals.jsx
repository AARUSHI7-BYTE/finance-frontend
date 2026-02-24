import { useEffect, useState } from "react";
import axios from "../api/axios";
import GoalCard from "../components/GoalCard";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  const fetchGoals = () => {
    axios.get("/goals").then((res) => setGoals(res.data));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Goals</h1>

      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onUpdate={fetchGoals} />
      ))}
    </div>
  );
}