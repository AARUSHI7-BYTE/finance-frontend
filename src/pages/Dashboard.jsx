import Charts from "../components/Charts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-black text-white">
      <h1 className="p-10 text-3xl font-bold">Finance Dashboard</h1>
      <Charts />
    </div>
  );
}