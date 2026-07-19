import { useEffect, useState } from "react";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ExportButtons from "./components/ExportButtons";
import Dashboard from "./components/Dashboard";

import { getExpenses } from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Apply search and category filters
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h1>💰 Smart Expense Tracker</h1>

      <Summary expenses={filteredExpenses} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        expenses={expenses}
      />

      <ExportButtons expenses={filteredExpenses} />

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        selectedExpense={selectedExpense}
        setSelectedExpense={setSelectedExpense}
      />

      <ExpenseList
        expenses={filteredExpenses}
        fetchExpenses={fetchExpenses}
        onEdit={setSelectedExpense}
      />

      <Dashboard expenses={filteredExpenses} />
    </div>
  );
}

export default App;