import { useEffect, useState } from "react";
import { addExpense, updateExpense } from "../services/api";

function ExpenseForm({
  fetchExpenses,
  selectedExpense,
  setSelectedExpense,
}) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (selectedExpense) {
      setExpense({
        title: selectedExpense.title,
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        date: selectedExpense.date,
      });
    }
  }, [selectedExpense]);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedExpense) {
        await updateExpense(selectedExpense.id, {
          title: expense.title,
          amount: parseFloat(expense.amount),
          category: expense.category,
          date: expense.date,
        });

        alert("Expense updated successfully!");
      } else {
        await addExpense({
          title: expense.title,
          amount: parseFloat(expense.amount),
          category: expense.category,
          date: expense.date,
        });

        alert("Expense added successfully!");
      }

      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
      });

      setSelectedExpense(null);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Operation failed.");
    }
  };

  const handleCancel = () => {
    setExpense({
      title: "",
      amount: "",
      category: "",
      date: "",
    });

    setSelectedExpense(null);
  };

  return (
    <div className="expense-form">
      <h2>{selectedExpense ? "Edit Expense" : "Add Expense"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={expense.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {selectedExpense ? "Update Expense" : "Add Expense"}
        </button>

        {selectedExpense && (
          <button
            type="button"
            onClick={handleCancel}
            style={{
              marginTop: "10px",
              backgroundColor: "#6b7280",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ExpenseForm;