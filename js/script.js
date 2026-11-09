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

    //Get the current month and year.
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    let currentMonthString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;

    let previousMonth;
    let previousYear;

    //Determine the previous month and year.
    //IF current month is January:
    if (currentMonth === 0) {
        //Set previous month to December (11).
        previousMonth = 11;
    
        //Set previous year to current year minus 1.
        previousYear = currentYear - 1;
    }

    //ELSE:
    else {
        //Set previous month to current month minus 1.
        previousMonth = currentMonth - 1

        //Set previous year to current year.
        previousYear = currentYear
    }

    //Format the previous month into a YYYY-MM string.
    //Convert the month into a two-digit number.
    //Combine previous year, a dash, and the formatted month.
    let previousMonthString = `${previousYear}-${String(previousMonth + 1).padStart(2, "0")}`;

    let monthlyTransactions = transactions.filter(transaction => {
        return transaction.date.slice(0, 7) === currentMonthString;
    });

    let monthlyIncome = monthlyTransactions.filter(transaction => {
        return transaction.type === "income";
    });

    let monthlyExpenses = monthlyTransactions.filter(transaction => {
        return transaction.type === "expense";
    });

    //Filter transactions.
    //Create an array containing transactions from the previous month.
    let previousMonthTransactions = transactions.filter(transaction => {
        return transaction.date.slice(0, 7) === previousMonthString
    });

    //Separate previous-month transactions.
    //Create an array containing only income transactions.
    let previousMonthIncome = previousMonthTransactions.filter(transaction => {
        return transaction.type === "income"
    });    

    //Create an array containing only expense transactions.
    let previousMonthExpenses = previousMonthTransactions.filter(transaction => {
        return transaction.type === "expense"
    })

    let totalMonthlyIncome = monthlyIncome.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);

    let totalMonthlyExpenses = monthlyExpenses.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);

    //Calculate previous-month totals.
    //Add together all previous-month income amounts.
    let previousMonthTotalIncome = previousMonthIncome.reduce((total, transaction) => {
        return total + transaction.amount
    }, 0);

    //Add together all previous-month expense amounts.
    let previousMonthTotalExpenses = previousMonthExpenses.reduce((total, transaction) => {
        return total + transaction.amount
    }, 0);

    let previousMonthBalance = previousMonthTotalIncome - previousMonthTotalExpenses;

    let currentMonthBalance = totalMonthlyIncome - totalMonthlyExpenses;

    let balanceChange;
    
    if (previousMonthBalance === 0) {
        balanceChange = "unavailable"
    }

    else {
        balanceChange = (currentMonthBalance - previousMonthBalance) / previousMonthBalance * 100
    }

    let incomeChange;

    //Calculate percentage changes.
    //IF previous-month income equals 0:
    if (previousMonthTotalIncome === 0) {
        //Set income percentage change to unavailable.
        incomeChange = "unavailable"
    }

    //ELSE
    else {
        //Calculate income percentage change:
        //(Current month income - Previous month income) / Previous month income * 100.
        incomeChange = (totalMonthlyIncome - previousMonthTotalIncome) / previousMonthTotalIncome * 100
    }

    let expenseChange;

    //IF previous-month expenses equals 0:
    if ( previousMonthTotalExpenses === 0) {
        //Set expense percentage change to unavailable.
        expenseChange = "unavailable"
    }

    //ELSE
    else {
        //Calculate expense percentage change:
        //(Current month expenses - Previous month expenses) / Previous month expenses * 100.
        expenseChange = (totalMonthlyExpenses - previousMonthTotalExpenses) / previousMonthTotalExpenses * 100
    }

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

function displayChange(element, change, reverse = false) {

    if (change === "unavailable") {
        element.textContent = "N/A";
        return;
    }
    
    element.classList.remove("positive-change", "negative-change");

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





