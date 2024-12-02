$(document).ready(function() {
    $('#equipment_staff').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#equipment_ids').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#equipment_type').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#equipment_staff_btn').on('click', function () {
        $('#assignStaffEquipmentPopup').css('display', 'flex');

        populateEquipmentIdDropdown();

        populateEquipmentStaffDropdown();
    });

    $('#assignStaffCancel').on('click', function () {
        $('#assignStaffEquipmentPopup').css('display', 'none');
    });
});

const equipmentForm = document.getElementById("equipment_form");
const equipmentTableBody = document.getElementById("equipment_table").querySelector('tbody');

document.getElementById("equipment_update").style.display = "none"

function validateEquipmentForm(){
    let equipment_name = document.getElementById("equipment_name").value;
    let equipment_type = document.getElementById("equipment_type").value;

    if(equipment_name == ""){
        $("#eqNameError").text("Please enter equipment name");
        $("#equipment_name").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#equipment_name").val()))){        
        $("#eqNameError").text("Please enter valid name");
        $("#equipment_name").css("border-color",  "red");
        return false;
    }else{
        $("#eqNameError").text("");
        $("#equipment_name").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(equipment_type == ""){
        $("#eqTypeError").text("Please enter equipment type");
        $("#equipment_type").css("border-color",  "red");
        return false;
    }else{
        $("#eqTypeError").text("");
        $("#equipment_type").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    return true;
}

function fetchEquipment() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/equipment",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res);
            buildEquipmentTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch equipment data:', err);
        }
    });
}

function fetchNextEquipmentId() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/equipment/next-id",
        type: "GET",
        success: function(res) {
            console.log('Next equipment ID:', res);
            document.getElementById("equipment_id").value = res; 
            document.getElementById("equipment_id").readOnly = true; 
        },
        error: function(err) {
            console.error('Failed to fetch next equipment ID:', err);
        }
    });
}

$(document).ready(function() {
    fetchNextEquipmentId();
    fetchEquipment(); 
    populateEquipmentType();
});

equipmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateEquipmentForm()) {
        let equipment_id = document.getElementById("equipment_id").value;
        let equipment_name = document.getElementById("equipment_name").value;
        let equipment_type = document.getElementById("equipment_type").value;

        const equipmentData = {
            equipment_id:equipment_id,
            name:equipment_name,
            type:equipment_type,
            status:"AVAILABLE",
            staff_id:"S001",
            field_code:"F000"
        }
        
        const equipmentJson = JSON.stringify(equipmentData);

        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/equipment",
            type: "POST",
            data: equipmentJson,
            headers: {"Content-Type": "application/json"},
            success:(res) => {
                console.log(JSON.stringify(res));
                fetchEquipment();
                fetchNextEquipmentId();
            },
            Error: (res) => {
                console.error(res);
            }
        });

        equipmentForm.reset();
        $('#equipment_type').val('').trigger('change'); 
    }
});

function buildEquipmentTable(allEquipment){
    if (!Array.isArray(allEquipment)) {
        console.error('Expected an array but got:', allEquipment);
        return;
    }

    equipmentTableBody.innerHTML = '';
    allEquipment.forEach(function (element) {

        const isAvailable = element.status === "AVAILABLE";
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.equipment_id}</td>
            <td>${element.name}</td>
            <td>${element.type}</td>
            <td>${element.status}</td>
            <td>${element.staff_id}</td>
            <td>${element.field_code}</td>
            <td class = "actionBtn">
                <button onclick="deleteEquipmentData('${element.equipment_id}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateEquipmentForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button 
                    onclick='markEquipmentAsAvailable("${element.equipment_id}")' 
                    class="btn btn-success" 
                    style="display: ${isAvailable ? 'none' : 'block'};  font-size: 12px;">
                    Mark as Available
                </button>
            </td>
        `;
        equipmentTableBody.appendChild(row);
    });

};

function deleteEquipmentData(id) {
    if (confirm("Are you sure you want to delete this equipment?")) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/equipment/${id}`,
            type: "DELETE",
            success: function(res) {
                console.log('Delete Response:', res);
                fetchEquipment();
                fetchNextEquipmentId();
            },
            error: function(err) {
                console.error('Failed to delete equipment:', err);
            }
        });
    } else {
        console.log('Delete action canceled');
    }
}

let assignedEqStaffId = ""
let assignedField = ""
let availabilityEq= ""

function populateEquipmentForm(equipment) {
    document.getElementById("equipment_id").value = equipment.equipment_id;
    document.getElementById("equipment_name").value = equipment.name;
    
    $('#equipment_type').val(equipment.type).trigger('change');

    assignedEqStaffId = equipment.staff_id;
    assignedField = equipment.field_code;
    availabilityEq = equipment.status;

    document.getElementById("equipment_update").style.display = "block"
    document.getElementById("equipment_add").style.display = "none"
}

document.querySelector('#equipment_update').onclick = function() {
    let equipment_id = document.getElementById("equipment_id").value;
    let equipment_name = document.getElementById("equipment_name").value;
    let equipment_type = document.getElementById("equipment_type").value;

    const equipmentData = {
            equipment_id:equipment_id,
            name:equipment_name,
            type:equipment_type,
            status:availabilityEq,
            staff_id:assignedEqStaffId,
            field_code:assignedField
        }
        
        const equipmentJson = JSON.stringify(equipmentData);

    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/equipment/${equipmentData.equipment_id}`, 
        type: "PATCH",
        data: equipmentJson,
        headers: {"Content-Type": "application/json"},
        success: function(res, status, xhr) {
            if (xhr.status === 204) { 
                console.log('Update equipment successfully');
                fetchEquipment(); 
                fetchNextEquipmentId();
            } else {
                console.error('Failed to update equipment:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update equipment:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText); 
            }
        }
    });

    document.getElementById("equipment_update").style.display = "none";
    document.getElementById("equipment_add").style.display = "block";
    equipmentForm.reset(); 
};

// function populateEquipmentStaffDropdown() {
//     $.ajax({
//         url: "http://localhost:8080/greenShadow/api/v1/staff", 
//         type: "GET",
//         headers: { "Content-Type": "application/json" },
//         success: function(res) {
//             const staffDropdown = $("#equipment_staff");
//             staffDropdown.empty(); 
//             staffDropdown.append('<option value="" disabled selected>Select a field</option>');

//             res.forEach(staff => {
//                 const option = `<option value="${staff.id}">${staff.id}</option>`;
//                 staffDropdown.append(option);
//             });

//             console.log('Staff options:', res);


//             staffDropdown.trigger('change');
//         },
//         error: function(err) {
//             console.error('Failed to fetch staff:', err);
//         }
//     });
// }

function populateEquipmentStaffDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff", 
        type: "GET",
        headers: { "Content-Type": "application/json" },
        success: function(res) {
            const staffDropdown = $("#equipment_staff");
            staffDropdown.empty(); 
            staffDropdown.append('<option value="" disabled selected>Select a staff member</option>');

            res.forEach(staff => {
                const option = `<option value="${staff.id}" data-field-id="${staff.staff_field?.[0]?.field?.field_code || ''}">
                                    ${staff.id} - ${staff.first_name} ${staff.last_name}
                                </option>`;
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

$(document).ready(function () {
    $("#equipment_staff").on("change", function () {
        const selectedOption = $(this).find(":selected");
        const fieldId = selectedOption.data("field-id"); // Get the field ID from the selected option
        const fieldInput = $("#equipment_field");

        if (fieldId) {
            fieldInput.val(fieldId);
            $("#equipmentFieldNote").text(""); // Clear any previous notes
        } else {
            fieldInput.val(""); // Clear the field input if no field ID is found
            $("#equipmentFieldNote").text("No field assigned to this staff member.");
        }
    });
});

function populateEquipmentType() {
    const typeSelect = document.getElementById('equipment_type');

    const defaultOption = typeSelect.querySelector('option[value=""]');
    typeSelect.innerHTML = ''; 
    if (defaultOption) {
        typeSelect.appendChild(defaultOption); 
    }

    const types = ["ELECTRICAL", "MECHANICAL"];

    types.forEach(type => {
        const existingOption = Array.from(typeSelect.options).find(option => option.value === type);
        if (!existingOption) {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        }
    });
}

function populateEquipmentIdDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/equipment",
        type: "GET",
        headers: { "Content-Type": "application/json" },
        success: function (res) {
            const equipmentDropdown = $("#equipment_ids");
            equipmentDropdown.empty();
            equipmentDropdown.append('<option value="" disabled selected>Select the Equipment ID</option>');

            const availableEquip = res.filter(equipment => equipment.status === "AVAILABLE");

            availableEquip.forEach(equipment => {
                const option = `<option value="${equipment.equipment_id}">${equipment.equipment_id}</option>`;
                equipmentDropdown.append(option);
            });

            equipmentDropdown.trigger('change');
        },
        error: function (err) {
            console.error('Failed to fetch equipment IDs:', err);
        },
    });
}

$("#equipment_search").keydown(function (e) {
    if (e.keyCode == 13) {  
        let id = document.getElementById("equipment_search").value;

        if (id) {
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/equipment/${id}`,
                type: "GET",
                headers: { "Content-Type": "application/json" },
                success: function(equipment) {
                    if (equipment && equipment.equipment_id) { 
                        populateEquipmentForm(equipment);
                    } else {
                        console.warn("Equipment not found.");
                        alert("Equipment ID not found!"); 
                        equipmentForm.reset();  
                        fetchEquipment(); 
                        fetchNextEquipmentId() 
                    }
                },
                error: function(err) {
                    console.error('Error fetching Equipment:', err);
                    alert("Invalid Equipment ID! Please enter a valid ID."); 
                    equipmentForm.reset();  
                    fetchNextEquipmentId();  
                }
            });
        } else {
            alert("Search equipment cannot be empty!");
            equipmentForm.reset(); 
            fetchNextEquipmentId();  
        }
    }
});

document.getElementById("assignStaffCancel").addEventListener("click", function () {
    document.getElementById("assignStaffEquipmentPopup").style.display = "none";
});

document.getElementById("assignStaffConfirm").addEventListener("click", function () {
    const selectedStaff = document.getElementById("equipment_staff").value;
    const selectedEquipment = document.getElementById("equipment_ids").value;

    if (selectedStaff && selectedEquipment) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/equipment/${selectedEquipment}`,
            type: "GET",
            headers: { "Content-Type": "application/json" },
            success: function (equipment) {
                const equipmentData = {
                    ...equipment, 
                    id: selectedStaff, 
                    status: "NOT_AVAILABLE" 
                };

                const equipmentJson = JSON.stringify(equipmentData);

                $.ajax({
                    url: `http://localhost:8080/greenShadow/api/v1/equipment/${selectedEquipment}`,
                    type: "PATCH",
                    data: equipmentJson,
                    headers: { "Content-Type": "application/json" },
                    success: function (res, status, xhr) {
                        if (xhr.status === 204) {
                            console.log("Equipment updated successfully");
                            fetchEquipment(); 
                        } else {
                            console.error("Failed to update equipment:", res);
                        }
                    },
                    error: function (err) {
                        console.error("Failed to update equipment:", err);
                        if (err.responseText) {
                            console.log("Error details:", err.responseText);
                        }
                    },
                });

                document.getElementById("assignStaffEquipmentPopup").style.display = "none"; 
            },
            error: function (err) {
                console.error("Failed to fetch equipment data:", err);
                if (err.responseText) {
                    console.log("Error details:", err.responseText);
                }
            }
        });
    } else {
        alert("Please select both a equipment and a staff member.");
    }
});


function markEquipmentAsAvailable(equipment_id) {
    if (confirm("Are you sure you want to mark available this equipment?")) {
 
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/equipment/${equipment_id}`,
            type: "GET",
            headers: { "Content-Type": "application/json" },
            success: function (equipment) {
                const equipmentData = {
                    ...equipment, 
                    id: null, 
                    status: "AVAILABLE" 
                };

                const equipmentJson = JSON.stringify(equipmentData);

                $.ajax({
                    url: `http://localhost:8080/greenShadow/api/v1/equipment/${equipment_id}`,
                    type: "PATCH",
                    data: JSON.stringify(equipmentData), 
                    headers: { "Content-Type": "application/json" },
                    success: function (res, status, xhr) {
                        if (xhr.status === 204) {
                            console.log('Equipment marked as available successfully');
                            fetchEquipment(); 
                        } else {
                            console.error('Failed to update equipment status:', res);
                        }
                    },
                    error: function (err) {
                        console.error('Failed to update equipment status:', err);
                    }
                });

            },
            error: function (err) {
                console.error("Failed to fetch equipment data:", err);
                if (err.responseText) {
                    console.log("Error details:", err.responseText);
                }
            }
        });    
    }else {
        console.log('Mark available action canceled');
    }
}