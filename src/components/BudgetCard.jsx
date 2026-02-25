import { useMemo } from "react";

export default function BudgetCard({ budget }) {
  // Match your actual DB column names
  const categoryName = budget.categories?.name || "Unknown Category";
  const limitAmount = Number(budget.monthly_limit || 0);
  const spentAmount = Number(budget.spent_amount || 0); // may not exist yet

  const percentage = useMemo(() => {
    if (!limitAmount) return 0;
    return Math.min((spentAmount / limitAmount) * 100, 100);
  }, [spentAmount, limitAmount]);

  const remaining = limitAmount - spentAmount;
  const exceeded = spentAmount > limitAmount;

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#111827] 
                    border border-cyan-500/20 
                    rounded-2xl p-6 mb-5 
                    backdrop-blur-lg 
                    hover:shadow-lg hover:shadow-cyan-500/20 
                    transition-all duration-300">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          {categoryName}
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

      <div className="text-sm mb-4 space-y-1 text-gray-300">
        <p>
          Spent: <strong className="text-white">₹{spentAmount}</strong>
        </p>
        <p>
          Limit: <strong className="text-white">₹{limitAmount}</strong>
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