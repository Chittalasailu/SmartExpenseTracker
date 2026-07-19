import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart({ expenses }) {
  // Calculate total amount for each category
  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += Number(expense.amount);
    } else {
      categoryTotals[expense.category] = Number(expense.amount);
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#EC4899",
          "#84CC16",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Expenses by Category",
      },
    },
  };

  if (expenses.length === 0) {
    return <p>No expense data available.</p>;
  }

  return <Pie data={data} options={options} />;
}

export default CategoryPieChart;