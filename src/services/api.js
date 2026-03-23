import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Dashboard
export const getDashboard = () => API.get("/reports/dashboard");

// Sales
export const getSales = (date) => API.get(`/reports/sales?date=${date}`);
