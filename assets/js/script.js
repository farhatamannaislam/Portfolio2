const selectService = document.querySelector("#selector"); // ✅ Correct ID
const serviceList = document.getElementById("serviceList");
let services = JSON.parse(localStorage.getItem("services")) || []; // ✅ Ensure it's an array

// ✅ Function to Add Service
function addService() {
    let price = parseFloat(selectService.value);
    if (isNaN(price)) {
        console.error("❌ ERROR: Invalid service price selected.");
        return;
    }

    services.push(price); // ✅ Push price to array
    localStorage.setItem("services", JSON.stringify(services)); // ✅ Save to localStorage

    let serviceItem = document.createElement("p");
    serviceItem.textContent = `Service - ${price.toFixed(2)} Euro`;
    serviceList.appendChild(serviceItem);

    updateTotals(); // ✅ Update total
}

// ✅ Function to Update Totals
function updateTotals() {
    let totalPrice = services.reduce((sum, price) => sum + price, 0);
    let totalDiscount = totalPrice >= 100 ? totalPrice * 0.9 : totalPrice;

    document.querySelector('.totalPrice').textContent = totalPrice.toFixed(2);
    document.querySelector('.totalDiscount').textContent = totalDiscount.toFixed(2);
}

const clearButton = document.querySelector(".BtnRefresh"); // Ensure correct class

if (clearButton) {
    clearButton.addEventListener("click", clearAllServices);
}

// ✅ Function to Clear All Services
function clearAllServices() {
    localStorage.removeItem("services"); // ✅ Remove stored services
    services = []; // ✅ Reset array in memory
    document.getElementById("serviceList").innerHTML = ""; // ✅ Clear UI
    updateTotals(); // ✅ Update total prices
}


/* --------------------- APPOINTMENT FUNCTIONALITY (index.html) --------------------- */

// ✅ Setup appointment buttons
function setupAppointmentButtons() {
    const appointmentBtn = document.querySelector(".BtnAppointment");
    if (appointmentBtn) appointmentBtn.addEventListener("click", openAppointmentForm);
}

// ✅ Open the appointment modal
function openAppointmentForm() {
    const modal = document.getElementById("appointmentModal");
    if (modal) modal.style.display = "block";
}

// ✅ Close the appointment modal
function closeAppointmentForm() {
    const modal = document.getElementById("appointmentModal");
    if (modal) modal.style.display = "none";
}

// ✅ Confirm & Save Appointment
function confirmAppointment() {
    let name = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let description = document.getElementById("appointmentDescription").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("appointmentTime").value;

    if (!name || !email || !description || !date || !time) {
        alert("❌ Please fill out all fields!");
        return;
    }

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push({ name, email, description, date, time });
    localStorage.setItem("appointments", JSON.stringify(appointments));

    closeAppointmentForm();
    renderAppointments();
}

// ✅ Render Appointments
function renderAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let appointmentList = document.getElementById("appointmentList");

    if (!appointmentList) {
        console.error("❌ ERROR: appointmentList not found in the DOM!");
        return;
    }

    appointmentList.innerHTML = ""; // Clear list

    appointments.forEach((appointment, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>👤 ${appointment.name}</strong> | 📧 ${appointment.email}<br>
            📅 ${appointment.date} - ⏰ ${appointment.time}<br>
            💬 ${appointment.description}<br>
            <button class="deleteBtn" onclick="deleteAppointment(${index})">❌ Remove</button>
        `;
        appointmentList.appendChild(listItem);
    });
}


// ✅ Delete an appointment
function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    renderAppointments();
}
