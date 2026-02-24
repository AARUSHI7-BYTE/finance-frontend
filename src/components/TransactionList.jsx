import axios from "../api/axios";

export default function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await axios.delete(`/transactions/${id}`);
      if (onDelete) onDelete();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  if (!transactions.length) {
    return (
      <div className="text-center text-gray-400 mt-10 text-lg">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="bg-white/5 backdrop-blur-lg border border-white/10 
                     rounded-2xl p-5 flex justify-between items-center
                     hover:shadow-lg hover:shadow-emerald-500/10 
                     transition-all duration-300"
        >
          {/* LEFT SIDE */}
          <div>
            <h3 className="font-semibold text-white text-lg">
              {t.description || "No description"}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              {t.category_name || "Uncategorized"}
            </p>

            {t.tags && t.tags.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {t.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              {new Date(t.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="text-right">
            <p
              className={`font-bold text-xl ${
                t.type === "expense"
                  ? "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                  : "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              }`}
            >
              {t.type === "expense" ? "-" : "+"} ₹{t.amount}
            </p>

            <button
              onClick={() => handleDelete(t.id)}
              className="text-xs text-gray-500 hover:text-red-400 mt-3 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}