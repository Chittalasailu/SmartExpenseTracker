import axios from "axios";

const API = axios.create({
  baseURL: "https://smartexpensetracker-kqky.onrender.com",
});

// Get all expenses
export const getExpenses = () => API.get("/expenses");

// Get one expense
export const getExpense = (id) => API.get(`/expenses/${id}`);

// Add expense
export const addExpense = (expense) => API.post("/expenses", expense);

// Update expense
export const updateExpense = (id, expense) =>
  API.put(`/expenses/${id}`, expense);

// Delete expense
export const deleteExpense = (id) =>
  API.delete(`/expenses/${id}`);

export default API;