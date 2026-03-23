import React, { useState } from "react";
import { getSales } from "../services/api";

export default function Analytics() {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await getSales(date);
    setData(res.data);
  };

  return (
    <div className="p-5 text-white">
      <h1 className="text-xl font-bold mb-4">Sales Analytics</h1>

      <input
        type="date"
        className="p-2 text-black"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        onClick={fetchData}
        className="ml-2 px-3 py-2 bg-purple-600 rounded"
      >
        Check
      </button>

      {data && (
        <div className="mt-4">
          <p>Total Orders: {data.totalOrders}</p>
          <p>Total Revenue: ₹{data.totalRevenue}</p>
        </div>
      )}
    </div>
  );
}