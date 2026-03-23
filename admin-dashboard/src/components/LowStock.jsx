import React from "react";

export default function LowStock({ products }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      {products.map((p) => (
        <div key={p._id} className="flex justify-between border-b py-2">
          <span>{p.name}</span>
          <span className="text-red-400">{p.stock}</span>
        </div>
      ))}
    </div>
  );
}