const form = document.getElementById("expense-form");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categorySelect = document.getElementById("category");
const expenseList = document.getElementById("expense-list");

// Load existing expenses
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach(addExpenseToScreen);
}

function addExpenseToScreen(expense) {
  const card = document.createElement("div");
  card.className = "card mb-3 expense-card shadow-sm";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex justify-content-between align-items-center";

  const details = document.createElement("div");
  details.innerHTML = `
    <h5 class="card-title text-success">₹ ${expense.amount}</h5>
    <p class="card-text mb-1">${expense.description}</p>
    <span class="badge bg-secondary">${expense.category}</span>
  `;

  const actions = document.createElement("div");
  actions.className = "d-flex flex-column gap-2";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "btn btn-warning btn-sm";
  editBtn.onclick = () => {
    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categorySelect.value = expense.category;

    card.remove();
    deleteExpense(expense.id);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.onclick = () => {
    card.remove();
    deleteExpense(expense.id);
  };

  actions.append(editBtn, deleteBtn);
  cardBody.append(details, actions);
  card.append(cardBody);
  expenseList.append(card);
}

function deleteExpense(id) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const amount = amountInput.value;
  const description = descriptionInput.value;
  const category = categorySelect.value;

  if (!amount || !description) {
    alert("Please fill in all fields.");
    return;
  }

  const expense = {
    id: Date.now(),
    amount,
    description,
    category
  };

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  addExpenseToScreen(expense);
  form.reset();
});

window.addEventListener("DOMContentLoaded", () => {
  loadExpenses();

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});

document.getElementById("toggle-dark-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});
