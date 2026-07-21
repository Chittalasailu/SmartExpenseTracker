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

  const resetForm = () => {
    setExpense({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
    setSelectedExpense(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const expenseData = {
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        date: expense.date,
      };

      console.log("Sending Expense:", expenseData);

      if (selectedExpense) {
        const res = await updateExpense(selectedExpense.id, expenseData);
        console.log("Update Success:", res.data);
        alert("Expense updated successfully!");
      } else {
        const res = await addExpense(expenseData);
        console.log("Add Success:", res.data);
        alert("Expense added successfully!");
      }

      resetForm();
      fetchExpenses();
    } catch (error) {
      console.error("========== AXIOS ERROR ==========");
      console.error(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(
          `Backend Error (${error.response.status})\n\n${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
      } else if (error.request) {
        console.log(error.request);

        alert(
          "No response received from backend.\n\nCheck Render backend and CORS."
        );
      } else {
        console.log(error.message);
        alert(error.message);
      }
    }
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
            onClick={resetForm}
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