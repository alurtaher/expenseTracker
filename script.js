// Select form and inputs
const form = document.querySelector("form");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categorySelect = document.getElementById("category");

// Create a container to display expenses
const expenseList = document.createElement("ul");
document.body.appendChild(expenseList);

// Function to load existing expenses from localStorage
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach(expense => {
    addExpenseToScreen(expense);
  });
}

// Function to add a single expense to the screen
function addExpenseToScreen(expense) {
  const card = document.createElement("div");
  card.className = "expense-card";

  const details = document.createElement("div");
  details.className = "expense-details";

  details.innerHTML = `
    <div class="expense-amount">₹ ${expense.amount}</div>
    <div class="expense-desc">${expense.description}</div>
    <div class="expense-category">${expense.category}</div>
  `;

  // Action buttons
  const actions = document.createElement("div");
  actions.className = "card-actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    card.remove();
    deleteExpense(expense.id);
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categorySelect.value = expense.category;

    card.remove();
    deleteExpense(expense.id);
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(details);
  card.appendChild(actions);

  expenseList.appendChild(card);
}


// Function to delete expense from localStorage
function deleteExpense(id) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Handle form submission
form.addEventListener("submit", (e) => {
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

  // Add to localStorage
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Add to screen
  addExpenseToScreen(expense);

  // Reset form
  form.reset();
});

// Load expenses on page load
window.addEventListener("DOMContentLoaded", loadExpenses);

const toggleButton = document.getElementById("toggle-dark-mode");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load theme preference on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});
