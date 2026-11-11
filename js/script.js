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
    { name: "Paycheck", amount: 850, type: "income", date: "2026-10-22", category: "Other"},
    { name: "Kroger", amount: 65.50, type: "expense", date: "2026-11-03", category: "Groceries"},
    { name: "Gas Station", amount: 40, type: "expense", date: "2026-10-17", category: "Transportation"},
    { name: "Netflix", amount: 15.99, type: "expense", date: "2026-10-11", category: "Subscription"},
    { name: "Refund", amount: 25, type: "income", date: "2026-11-06", category: "Other"},
    { name: "Paycheck", amount: 1200, type: "income", date: "2026-11-01", category: "Other" },
    { name: "Electric Bill", amount: 95.50, type: "expense", date: "2026-11-04", category: "Subscription" },
    { name: "Savings Transfer", amount: 200, type: "saving", date: "2026-11-05", category: "" },
    { name: "Restaurant", amount: 32.75, type: "expense", date: "2026-11-07", category: "Other" },
    { name: "Freelance Work", amount: 350, type: "income", date: "2026-11-09", category: "Other" }
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

    let totalSavings = transactions
    .filter(transaction => transaction.type === "saving")
    .reduce((total, transaction) => total + transaction.amount, 0);

    let monthlySavings = monthlyTransactions
    .filter(transaction => transaction.type === "saving")
    .reduce((total, transaction) => total + transaction.amount, 0);

    let savingsElement = document.getElementById("savings-num");

    savingsElement.textContent = totalSavings.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    displayChange(incomeChangeElement, incomeChange);

    displayChange(expenseChangeElement, expenseChange, true);

    displayChange(balanceChangeElement, balanceChange);

    savingsChangeElement.textContent = `${monthlySavings.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })} added this month`;
    
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

//Expenses Pie chart

let recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

let tableBody = document.querySelector("tbody");

tableBody.innerHTML = "";

recentTransactions.forEach(transaction => {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let typeCell = document.createElement("td");
    let dateCell = document.createElement("td");
    let categoryCell = document.createElement("td");

    nameCell.textContent = transaction.name;
    dateCell.textContent = transaction.date;
    categoryCell.textContent = transaction.category;

    amountCell.textContent = transaction.amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    if (transaction.type === "income") {
        typeCell.classList.add("income-type");
    } else if (transaction.type === "expense") {
        typeCell.classList.add("expense-type");
    } else if (transaction.type === "saving") {
        typeCell.classList.add("saving-type");
    }
        typeCell.textContent = transaction.type;

    row.appendChild(nameCell);
    row.appendChild(categoryCell); 
    row.appendChild(dateCell);
    row.appendChild(typeCell);
    row.appendChild(amountCell);
    
    tableBody.appendChild(row);
});

let expenses = transactions.filter(transaction => {
    return transaction.type === "expense";
});

let groceryTotal = expenses
    .filter(transaction => transaction.category === "Groceries")
    .reduce((total, transaction) => total + transaction.amount, 0);

let transportationTotal = expenses
    .filter(transaction => transaction.category === "Transportation")
    .reduce((total, transaction) => total + transaction.amount, 0);

let subscriptionTotal = expenses
    .filter(transaction => transaction.category === "Subscription")
    .reduce((total, transaction) => total + transaction.amount, 0);

let otherTotal = expenses
    .filter(transaction => transaction.category === "Other")
    .reduce((total, transaction) => total + transaction.amount, 0);

let totalExpenses = calculateExpenses();

let spendingDisplay = document.querySelector("#total-spending");

if (totalExpenses >= 1000) {
    spendingDisplay.textContent = `$${(totalExpenses / 1000).toFixed(1)}K`;
} else {
    spendingDisplay.textContent = totalExpenses.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});
}

let groceryPercentage;
let transportationPercentage;
let subscriptionPercentage;
let otherPercentage;

if (totalExpenses === 0) {
    groceryPercentage = 0;
    transportationPercentage = 0;
    subscriptionPercentage = 0;
    otherPercentage = 0;
} else {
    groceryPercentage = (groceryTotal / totalExpenses) * 100;
    transportationPercentage = (transportationTotal / totalExpenses) * 100;
    subscriptionPercentage = (subscriptionTotal / totalExpenses) * 100;
    otherPercentage = (otherTotal / totalExpenses) * 100;
}

let groceryLength = (groceryPercentage / 100) * 439.82;
let transportationLength = (transportationPercentage / 100) * 439.82;
let subscriptionLength = (subscriptionPercentage / 100) * 439.82;
let otherLength = (otherPercentage / 100) * 439.82;

let groceryOffset = 0;
let transportationOffset = -groceryLength;
let otherOffset = -(groceryLength + transportationLength);
let subscriptionOffset = -(groceryLength + transportationLength + otherLength);

let groceryCircle = document.querySelector("#grocery-circle");
let transportationCircle = document.querySelector("#transportation-circle");
let otherCircle = document.querySelector("#other-circle");
let subscriptionCircle = document.querySelector("#subscription-circle");

let gap = 6;

groceryCircle.setAttribute("stroke-dasharray", `${Math.max(0, groceryLength - gap)} 439.82`);

transportationCircle.setAttribute("stroke-dasharray", `${Math.max(0, transportationLength - gap)} 439.82`);
transportationCircle.setAttribute("stroke-dashoffset", transportationOffset);

otherCircle.setAttribute("stroke-dasharray", `${Math.max(0, otherLength - gap)} 439.82`);
otherCircle.setAttribute("stroke-dashoffset", otherOffset);

subscriptionCircle.setAttribute("stroke-dasharray", `${Math.max(0, subscriptionLength - gap)} 439.82`);
subscriptionCircle.setAttribute("stroke-dashoffset", subscriptionOffset);

// Monthly Income vs. Expenses Chart

let months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

let monthlyData = [];

let currentYear = new Date().getFullYear();

months.forEach((month, index) => {

    let monthNumber = String(index + 1).padStart(2, "0");

    let monthString = `${currentYear}-${monthNumber}`;

    let monthlyTransactions = transactions.filter(transaction => {
        return transaction.date.slice(0, 7) === monthString;
    });

    let monthlyIncome = monthlyTransactions.filter(transaction => transaction.type === "income");

    let monthlyExpenses = monthlyTransactions.filter(transaction => transaction.type === "expense");

    let totalMonthlyIncome = monthlyIncome.reduce((total, transaction) => total + transaction.amount, 0);

    let totalMonthlyExpenses = monthlyExpenses.reduce((total, transaction) => total + transaction.amount, 0);

    monthlyData.push({
        month: month,
        income: totalMonthlyIncome,
        expenses: totalMonthlyExpenses
    });

});

let monthlyChart = document.querySelector("#monthly-chart svg");

let highestIncome = Math.max(...monthlyData.map(data => data.income));
let highestExpense = Math.max(...monthlyData.map(data => data.expenses));

let highestAmount = Math.max(highestIncome, highestExpense);

let increment;

if (highestAmount < 1000) {
    increment = 100
} else if ( highestAmount >= 1000 && highestAmount < 5000) {
    increment = 500
} else {
    increment = 1000
}

let chartMax = Math.ceil(highestAmount / increment) * increment;

let scale = 180 / chartMax;
let interval = chartMax / 4;

let yLabels = document.querySelectorAll(".y-label");

yLabels.forEach((label, index) => {
    let labelValue = chartMax - (interval * index);

    label.textContent = labelValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});
});

monthlyData.forEach((data, index) => {
    let incomeHeight = data.income * scale;
    let incomeY = 220 - incomeHeight;
    let incomeX = 70 + (index * 45.45);

    let expenseHeight = data.expenses * scale;
    let expenseY = 220 - expenseHeight;
    let expenseX = incomeX + 15;

    let incomeBar = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    let expenseBar = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    incomeBar.setAttribute("height", incomeHeight);
    incomeBar.setAttribute("y", incomeY);
    incomeBar.setAttribute("x", incomeX);
    incomeBar.setAttribute("width", 12);
    incomeBar.setAttribute("fill", "#32CD32");

    expenseBar.setAttribute("height", expenseHeight);
    expenseBar.setAttribute("y", expenseY);
    expenseBar.setAttribute("x", expenseX);
    expenseBar.setAttribute("width", 12);
    expenseBar.setAttribute("fill", "red");

    monthlyChart.appendChild(incomeBar);
    monthlyChart.appendChild(expenseBar);
});