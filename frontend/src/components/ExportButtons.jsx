import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportButtons({ expenses }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Smart Expense Tracker Report", 14, 20);

    const tableData = expenses.map((expense) => [
      expense.id,
      expense.title,
      expense.category,
      `₹${expense.amount}`,
      expense.date,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Title", "Category", "Amount", "Date"]],
      body: tableData,
    });

    doc.save("Expense_Report.pdf");
  };

  return (
    <div className="export-buttons">
      <button onClick={exportPDF}>
        📄 Export PDF
      </button>
    </div>
  );
}

export default ExportButtons;