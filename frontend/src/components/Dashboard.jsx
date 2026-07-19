import CategoryPieChart from "./CategoryPieChart";
import MonthlyBarChart from "./MonthlyBarChart";

function Dashboard({ expenses }) {
  return (
    <div className="dashboard">
      <h2>📊 Expense Analytics</h2>

      <div className="charts-container">
        <div className="chart-card">
          <CategoryPieChart expenses={expenses} />
        </div>

        <div className="chart-card">
          <MonthlyBarChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;