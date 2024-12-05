document.getElementById("dashboard").style.display = "block";
document.getElementById("crops").style.display = "none";
document.getElementById("fields").style.display = "none";
document.getElementById("staff").style.display = "none";
document.getElementById("vehicles").style.display = "none";
document.getElementById("equipment").style.display = "none";
document.getElementById("logs").style.display = "none";

document.getElementById("profile").style.display = "none";

document.getElementById("dashboard-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "block";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Dashboard-Side.png')";

});

document.getElementById("crops-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "block";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Crop-img.png')";

});

document.getElementById("fields-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "block";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Field-img.png')";

});

document.getElementById("staff-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "block";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Staff-img.png')";

});

document.getElementById("vehicles-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "block";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Vehicle-img.png')";

});

document.getElementById("equipment-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "block";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Equipment-img.png')";

});

document.getElementById("logs-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "block";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Logs-img.png')";

});

const menuItems = document.querySelectorAll(".sidebar nav ul li");

document.getElementById("dashboard-btn").classList.add("active");

menuItems.forEach(item => {
    item.addEventListener("click", function() {
        menuItems.forEach(el => el.classList.remove("active"));
        this.classList.add("active");
    });
});

$(document).ready(function() {
    const datetimeInput = document.getElementById('datetimeInput');

        function updateDateTime() {
        const now = new Date();

        const formattedDateTime = now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, '0') + "-" +
            String(now.getDate()).padStart(2, '0') + "T" +
            String(now.getHours()).padStart(2, '0') + ":" +
            String(now.getMinutes()).padStart(2, '0');

        datetimeInput.value = formattedDateTime;
    }

    setInterval(updateDateTime, 1000);

    updateDateTime();
    fetchVehicleD();
    fetchUser(localStorage.getItem("email"))
});

let userName = document.getElementById("userNameD")

async function fetchUser(email) {
    try {
        let response = await fetch(`http://localhost:8080/greenShadow/api/v1/user/getUsers/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            let user = await response.json();

            userName.innerHTML = user.name;
        } else {
            console.error("Failed to fetch user data:", response.status);
        }
    } catch (error) {
        console.error("Error while fetching user data:", error);
    }
}

function getProfile(){
    document.getElementById("profile").style.display = "block";

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/ProfileSide.png')";
}

document.addEventListener("DOMContentLoaded", function () {

    function fetchFields() {
        if (token) {
            $.ajax({
                url: "http://localhost:8080/greenShadow/api/v1/field",
                type: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    console.log('Response:', res);
                    
                    // Filter out fields with the name "Store Field"
                    const filteredFields = res.filter(field => field.field_name !== "Store");
                    
                    generateBarChart(filteredFields);
                },
                error: function (err) {
                    console.error('Failed to fetch field data:', err);
                }
            });
        }
    }

    function generateBarChart(fields) {
        const fieldNames = fields.map(field => field.field_name);
        const extentSizes = fields.map(field => field.extent_size);

        const ctx = document.getElementById('fieldExtentChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: fieldNames,
                datasets: [{
                    label: 'Extent Size (acres)',
                    data: extentSizes,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Field Extent Sizes'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    fetchFields();
});



function fetchVehicleD() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/vehicle",
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.log('Response:', res);
            displayAvailableVehicles(res);
        },
        error: function(err) {
            console.error('Failed to fetch vehicle data:', err);
        }
    });
}

function displayAvailableVehicles(vehicleData) {
    // Clear existing vehicle list
    const vehicleList = $('#vehicleList');
    vehicleList.empty();

    // Loop through the data and display only available vehicles
    vehicleData.forEach(vehicle => {
        if (vehicle.status === 'available') { // Assuming 'status' indicates availability
            const listItem = `
                <li>
                    <strong>ID:</strong> ${vehicle.id} 
                    <br><strong>Type:</strong> ${vehicle.category}
                </li>`;
            vehicleList.append(listItem);
        }
    });
}
