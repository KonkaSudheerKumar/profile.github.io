
const employees = [
    {
        id: 1, 
        name: "John Doe",
        profession: "Electrician",
        rating: 4.5,
        contactNumber: "123-456-7890",
        shopDetails: {
            name: "Doe's Electric",
            address: "123 Main St",
        },
        imageUrl: "images/john-doe.jpg",
    },
    {
        id: 2,
        name: "Jane Smith",
        profession: "Low-Voltage Technician",
        rating: 4.8,
        contactNumber: "456-789-0123",
        shopDetails: {
            name: "Smith's Electrical Services",
            address: "456 Elm St",
        },
        imageUrl: "images/jane-smith.jpg",
    },
    {
        id: 3,
        name: "Bob Johnson",
        profession: "Lighting Installer",
        rating: 4.2,
        contactNumber: "789-012-3456",
        shopDetails: {
            name: "Johnson Electricians",
            address: "789 Oak Ave",
        },
        imageUrl: "images/bob-johnson.jpg",
    },
    {
        id: 4,
        name: "Emily Clark",
        profession: "Electrician",
        rating: 4.9,
        contactNumber: "012-345-6789",
        shopDetails: {
            name: "Clark's Electrical Solutions",
            address: "101 Pine Blvd",
        },
        imageUrl: "images/emily-clark.jpg",
    },
    {
        id: 5,
        name: "David Miller",
        profession: "Appliance Repair Technician",
        rating: 4.0,
        contactNumber: "345-678-9012",
        shopDetails: {
            name: "Miller's Electric",
            address: "202 Birch St",
        },
        imageUrl: "images/david-miller.jpg",
    },
    {
        id: 6,
        name: "Maria Rodriguez",
        profession: "Electrician",
        rating: 4.7,
        contactNumber: "678-901-2345",
        shopDetails: {
            name: "Rodriguez Electric",
            address: "303 Maple Dr",
        },
        imageUrl: "images/maria-rodriguez.jpg",
    },
    
 
];


function createProfileElement(employee) {
    const profileElement = document.createElement("div");
    profileElement.classList.add("employee-profile");

    const image = document.createElement("img");
    image.src = employee.imageUrl;
    profileElement.appendChild(image);

    const details = document.createElement("div");
    details.innerHTML = `
        <h2>${employee.name}</h2>
        <p>${employee.profession}</p>
        <p>Rating: ${employee.rating}</p>
        <p>Contact: ${employee.contactNumber}</p>
        <p>Shop: ${employee.shopDetails.name} - ${employee.shopDetails.address}</p>
        <a href="emp.html?id=${employee.id}">View full profile</a>
    `;
    profileElement.appendChild(details);

    return profileElement;
}


function displayProfiles(filteredEmployees) {
    const employeeProfiles = document.querySelector(".employee-profiles");
    employeeProfiles.innerHTML = ""; 
    filteredEmployees.forEach(employee => {
        const profileElement = createProfileElement(employee);
        employeeProfiles.appendChild(profileElement);
    });
}


displayProfiles(employees);


const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredEmployees = employees.filter(employee => employee.profession.toLowerCase().includes(searchTerm));
    displayProfiles(filteredEmployees);
});
