console.log("Hello");
const selectService = document.querySelector('#selector');
const servicecalendar = document.querySelector('servicecalendar');
date = document.querySelector(".date");
previous = document.querySelector(".previous");
next = document.querySelector(".next");
daysofmonth = document.querySelector(".daysofmonth ");
nextmonth = document.querySelector(".nextmonth");


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

function getOption() {

    price = selectService.value;
    document.querySelector('.price').textContent = price;
}

function getDiscount() {

    discount = selectService.value;
    if (discount >= 100)
        document.querySelector('.discount').textContent = discount - discount * 0.1;

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
    let i;
    const dateFirst = new Date(year, month, 1);
    const dateLast = new Date(year, month + 1, 0);
    const previousLastDate = new Date(year, month, 0);
    const prevDay = previousLastDate.getDate();
    const lastDay = dateLast.getDate();
    const firstDay = dateFirst.getDay();
    const nextDay = 7 - dateLast.getDay() - 1;

    date.innerHTML = monthsofYear[month] + " " + year;

    let day = "";
    //Days of Previous Month
    for (i = firstDay; i > 0; i--) {
        day += `<div class="day">${prevDay - i + 1}</div>`;
    }

    //Days of Current Month
    for (i = 1; i <= lastDay; i++) {
        day += `<div class="day">${i}</div>`;
    }

    //Days of Next Month
    for (i = 1; i <= nextDay; i++) {
        day += `<div class="day">${i}</div>`;
    }


    daysofmonth.innerHTML = day;
}

addCalendar();


function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    addCalendar();
}

nextmonth.addEventListener("click", nextMonth);