const appointmentsToday = [
    { name: "John Doe", contact: "123-456-7890" },
    { name: "Jane Smith", contact: "987-654-3210" }
];

const availableSlots = [
    { date: "2023-12-28", slots: ["10:00 AM", "11:00 AM", "12:00 PM"] },
    // ... more dates and slots
];

let bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];

const employeeButton = document.getElementById("employee-button");
const customerButton = document.getElementById("customer-button");
const employeePage = document.getElementById("employee-page");
const customerPage = document.getElementById("customer-page");

employeeButton.addEventListener("click", () => {
    employeePage.style.display = "block";
    customerPage.style.display = "none";

    displayAppointmentsToday();
});

customerButton.addEventListener("click", () => {
    employeePage.style.display = "none";
    customerPage.style.display = "block";

    displayAvailableSlots();
    displayBookedAppointments();
});

function displayAppointmentsToday() {
    employeePage.innerHTML = `
        <h2>Today's Appointments</h2>
        <ul>
            ${appointmentsToday.map(appointment => `
                <li>${appointment.name} - ${appointment.contact}</li>
            `).join("")}
        </ul>
        <h2>Booked Appointments</h2>
        <ul>
            ${bookedAppointments.map(appointment => `
                <li>${appointment.date} - ${appointment.slot} - ${appointment.name} - ${appointment.contact}</li>
            `).join("")}
        </ul>
    `;
}

function displayAvailableSlots() {
    customerPage.innerHTML = `
        <h2>Book an Appointment</h2>
        <form id="booking-form">
            ${availableSlots.map(slot => `
                <fieldset>
                    <legend>${slot.date}</legend>
                    ${slot.slots.map(slotTime => `
                        <label><input type="checkbox" name="slot" value="${slot.date}-${slotTime}"> ${slotTime}</label><br>
                    `).join("")}
                </fieldset>
            `).join("")}
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="contact">Contact:</label><br>
            <input type="text" id="contact" name="contact"><br>
            <button type="submit">Book Appointment</button>
        </form>
        <div id="confirmation-message"></div>
    `;

    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("submit", handleBookingSubmission);
}

function handleBookingSubmission(event) {
    event.preventDefault(); // Prevent form submission
    const selectedSlots = Array.from(document.querySelectorAll('input[name="slot"]:checked'));
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    

    if (selectedSlots.length > 0 && name && contact) {
        selectedSlots.forEach(slot => {
            const [date, slotTime] = slot.value.split("-");
            submitBooking(date, slotTime, name, contact);
        });
    } else {
        alert("Please select at least one slot and fill in all details.");
    }
}

function submitBooking(date, slot, name, contact) {
    bookedAppointments.push({ date, slot, name, contact });
    localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));
    displayBookedAppointments(); // Update the booked appointments in the customer page
}

function displayBookedAppointments() {
    const confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.innerHTML = `
        <h2>Booked Appointments</h2>
        <ul>
            ${bookedAppointments.map(appointment => `
                <li>${appointment.date} - ${appointment.slot} - ${appointment.name} - ${appointment.contact}</li>
            `).join("")}
        </ul>
    `;
}
