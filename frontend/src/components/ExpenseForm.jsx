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
      const expenseData = {
        title: expense.title,
        amount: parseFloat(expense.amount),
        category: expense.category,
        date: expense.date,
      };

      console.log("Sending:", expenseData);

      if (selectedExpense) {
        const response = await updateExpense(selectedExpense.id, expenseData);
        console.log("Update Response:", response.data);
        alert("Expense updated successfully!");
      } else {
        const response = await addExpense(expenseData);
        console.log("Create Response:", response.data);
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
      console.log("========== ERROR ==========");
      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);

        alert(
          `Server Error\n\nStatus: ${error.response.status}\n\n${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        console.log("No response received:", error.request);

        alert(
          "No response received from backend.\n\nCheck Render backend and CORS."
        );
      } else {
        console.log("Error:", error.message);

        alert(error.message);
      }
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