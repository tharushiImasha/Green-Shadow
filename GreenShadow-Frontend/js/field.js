function previewImage1(event) {
    const imagePreview1 = document.getElementById('imagePreviewF1');
    const file = event.target.files[0];
        
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview1.src = e.target.result;
            imagePreview1.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function previewImage2(event) {
    const imagePreview2 = document.getElementById('imagePreviewF2');
    const file = event.target.files[0];
        
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview2.src = e.target.result;
            imagePreview2.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function getFieldDate() {
    const logDateInput = document.getElementById("field_staff_date");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    logDateInput.value = formattedDate;
};

function getFieldViewDate() {
    const logDateInput = document.getElementById("field_view_date");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    logDateInput.value = formattedDate;
};

$(document).ready(function() {
    $('#field_ids').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#field_staff').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#field_staff_btn').on('click', function () {
        $('#assignStaffFieldPopup').css('display', 'flex');

        populateFieldIdDropdown();

        populateFieldStaffDropdown();

        getFieldDate();
    });

    $('#assignFieldSCancel').on('click', function () {
        $('#assignStaffFieldPopup').css('display', 'none');
    });

    $('#field_staff_view').on('click', function () {
        $('#viewStaffFieldPopup').css('display', 'flex');

        fetchStaffField();

        getFieldViewDate();
    });

    $('#viewieldSCancel').on('click', function () {
        $('#viewStaffFieldPopup').css('display', 'none');
    });
});

const fieldForm = document.getElementById("field_form");
const fieldTableBody = document.getElementById("field_table").querySelector('tbody');
const viewTableBody = document.getElementById("field_view_table").querySelector('tbody');

document.getElementById("field_update").style.display = "none"

function validateForm(){
    let fieldName = document.getElementById("field_name").value;
    let x_location = document.getElementById("x_coordinate").value;
    let y_location = document.getElementById("y_coordinate").value;
    let size = document.getElementById("size").value;

    if(fieldName == ""){
        $("#fieldNameError").text("Please enter field name");
        $("#field_name").css("border-color",  "red");
        return false;
    }else if (!(fieldRegex.test($("#field_name").val()))){
        $("#fieldNameError").text("Please enter valid name");
        $("#field_name").css("border-color",  "red");
        return false;
    }else{
        $("#fieldNameError").text("");
        $("#field_name").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(x_location == ""){
        $("#xLocationError").text("Please enter location");
        $("#x_coordinate").css("border-color",  "red");
        return false;
    }else if (!(locationRegex.test($("#x_coordinate").val()))){
        $("#xLocationError").text("Please enter valid location (Ex: 10/10.5)");
        $("#x_coordinate").css("border-color",  "red");
        return false;
    }else{
        $("#xLocationError").text("");
        $("#x_coordinate").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(y_location == ""){
        $("#yLocationError").text("Please enter location");
        $("#y_coordinate").css("border-color",  "red");
        return false;
    }else if (!(locationRegex.test($("#y_coordinate").val()))){
        $("#yLocationError").text("Please enter valid location (Ex: 10/10.5)");
        $("#y_coordinate").css("border-color",  "red");
        return false;
    }else{
        $("#yLocationError").text("");
        $("#y_coordinate").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(size == ""){
        $("#sizeError").text("Please enter size");
        $("#size").css("border-color",  "red");
        return false;
    }else if (!(sizeRegex.test($("#size").val()))){
        $("#sizeError").text("Please enter valid size");
        $("#size").css("border-color",  "red");
        return false;
    }else{
        $("#sizeError").text("");
        $("#size").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    return true;
}

function fetchFields() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res);
            buildFieldTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch field data:', err);
        }
    });
}

function fetchNextFieldId() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field/next-id",
        type: "GET",
        success: function(res) {
            console.log('Next field ID:', res);
            document.getElementById("field_id").value = res; 
            document.getElementById("field_id").readOnly = true; 
        },
        error: function(err) {
            console.error('Failed to fetch next field ID:', err);
        }
    });
}

$(document).ready(function () {
    fetchNextFieldId();
    fetchFields(); 
});

fieldForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateForm()) {
        let field_name = document.getElementById("field_name").value;
        let x_location = document.getElementById("x_coordinate").value;
        let y_location = document.getElementById("y_coordinate").value;
        let size = document.getElementById("size").value;
        let image1 = document.getElementById("field-image-1").files[0];
        let image2 = document.getElementById("field-image-2").files[0];

        let location = `${x_location},${y_location}`;

        const formData = new FormData();
        formData.append("field_name", field_name);
        formData.append("location", location);
        formData.append("extent_size", size);
        formData.append("image_1", image1);
        formData.append("image_2", image2);

        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/field",
            type: "POST",
            data: formData,
            processData: false, 
            contentType: false, 
            success: (res) => {
                console.log(JSON.stringify(res));
                document.getElementById("field_id").value = res.field_code;
                fetchNextFieldId();
                fetchFields();
            },
            error: (res) => {
                console.error(res);
            }
        });

        fieldForm.reset();
        clearFieldForm();
    }
});

function buildFieldTable(allFields){
    if (!Array.isArray(allFields)) {
        console.error('Expected an array but got:', allFields);
        return;
    }

    const filteredFields = allFields.filter(element => element.field_code !== "F000");

    fieldTableBody.innerHTML = '';
    filteredFields.forEach(function (element) {
        const location = element.location 
            ? `x : ${element.location.x},  y : ${element.location.y}` 
            : 'N/A';

        const image1 = element.image_1 
            ? `<img src="data:image/jpeg;base64,${element.image_1}" alt="Field Image" style="width: 100px; height: 100px;">` 
            : 'No Image';

        const image2 = element.image_2 
            ? `<img src="data:image/jpeg;base64,${element.image_2}" alt="Field Image 2" style="width: 100px; height: 100px;">` 
            : 'No Image 2';

        // Combine the images for display
        const images = `<div style="display: flex; gap: 8px;">${image1}${image2}</div>`;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.field_code}</td>
            <td>${element.field_name}</td>
            <td>${location}</td>
            <td>${element.extent_size}</td>
            <td>${images}</td>
            <td class = "actionBtn">
                <button onclick="deleteFieldData('${element.field_code}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateFieldForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        fieldTableBody.appendChild(row);
    });

}


function deleteFieldData(id) {
    if (confirm("Are you sure you want to delete this field?")) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/field/${id}`,
            type: "DELETE",
            success: function(res) {
                console.log('Delete Response:', res);
                fetchNextFieldId();
                fetchFields();
                fieldForm.reset();
                clearFieldForm();
            },
            error: function(err) {
                console.error('Failed to delete field:', err);
            }
        });
    } else {
        console.log('Delete action canceled');
    }
}

function populateFieldForm(field) {

    document.getElementById("field_id").value = field.field_code;
    document.getElementById("field_name").value = field.field_name;

    const x = field.location.x || '';
    const y = field.location.y || '';
    console.log("X Coordinate:", x);
    console.log("Y Coordinate:", y);

    document.getElementById('x_coordinate').value = x;
    document.getElementById('y_coordinate').value = y;

    document.getElementById('size').value = field.extent_size;

    if (field.image_1) {
        const imagePreviewF1 = document.getElementById('imagePreviewF1');
        const mimeType1 = getMimeType(field.image_1); // Function to determine MIME type

        // Set image preview
        imagePreviewF1.src = `data:${mimeType1};base64,${field.image_1}`;
        imagePreviewF1.style.display = 'block';

        // Convert base64 to a File object and set it to the file input
        const file = base64ToFile(field.image_1, mimeType1, 'image.' + mimeType1.split('/')[1]);
        setFileToInput(file);
    }

    if (field.image_2) {
        const imagePreviewF2 = document.getElementById('imagePreviewF2');
        const mimeType2 = getMimeType(field.image_2); // Function to determine MIME type
        imagePreviewF2.src = `data:${mimeType2};base64,${field.image_2}`;
        imagePreviewF2.style.display = 'block';

        const file = base64ToFile(field.image_2, mimeType2, 'image.' + mimeType2.split('/')[1]);
        setFileToInput2(file);

    }

    document.getElementById("field_update").style.display = "block"
    document.getElementById("field_add").style.display = "none"
}

function base64ToFile(base64Data, mimeType, fileName) {
    const binaryData = atob(base64Data); // Decode base64 to binary data
    const byteArray = new Uint8Array(binaryData.length);

    // Convert binary data to byteArray
    for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: mimeType }); // Create a Blob from byteArray
    const file = new File([blob], fileName, { type: mimeType }); // Create a File object from Blob
    return file;
}

// Function to set the file to the input field
function setFileToInput(file) {
    const fileInput = document.getElementById('field-image-1'); 
    const dataTransfer = new DataTransfer(); 
    dataTransfer.items.add(file); 
    fileInput.files = dataTransfer.files; 
}

function setFileToInput2(file) {
    const fileInput = document.getElementById('field-image-2'); 
    const dataTransfer = new DataTransfer(); 
    dataTransfer.items.add(file); 
    fileInput.files = dataTransfer.files; 
}

// Function to determine MIME type from base64 data
function getMimeType(base64Data) {
    if (base64Data.startsWith('iVBORw0KGgo')) {
        return 'image/png'; 
    } else if (base64Data.startsWith('/9j/4AAQ')) {
        return 'image/jpeg'; 
    } else if (base64Data.startsWith('R0lGODlh')) {
        return 'image/gif';
    } else if (base64Data.startsWith('data:image/svg+xml;base64,')) {
        return 'image/svg+xml';
    }
    return 'image/jpeg'; 
}

document.querySelector('#field_update').onclick = function() {
    let field_code = document.getElementById("field_id").value
    let field_name = document.getElementById("field_name").value;
    let x_location = document.getElementById("x_coordinate").value;
    let y_location = document.getElementById("y_coordinate").value;
    let size = document.getElementById("size").value;
    let image1 = document.getElementById("field-image-1").files[0];
    let image2 = document.getElementById("field-image-2").files[0];

    const location = `${x_location}, ${y_location}`;

    const formData = new FormData(); 
    formData.append('field_code', field_code);
    formData.append('field_name', field_name);
    formData.append('location', location);
    formData.append('extent_size', size);

    if (image1) {
        formData.append('image_1', image1); // Append new image
    } else {
        const existingImage1Src = document.getElementById('imagePreviewF1').src;
        formData.append('image_1', existingImage1Src); // Use existing image
    }


    if (image2) {
        formData.append('image_2', image2); // Append new image
    } else {
        const existingImage2Src = document.getElementById('imagePreviewF2').src;
        formData.append('image_2', existingImage2Src); // Use existing image
    }


    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/field/${field_code}`, 
        type: "PATCH",
        data: formData,
        processData: false, 
        contentType: false, 
        success: function(res, status, xhr) {
            if (xhr.status === 204) {  
                console.log('Field updated successfully');
                fetchNextFieldId();
                fetchFields();  
            } else {
                console.error('Failed to update Field:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update field:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText);
            }
        }
    });

    document.getElementById("field_update").style.display = "none";
    document.getElementById("field_add").style.display = "block";
    fieldForm.reset(); 
    clearFieldForm();
};

$("#search_field").keydown(function (e) {
    if (e.keyCode == 13) {  
        let id = document.getElementById("search_field").value;

        if (id) {
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/field/${id}`,
                type: "GET",
                headers: { "Content-Type": "application/json" },
                success: function(field) {
                    if (field && field.field_code) { 
                        populateFieldForm(field);
                    } else {
                        console.warn("Field not found.");
                        alert("Field ID not found!"); 
                        fieldForm.reset();  
                        fetchNextFieldId();  
                    }
                },
                error: function(err) {
                    console.error('Error fetching field:', err);
                    alert("Invalid Field ID! Please enter a valid ID."); 
                    fieldForm.reset();  
                    fetchNextFieldId();  
                }
            });
        } else {
            alert("Search field cannot be empty!");
            fieldForm.reset(); 
            fetchNextFieldId();  
        }
    }
});

function clearFieldForm() {
    document.getElementById('imagePreviewF1').style.display = "none"
    document.getElementById('imagePreviewF2').style.display = "none"
}

function populateFieldStaffDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff", 
        type: "GET",
        headers: { "Content-Type": "application/json" },
        success: function(res) {
            const staffDropdown = $("#field_staff");
            staffDropdown.empty(); // Clear existing options

            res.forEach(staff => {
                const option = `<option value="${staff.id}">${staff.id} - ${staff.first_name} ${staff.last_name}</option>`;
                staffDropdown.append(option);
            });

            console.log('Staff options:', res);
        },
        error: function(err) {
            console.error('Failed to fetch staff:', err);
        }
    });
}

function populateFieldIdDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field", 
        type: "GET",
        headers: { "Content-Type": "application/json" },
        success: function(res) {
            const fieldDropdown = $("#field_ids");
            fieldDropdown.empty(); 
            fieldDropdown.append('<option value="" disabled selected>Select a field</option>');

            const filteredFields = res.filter(field => field.field_code !== "F000");

            filteredFields.forEach(field => {
                const option = `<option value="${field.field_code}">${field.field_code} - ${field.field_name}</option>`;
                fieldDropdown.append(option);
            });

            fieldDropdown.trigger('change');
        },
        error: function(err) {
            console.error('Failed to fetch fields:', err);
        }
    });
}

document.getElementById("assignFieldSCancel").addEventListener("click", function () {
    document.getElementById("assignStaffFieldPopup").style.display = "none";
});

document.getElementById("assignFieldSConfirm").addEventListener("click", function () {
    // Get selected staff IDs (multiple selection)
    const selectedStaffOptions = Array.from(document.getElementById("field_staff").selectedOptions);
    const selectedStaffs = selectedStaffOptions.map(option => option.value);

    // Get selected field ID
    const selectedField = document.getElementById("field_ids").value;

    // Get the assigned date
    const assignedDate = document.getElementById("field_staff_date").value;

    // Validate inputs
    if (selectedStaffs.length > 0 && selectedField && assignedDate) {
        // Prepare the payload
        const payload = {
            fieldCode: selectedField,
            staffId: selectedStaffs,
            assignedDate: assignedDate
        };

        // Make an AJAX POST request to save the data
        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/staff_field", // Adjust your API endpoint as needed
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(payload),
            success: function (res) {
                alert("Staff members successfully assigned to the field!");
                console.log("Response:", res);

                // Close the popup and reset the form
                document.getElementById("assignStaffFieldPopup").style.display = "none";
                document.getElementById("field_staff").value = ""; // Reset staff dropdown
                document.getElementById("field_ids").value = "";   // Reset field dropdown
                document.getElementById("field_staff_date").value = ""; // Reset date field
            },
            error: function (err) {
                console.error("Failed to assign staff members:", err);
                alert("Failed to assign staff members. Please try again.");
            }
        });
    } else {
        alert("Please select a field, at least one staff member, and provide an assigned date.");
    }
});



async function getStaffIdsByFieldCode(fieldCode) {
    try {
        const response = await fetch(`http://localhost:8080/greenShadow/api/v1/staff_field/staff-field/${fieldCode}`); // Ensure this endpoint is correct
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const staffIds = await response.json(); // Assuming this directly returns an array of staff IDs
        return staffIds;
    } catch (error) {
        console.error('Error fetching staff IDs:', error);
        return []; // Return an empty array in case of error
    }
}

function fetchStaffField() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff_field",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res);
            buildViewTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch field data:', err);
        }
    });
}


function buildViewTable(detail) {
    if (!Array.isArray(detail)) {
        console.error('Expected an array but got:', detail);
        return;
    }

    const today = new Date().toISOString().split('T')[0]; 

    const todayDetails = detail.filter(element => {
        const assignedDate = element.assignedDate;
        return assignedDate && assignedDate.split('T')[0] === today;
    });

    const groupedDetails = todayDetails.reduce((acc, element) => {
        const fieldCode = element.fieldCode;
        if (!acc[fieldCode]) {
            acc[fieldCode] = [];
        }
        acc[fieldCode].push(element.staffId); 
        return acc;
    }, {});

    viewTableBody.innerHTML = '';
    Object.entries(groupedDetails).forEach(([fieldCode, staffIds]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fieldCode}</td>
            <td>${staffIds.join(' , ')}</td> <!-- Join staff IDs with a comma separator -->
        `;
        viewTableBody.appendChild(row);
    });
}


