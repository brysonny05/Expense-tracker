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

let totalIncome = income.reduce ((total, transaction) => {
    return total + transaction.amount}, 0
);