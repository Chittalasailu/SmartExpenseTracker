function Summary({ expenses }) {

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const totalTransactions = expenses.length;

  return (
    <div className="summary">

      <h2>Expense Summary</h2>

      <div className="summary-card">
        <h3>Total Expenses</h3>
        <p>₹ {totalExpenses.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>Total Transactions</h3>
        <p>{totalTransactions}</p>
      </div>

    </div>
  );
}

export default Summary;