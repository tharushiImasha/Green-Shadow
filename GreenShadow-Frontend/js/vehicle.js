$(document).ready(function() {
    $('#vehicle-staff').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#vehicle_ids').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#vehicle_staff').on('click', function () {
        $('#assignStaffPopup').css('display', 'flex');

        populateVehicleIdDropdown();

        populatevehicleStaffDropdown();
    });

    $('#assignCancel').on('click', function () {
        $('#assignStaffPopup').css('display', 'none');
    });
});

const vehicleForm = document.getElementById("vehicle_form");
const vehicleTableBody = document.getElementById("vehicle_table").querySelector('tbody');

document.getElementById("vehicle_update").style.display = "none"

function validateVehicleForm(){
    let license = document.getElementById("license").value;
    let vehicle_category = document.getElementById("vehicle_category").value;
    let fuel_type = document.getElementById("fuel_type").value;
    let vehicleStaff = document.getElementById("vehicle-staff").value;

    if(license == ""){
        $("#licenceError").text("Please enter vehicle license plate number");
        $("#license").css("border-color",  "red");
        return false;
    }else if (!(licenseRegex.test($("#license").val()))){        
        $("#licenceError").text("Please enter valid license plate number");
        $("#license").css("border-color",  "red");
        return false;
    }else{
        $("#licenceError").text("");
        $("#license").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(vehicle_category == ""){
        $("#vehiCategoryError").text("Please enter vehicle category");
        $("#vehicle_category").css("border-color",  "red");
        return false;
    }else if (!(fieldRegex.test($("#vehicle_category").val()))){
        $("#vehiCategoryError").text("Please enter valid vehicle category");
        $("#vehicle_category").css("border-color",  "red");
        return false;
    }else{
        $("#vehiCategoryError").text("");
        $("#vehicle_category").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(fuel_type == ""){
        $("#fuelError").text("Please enter vehicle fuel type");
        $("#fuel_type").css("border-color",  "red");
        return false;
    }else if (!(regexAddress.test($("#fuel_type").val()))){
        $("#fuelError").text("Please enter valid fuel type");
        $("#fuel_type").css("border-color",  "red");
        return false;
    }else{
        $("#fuelError").text("");
        $("#fuel_type").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(vehicleStaff == ""){
        $("#vehiStaffError").text("Please select staff member");
        $("#vehicle-staff").css("border-color",  "red");
        return false;
    }else{
        $("#vehiStaffError").text("");
        $("#vehicle-staff").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    return true
}

function fetchVehicle() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/vehicle",
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.log('Response:', res);
            buildVehicleTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch vehicle data:', err);
        }
    });
}

function fetchNextVehicleId() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/vehicle/next-id",
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        success: function(res) {
            console.log('Next vehicle ID:', res);
            document.getElementById("vehicle_id").value = res; 
            document.getElementById("vehicle_id").readOnly = true; 
        },
        error: function(err) {
            console.error('Failed to fetch next vehicle ID:', err);
        }
    });
}

$(document).ready(function() {
    fetchNextVehicleId();
    fetchVehicle(); 

    const datetimeInput = document.getElementById('datetimeInputVe');

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
});

vehicleForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateVehicleForm()) {
        let vehicle_id = document.getElementById("vehicle_id").value;
        let license = document.getElementById("license").value;
        let vehicle_category = document.getElementById("vehicle_category").value;
        let fuel_type = document.getElementById("fuel_type").value;
        let remark = document.getElementById("remark").value;

        const vehicleData = {
            vehicle_code:vehicle_id,
            license_plate_number:license,
            category:vehicle_category,
            fuel_type:fuel_type,
            status:"Available",
            remark:remark,
            id:null
        }
        
        const vehicleJson = JSON.stringify(vehicleData);

        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/vehicle",
            type: "POST",
            data: vehicleJson,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            success:(res) => {
                console.log(JSON.stringify(res));
                fetchVehicle();
                fetchNextVehicleId();
            },
            Error: (res) => {
                console.error(res);
            }
        });

        vehicleForm.reset();
    }
});

function buildVehicleTable(allVehicle){
    if (!Array.isArray(allVehicle)) {
        console.error('Expected an array but got:', allVehicle);
        return;
    }

    vehicleTableBody.innerHTML = '';
    allVehicle.forEach(function (element) {

        const isAvailable = element.status === "Available";
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.vehicle_code}</td>
            <td>${element.license_plate_number}</td>
            <td>${element.category}</td>
            <td>${element.fuel_type}</td>
            <td>${element.status}</td>
            <td>${element.remark}</td>
            <td>${element.id}</td>            
            <td class = "actionBtn">
                <button onclick="deleteVehicleData('${element.vehicle_code}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateVehicleForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button 
                    onclick='markVehicleAsAvailable("${element.vehicle_code}")' 
                    class="btn btn-success" 
                    style="display: ${isAvailable ? 'none' : 'block'}; font-size: 12px;">
                    Mark as Available
                </button>
            </td>
        `;
        vehicleTableBody.appendChild(row);
    });

}

function deleteVehicleData(id) {
    if (confirm("Are you sure you want to delete this vehicle?")) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/vehicle/${id}`,
            type: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(res) {
                console.log('Delete Response:', res);
                fetchVehicle();
                fetchNextVehicleId();
            },
            error: function(err) {
                console.error('Failed to delete vehicle:', err);
            }
        });
    } else {
        console.log('Delete action canceled');
    }
}

let assignedStaffId = ""
let availability = ""

function populateVehicleForm(vehicle) {
    document.getElementById("vehicle_id").value = vehicle.vehicle_code;
    document.getElementById("license").value = vehicle.license_plate_number;
    document.getElementById("vehicle_category").value = vehicle.category;
    document.getElementById("fuel_type").value = vehicle.fuel_type;
    document.getElementById("remark").value = vehicle.remark; 

    assignedStaffId = vehicle.id;
    availability = vehicle.status;

    document.getElementById("vehicle_update").style.display = "block"
    document.getElementById("vehicle_add").style.display = "none"
}

document.querySelector('#vehicle_update').onclick = function() {
    let vehicle_id = document.getElementById("vehicle_id").value;
    let license = document.getElementById("license").value;
    let vehicle_category = document.getElementById("vehicle_category").value;
    let fuel_type = document.getElementById("fuel_type").value;
    let remark = document.getElementById("remark").value;

    const vehicleData = {
            vehicle_code:vehicle_id,
            license_plate_number:license,
            category:vehicle_category,
            fuel_type:fuel_type,
            status:availability,
            remark:remark,
            id:assignedStaffId
        }
        
        const vehicleJson = JSON.stringify(vehicleData);

    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/vehicle/${vehicleData.vehicle_code}`, 
        type: "PATCH",
        data: vehicleJson,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res, status, xhr) {
            if (xhr.status === 204) { 
                console.log('Update vehicle successfully');
                fetchVehicle(); 
                fetchNextVehicleId();
            } else {
                console.error('Failed to update vehicle:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update vehicle:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText); 
            }
        }
    });

    document.getElementById("vehicle_update").style.display = "none";
    document.getElementById("vehicle_add").style.display = "block";
    vehicleForm.reset(); 
};

function populatevehicleStaffDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff", 
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res) {
            const staffDropdown = $("#vehicle-staff");
            staffDropdown.empty(); 
            staffDropdown.append('<option value="" disabled selected>Select a field</option>');

            res.forEach(staff => {
                const option = `<option value="${staff.id}">${staff.id} - ${staff.first_name} ${staff.last_name}</option>`;
                staffDropdown.append(option);
            });

            console.log('Staff options:', res);


            staffDropdown.trigger('change');
        },
        error: function(err) {
            console.error('Failed to fetch staff:', err);
        }
    });
}

function populateVehicleIdDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/vehicle",
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function (res) {
            const vehicleDropdown = $("#vehicle_ids");
            vehicleDropdown.empty();
            vehicleDropdown.append('<option value="" disabled selected>Select the vehicle ID</option>');

            const availableVehicles = res.filter(vehicle => vehicle.status === "Available");

            availableVehicles.forEach(vehicle => {
                const option = `<option value="${vehicle.vehicle_code}">${vehicle.vehicle_code}</option>`;
                vehicleDropdown.append(option);
            });

            vehicleDropdown.trigger('change');
        },
        error: function (err) {
            console.error('Failed to fetch vehicle IDs:', err);
        },
    });
}

$("#vehicle_search").keydown(function (e) {
    if (e.keyCode == 13) {  
        let id = document.getElementById("vehicle_search").value;

        if (id) {
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/vehicle/${id}`,
                type: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                success: function(vehicle) {
                    if (vehicle && vehicle.vehicle_code) { 
                        populateVehicleForm(vehicle);
                    } else {
                        console.warn("Vehicle not found.");
                        alert("Vehicle ID not found!"); 
                        vehicleForm.reset();  
                        fetchVehicle();  
                    }
                },
                error: function(err) {
                    console.error('Error fetching vehicle:', err);
                    alert("Invalid Vehicle ID! Please enter a valid ID."); 
                    vehicleForm.reset();  
                    fetchNextVehicleId();  
                }
            });
        } else {
            alert("Search vehicle cannot be empty!");
            vehicleForm.reset(); 
            fetchNextVehicleId();  
        }
    }
});

document.getElementById("assignCancel").addEventListener("click", function () {
    document.getElementById("assignStaffPopup").style.display = "none";
});

document.getElementById("assignConfirm").addEventListener("click", function () {
    const selectedStaff = document.getElementById("vehicle-staff").value;
    const selectedVehicle = document.getElementById("vehicle_ids").value;

    if (selectedStaff && selectedVehicle) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/vehicle/${selectedVehicle}`,
            type: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            success: function (vehicle) {
                const vehicleData = {
                    ...vehicle, 
                    id: selectedStaff, 
                    status: "Not Available" 
                };

                const vehicleJson = JSON.stringify(vehicleData);

                $.ajax({
                    url: `http://localhost:8080/greenShadow/api/v1/vehicle/${selectedVehicle}`,
                    type: "PATCH",
                    data: vehicleJson,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    success: function (res, status, xhr) {
                        if (xhr.status === 204) { // No Content
                            console.log("Vehicle updated successfully");
                            fetchVehicle(); // Refresh the table or UI
                        } else {
                            console.error("Failed to update vehicle:", res);
                        }
                    },
                    error: function (err) {
                        console.error("Failed to update vehicle:", err);
                        if (err.responseText) {
                            console.log("Error details:", err.responseText);
                        }
                    },
                });

                document.getElementById("assignStaffPopup").style.display = "none"; // Close popup
            },
            error: function (err) {
                console.error("Failed to fetch vehicle data:", err);
                if (err.responseText) {
                    console.log("Error details:", err.responseText);
                }
            }
        });
    } else {
        alert("Please select both a vehicle and a staff member.");
    }
});


function markVehicleAsAvailable(vehicleCode) {
    if (confirm("Are you sure you want to mark available this vehicle?")) {
 
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/vehicle/${vehicleCode}`,
            type: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            success: function (vehicle) {
                const vehicleData = {
                    ...vehicle, 
                    id: null, 
                    status: "Available" 
                };

                const vehicleJson = JSON.stringify(vehicleData);

                $.ajax({
                    url: `http://localhost:8080/greenShadow/api/v1/vehicle/${vehicleCode}`,
                    type: "PATCH",
                    data: JSON.stringify(vehicleData), 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    success: function (res, status, xhr) {
                        if (xhr.status === 204) {
                            console.log('Vehicle marked as available successfully');
                            fetchVehicle(); 
                        } else {
                            console.error('Failed to update vehicle status:', res);
                        }
                    },
                    error: function (err) {
                        console.error('Failed to update vehicle status:', err);
                    }
                });

            },
            error: function (err) {
                console.error("Failed to fetch vehicle data:", err);
                if (err.responseText) {
                    console.log("Error details:", err.responseText);
                }
            }
        });    
    }else {
        console.log('Mark available action canceled');
    }
}
