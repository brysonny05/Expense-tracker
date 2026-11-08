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
    { name: "Paycheck", amount: 850, type: "income", date: "2026-10-22"},
    { name: "Kroger", amount: 65.50, type: "expense", date: "2026-11-03" },
    { name: "Gas Station", amount: 40, type: "expense", date: "2026-10-17" },
    { name: "Netflix", amount: 15.99, type: "expense", date: "2026-10-11" },
    { name: "Refund", amount: 25, type: "income", date: "2026-11-06" }
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
    let totalIncome = calculateIncome();
    let totalExpenses = calculateExpenses();

    let today = new Date();
    let currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

    let monthlyTransactions = transactions.filter(transaction => {
        return transaction.date.slice(0, 7) === currentMonth;
    });

    let monthlyIncome = monthlyTransactions.filter(transaction => {
        return transaction.type === "income";
    });

    let monthlyExpenses = monthlyTransactions.filter(transaction => {
        return transaction.type === "expense";
    });

    let totalMonthlyIncome = monthlyIncome.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);

    let totalMonthlyExpenses = monthlyExpenses.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);

    let balanceChangeElement = document.getElementById("balance-change");
    let incomeChangeElement = document.getElementById("income-change");
    let expenseChangeElement = document.getElementById("expense-change");
    let savingsChangeElement = document.getElementById("savings-change");

    let totalBalance = totalIncome - totalExpenses;

    let balanceElement = document.getElementById("balance-num");
    balanceElement.textContent = totalBalance.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let incomeElement = document.getElementById("income-num");
    incomeElement.textContent = totalMonthlyIncome.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let expensesElement = document.getElementById("expense-num");
    expensesElement.textContent = totalMonthlyExpenses.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let totalSavings = totalIncome * .2;
    let savingsElement = document.getElementById("savings-num");
    savingsElement.textContent = totalSavings.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    displayChange(incomeChangeElement, incomeChange);

    displayChange(expenseChangeElement, expenseChange, true);

    displayChange(balanceChangeElement, balanceChange);
}


let novemberIncome = transactions.filter(transaction => {
    return transaction.type === "income" &&
    transaction.date.slice(0, 7) === "2026-11";
});

let novemberExpenses = transactions.filter(transaction => {
    return transaction.type === "expense" &&
    transaction.date.slice(0, 7) === "2026-11";
});

let octoberIncome = transactions.filter(transaction => {
    return transaction.type === "income" &&
    transaction.date.slice(0, 7) === "2026-10";
});

let octoberExpenses = transactions.filter(transaction => {
    return transaction.type === "expense" &&
    transaction.date.slice(0, 7) === "2026-10";
});

let totalNovIncome = novemberIncome.reduce((total, transaction) => {
    return total + transaction.amount;
}, 0);

let totalNovExpenses = novemberExpenses.reduce((total, transaction) => {
    return total + transaction.amount;
}, 0);

let totalOctIncome = octoberIncome.reduce((total, transaction) => {
    return total + transaction.amount;
}, 0);

let totalOctExpenses = octoberExpenses.reduce((total, transaction) => {
    return total + transaction.amount;
}, 0);

function calculatePercentageChange(newValue, oldValue) {
    return (newValue - oldValue) / oldValue * 100;
}

let incomeChange = calculatePercentageChange(totalNovIncome, totalOctIncome);

let expenseChange = calculatePercentageChange(totalNovExpenses, totalOctExpenses);

let octoberBalance = totalOctIncome - totalOctExpenses;
let novemberBalance = totalNovIncome - totalNovExpenses;

let balanceChange = calculatePercentageChange(novemberBalance, octoberBalance);

function displayChange(element, change, reverse = false) {
    if (change >= 0 && reverse === true) {
        element.classList.add("negative-change");
        element.textContent = "↑ " + Math.abs(change).toFixed(2) + "% from last month";
    }

    else if (change < 0 && reverse === true) {
        element.classList.add("positive-change");
        element.textContent = "↓ " + Math.abs(change).toFixed(2) + "% from last month";
    }

    else if (change >= 0 && reverse === false) {
        element.classList.add("positive-change");
        element.textContent = "↑ " + Math.abs(change).toFixed(2) + "% from last month";
    }

    else if (change < 0 && reverse === false) {
        element.classList.add("negative-change");
        element.textContent = "↓ " + Math.abs(change).toFixed(2) + "% from last month";
    }
}

updateDashboard()