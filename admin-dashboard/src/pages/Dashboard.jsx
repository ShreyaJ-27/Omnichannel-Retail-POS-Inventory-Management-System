import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import StatCard from "../components/StatCard";
import LowStock from "../components/LowStock";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getDashboard();
    setData(res.data);
  };

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-5 text-white">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Orders" value={data.totalOrders} />
        <StatCard title="Revenue" value={`₹${data.totalRevenue}`} />
        <StatCard title="Products" value={data.totalProducts} />
      </div>

      <h2 className="mt-6 mb-2 text-lg">Low Stock</h2>
      <LowStock products={data.lowStockProducts} />
    </div>
  );
}