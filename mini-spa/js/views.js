import { store } from "./store.js";

export const Dashboard = () => `
  <h2>Total Balance: ₹${store.total()}</h2>
  <ul>
    ${store.expenses.map(e => `
      <li>
        ₹${e.amount} - ${e.category}
        <button data-delete="${e.id}">Delete</button>
      </li>
    `).join("")}
  </ul>
`;

export const AddExpense = () => `
  <h2>Add Expense</h2>
  <form id="expenseForm">
    <input type="number" placeholder="Amount" required name="amount"/>
    <select name="category">
      <option>Food</option>
      <option>Transport</option>
      <option>Shopping</option>
      <option>Other</option>
    </select>
    <input type="date" name="date" required/>
    <input type="text" placeholder="Note" name="note"/>
    <button type="submit">Add</button>
  </form>
`;

export const Reports = () => `
  <div class="card">
    <h2>Expense Reports</h2>

    <div class="report-controls">
      <select id="monthFilter">
        <option value="all">All Months</option>
      </select>

      <select id="chartType">
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Chart</option>
      </select>

      <button id="exportCSV">Export CSV</button>
    </div>

    <div id="emptyState" class="empty-state hidden">
      No expenses available for selected month.
    </div>

    <canvas id="expenseChart"></canvas>
  </div>
`;

