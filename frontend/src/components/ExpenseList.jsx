import { deleteExpense } from "../services/api";

function ExpenseList({ expenses, fetchExpenses, onEdit }) {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await deleteExpense(id);
      alert("Expense deleted successfully!");
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense.");
    }
  };

  if (expenses.length === 0) {
    return <h3>No expenses found.</h3>;
  }

  return (
    <div className="expense-list">
      <h2>Expense History</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.title}</td>
              <td>₹{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>

              <td>
                <button
                  onClick={() => onEdit(expense)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ExpenseList;