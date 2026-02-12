import { Dashboard, AddExpense, Reports } from "./views.js";
import { store } from "./store.js";

let chartInstance = null;

const routes = {
  "/": Dashboard,
  "/add": AddExpense,
  "/reports": Reports
};

export function router(pathname) {
  const view = routes[pathname] || (() => "<h2>404 - Page Not Found</h2>");
  document.getElementById("app").innerHTML = view();

  if (pathname === "/reports") {
    initReports();
  }
}



function initReports() {
  populateMonthFilter();
  renderChart();

  document.getElementById("monthFilter")
    .addEventListener("change", renderChart);

  document.getElementById("chartType")
    .addEventListener("change", renderChart);

  document.getElementById("exportCSV")
    .addEventListener("click", exportCSV);
}



function populateMonthFilter() {
  const select = document.getElementById("monthFilter");

  const months = [...new Set(
    store.expenses.map(e => e.date.slice(0, 7))
  )];

  months.forEach(month => {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = month;
    select.appendChild(option);
  });
}



function renderChart() {
  const ctx = document.getElementById("expenseChart");
  const selectedMonth = document.getElementById("monthFilter").value;
  const chartType = document.getElementById("chartType").value;

  let filteredExpenses = store.expenses;

  if (selectedMonth !== "all") {
    filteredExpenses = store.expenses.filter(e =>
      e.date.startsWith(selectedMonth)
    );
  }

  if (filteredExpenses.length === 0) {
    document.getElementById("emptyState").classList.remove("hidden");
    if (chartInstance) chartInstance.destroy();
    return;
  } else {
    document.getElementById("emptyState").classList.add("hidden");
  }

  const categoryTotals = {};

  filteredExpenses.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + Number(e.amount);
  });

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: chartType,
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        label: "Expenses",
        data: Object.values(categoryTotals),
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 1000
      }
    }
  });
}


function exportCSV() {
  let csvContent = "Date,Category,Amount,Note\n";

  store.expenses.forEach(e => {
    csvContent += `${e.date},${e.category},${e.amount},${e.note}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.csv";
  a.click();

  URL.revokeObjectURL(url);
}
