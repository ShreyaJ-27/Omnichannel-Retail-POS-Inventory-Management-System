import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}