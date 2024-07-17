const selectService = document.querySelector("#selector");
date = document.querySelector(".date");
daysofmonth = document.querySelector(".daysofmonth ");
daysofweek = document.querySelector(".daysofweek");
nextmonth = document.querySelector(".nextmonth");
previousmonth = document.querySelector(".previousmonth");
const serviceList = document.getElementById("serviceList");
let services = [];

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

/* Function to add service*/
function addService() {
    let price = parseFloat(selector.value);
    services.push(price);
    
    let serviceItem = document.createElement('p');
    serviceItem.textContent = `Service - ${price.toFixed(2)} Euro`;
    serviceList.appendChild(serviceItem);
    
    updateTotals();
}

/*Function to update total*/
function updateTotals() {
    let totalPrice = services.reduce((sum, price) => sum + price, 0);
    let totalDiscount = totalPrice >= 100 ? totalPrice * 0.9 : totalPrice;
    
    document.querySelector('.totalPrice').textContent = totalPrice.toFixed(2);
    document.querySelector('.totalDiscount').textContent = totalDiscount.toFixed(2);
}

const monthsofYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

/*Get current months days,previous month days and next month days*/
function addCalendar() {
    const dateFirst = new Date(year, month, 1);
    const dateLast = new Date(year, month + 1, 0);
    const previousLastDate = new Date(year, month, 0);
    const prevDay = previousLastDate.getDate();
    const lastDay = dateLast.getDate();
    const firstDay = dateFirst.getDay();
    const nextDay = 7 - dateLast.getDay() - 1;

    date.innerHTML = monthsofYear[month] + " " + year;

    let dayHTML = "";

    // Days of Previous Month
    for (let i = firstDay; i > 0; i--) {
        let prevDate = prevDay - i + 1;
        let currentDate = new Date(year, month - 1, prevDate);
        dayHTML += generateDayHTML(prevDate, currentDate.getDay() === 0);
    }

    // Days of Current Month
    for (let i = 1; i <= lastDay; i++) {
        let currentDate = new Date(year, month, i);
        dayHTML += generateDayHTML(i, currentDate.getDay() === 0);
    }

    // Days of Next Month
    for (let i = 1; i <= nextDay; i++) {
        let currentDate = new Date(year, month + 1, i);
        dayHTML += generateDayHTML(i, currentDate.getDay() === 0);
    }

    daysofmonth.innerHTML = dayHTML;
}

// Helper function to generate day elements
function generateDayHTML(day, isSunday) {
    return `<div class="day${isSunday ? ' red' : ''}">${day}</div>`;
}

//Show previousMonth
function previousMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    addCalendar();
}

//Show next Month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    addCalendar();
}

nextmonth.addEventListener("click", nextMonth);
previousmonth.addEventListener("click", previousMonth);

addCalendar();