import { useMemo } from "react";

export default function BudgetCard({ budget }) {
  const { category_name, limit_amount, spent_amount } = budget;

  const percentage = useMemo(() => {
    if (!limit_amount) return 0;
    return Math.min((spent_amount / limit_amount) * 100, 100);
  }, [spent_amount, limit_amount]);

  const remaining = limit_amount - spent_amount;
  const exceeded = spent_amount > limit_amount;

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#111827] 
                    border border-cyan-500/20 
                    rounded-2xl p-6 mb-5 
                    backdrop-blur-lg 
                    hover:shadow-lg hover:shadow-cyan-500/20 
                    transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          {category_name}
        </h3>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            exceeded
              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          }`}
        >
          {exceeded ? "Limit Reached" : "On Track"}
        </span>
      </div>

      {/* Numbers */}
      <div className="text-sm mb-4 space-y-1 text-gray-300">
        <p>
          Spent: <strong className="text-white">₹{spent_amount}</strong>
        </p>
        <p>
          Limit: <strong className="text-white">₹{limit_amount}</strong>
        </p>
        <p>
          Remaining:{" "}
          <strong
            className={
              exceeded
                ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                : "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]"
            }
          >
            ₹{remaining}
          </strong>
        </p>
      </div>

      {/* Progress Bar Background */}
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${
            exceeded
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
              : "bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="text-right text-xs mt-2 text-gray-400">
        {percentage.toFixed(0)}% used
      </div>
    </div>
  );
}