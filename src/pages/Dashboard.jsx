import Charts from "../components/Charts";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Finance Dashboard
      </h1>

      <Charts />
    </div>
  );
}