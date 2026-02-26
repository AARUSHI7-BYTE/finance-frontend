import { useMemo } from "react";
import api from "../api/axios";

export default function GoalCard({ goal, onUpdate, onDelete }) {
  const { id, title, target_amount, saved_amount } = goal;

  const percentage = useMemo(() => {
    if (!target_amount) return 0;
    return Math.min((saved_amount / target_amount) * 100, 100);
  }, [saved_amount, target_amount]);

  const remaining = target_amount - saved_amount;
  const completed = saved_amount >= target_amount;

  const handleAddContribution = async () => {
    const amount = prompt("Enter amount to add:");
    if (!amount) return;

    try {
      await api.put(`/goals/${id}/contribute`, {
        amount: Number(amount),
      });

      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#111827]
                    border border-cyan-500/20
                    rounded-2xl p-6 mb-5
                    backdrop-blur-lg
                    shadow-lg shadow-cyan-500/10
                    hover:shadow-cyan-500/20
                    transition-all duration-300">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium border ${completed
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
            }`}
        >
          {completed ? "Completed 🎉" : "In Progress"}
        </span>
      </div>

      <div className="text-sm mb-4 space-y-1 text-gray-300">
        <p>
          Saved: <strong className="text-white">₹{saved_amount}</strong>
        </p>
        <p>
          Target: <strong className="text-white">₹{target_amount}</strong>
        </p>
        <p>
          Remaining:{" "}
          <strong
            className={
              completed
                ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                : "text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
            }
          >
            ₹{remaining > 0 ? remaining : 0}
          </strong>
        </p>
      </div>

      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${completed
              ? "bg-gradient-to-r from-emerald-400 to-green-500 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
              : "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="text-right text-xs mt-2 text-gray-400">
        {percentage.toFixed(0)}% completed
      </div>

      {!completed && (
        <button
          onClick={handleAddContribution}
          className="mt-5 w-full py-3 rounded-xl font-semibold
                     bg-gradient-to-r from-emerald-400 to-cyan-500
                     hover:from-emerald-500 hover:to-cyan-600
                     text-black
                     shadow-lg shadow-emerald-500/20
                     transition-all duration-300"
        >
          Add Contribution
        </button>
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onDelete(goal.id)}
          className="px-4 py-2 text-sm rounded-lg
               bg-red-500/10 text-red-400
               border border-red-500/20
               hover:bg-red-500/20
               transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}