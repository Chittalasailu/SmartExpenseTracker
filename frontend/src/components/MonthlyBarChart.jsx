import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MonthlyBarChart({ expenses }) {
  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (monthlyTotals[month]) {
      monthlyTotals[month] += Number(expense.amount);
    } else {
      monthlyTotals[month] = Number(expense.amount);
    }
  });

  const data = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: "#3B82F6",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Monthly Expense Report",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (expenses.length === 0) {
    return <p>No expense data available.</p>;
  }

  return <Bar data={data} options={options} />;
}

export default MonthlyBarChart;