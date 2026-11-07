let darkmode = localStorage.getItem ('darkmode')
const themeSwitch = document.getElementById ('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.removeItem('darkmode')
}

if (darkmode === "active") enableDarkmode()


themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !== "active") {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
})

const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

if (hour < 12) {
    greeting.textContent = "Good Morning, USER 👋";
}
else if (hour < 18) {
    greeting.textContent = "Good Afternoon, USER 👋";
}
else {
    greeting.textContent ="Good Evening, USER 👋";
}

const dateDis = document.getElementById("date");
const today = new Date();

const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
};

dateDis.textContent =  today.toLocaleDateString("en-US", options);

let transactions = [
    { name: "Paycheck", amount: 850, type: "income" },
    { name: "Kroger", amount: 65.50, type: "expense" },
    { name: "Gas Station", amount: 40, type: "expense" },
    { name: "Netflix", amount: 15.99, type: "expense" },
    { name: "Refund", amount: 25, type: "income" }
];

function calculateIncome() {

    let income = transactions.filter(transaction => {
        return transaction.type === "income";
    });

    let totalIncome = income.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);

    return totalIncome
}

function calculateExpenses() {

    let expenses = transactions.filter(transaction => {
        return transaction.type === "expense";
    });

    let totalExpenses = expenses.reduce((total, transaction) => {
        return total + transaction.amount
    }, 0);

    return totalExpenses
}

function updateDashboard() {
    let totalIncome = calculateIncome()
    let totalExpenses = calculateExpenses()

    let totalBalance = totalIncome - totalExpenses;

    let balanceElement = document.getElementById("balance-num");
    balanceElement.textContent = totalBalance.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let incomeElement = document.getElementById("income-num");
    incomeElement.textContent = totalIncome.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let expensesElement = document.getElementById("expense-num");
    expensesElement.textContent = totalExpenses.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let totalSavings = totalIncome * .2;
    let savingsElement = document.getElementById("savings-num");
    savingsElement.textContent = totalSavings.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

updateDashboard()