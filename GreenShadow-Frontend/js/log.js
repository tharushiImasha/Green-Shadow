function previewImageLog(event) {
    const imagePreview1 = document.getElementById('imagePreviewLogImage');
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

function getDate() {
    const logDateInput = document.getElementById("log_date");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    logDateInput.value = formattedDate;
};

$(document).ready(function() {
    $('#log_staff').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#log_crop').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#log_field').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    const datetimeInput = document.getElementById('datetimeInputLo');

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

const logForm = document.getElementById("log_form");
const logTableBody = document.getElementById("log_table").querySelector('tbody');

document.getElementById("log_update").style.display = "none"

function validateLogForm(){
    let logField = document.getElementById("log_field").value;
    let logCrop = document.getElementById("log_crop").value;
    let logStaff = document.getElementById("log_staff").value;
    let detail = document.getElementById("log_detail").value;

    if(logField == ""){
        $("#logFieldError").text("Please enter field");
        $("#log_field").css("border-color",  "red");
        return false;
    }else{
        $("#logFieldError").text("");
        $("#log_field").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(logCrop == ""){
        $("#logCropError").text("Please enter crop");
        $("#log_crop").css("border-color",  "red");
        return false;
    }else{
        $("#logCropError").text("");
        $("#log_crop").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(logStaff == ""){
        $("#logstaffError").text("Please enter staff");
        $("#log_detail").css("border-color",  "red");
        return false;
    }else{
        $("#logstaffError").text("");
        $("#log_detail").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(detail == ""){
        $("#logDetailError").text("Please enter log detail");
        $("#log_detail").css("border-color",  "red");
        return false;
    }else{
        $("#logDetailError").text("");
        $("#log_detail").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    return true;
}

function fetchLogs() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/log",
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.log('Response:', res);
            buildLogTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch log data:', err);
        }
    });
}

function fetchNextLogId() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/log/next-id",
        type: "GET",
        headers: {
            "Authorization": "Bearer "+ token,
        }, 
        success: function(res) {
            console.log('Next Log ID:', res);
            document.getElementById("log_code").value = res; 
            document.getElementById("log_code").readOnly = true; 
        },
        error: function(err) {
            console.error('Failed to fetch next log ID:', err);
        }
    });
}

$(document).ready(function() {
    fetchNextLogId();
    fetchLogs(); 
    populateLogFieldDropdown();
    populateLogStaffDropdown();
    populateLogCropDropdown();
    getDate();
});

logForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateLogForm()) {
        let date = document.getElementById("log_date").value;
        let logField = document.getElementById("log_field").value;
        let logCrop = document.getElementById("log_crop").value;
        let logStaff = document.getElementById("log_staff").value;
        let detail = document.getElementById("log_detail").value;
        let image = document.getElementById("log-image").files[0];

        const formData = new FormData();
        formData.append("log_date", date);
        formData.append("log_details", detail);
        formData.append("observed_image", image);
        formData.append("field_code", logField);
        formData.append("crop_code", logCrop);
        formData.append("id", logStaff);

        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/log",
            type: "POST",
            data: formData,
            processData: false, 
            contentType: false, 
            headers: {
                "Authorization": "Bearer "+ token,
            },
            success: (res) => {
                console.log(JSON.stringify(res));
                document.getElementById("log_code").value = res.crop_code;
                fetchLogs();
                fetchNextLogId();
            },
            error: (res) => {
                console.error(res);
            }
        });

        logForm.reset();
        clearLogForm();
        getDate();
    }
});

function buildLogTable(allLogs){

    if (!Array.isArray(allLogs)) {
        console.error('Expected an array but got:', allLogs);
        return;
    }

    logTableBody.innerHTML = '';
    allLogs.forEach(function (element) {
        const image = element.observed_image
            ? `<img src="data:image/jpeg;base64,${element.observed_image}" alt="Crop Image" style="width: 100px; height: 100px;">` 
            : 'No Image';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.log_code}</td>
            <td>${element.log_date}</td>
            <td>${element.log_details}</td>
            <td>${element.crop_code}</td>
            <td>${element.id}</td>
            <td>${element.field_code}</td>
            <td>${image}</td>
            <td class = "actionBtn">
                <button onclick="deleteLogData('${element.log_code}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateLogForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        logTableBody.appendChild(row);
    });

}

function deleteLogData(id) {
    if (confirm("Are you sure you want to delete this log?")) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/log/${id}`,
            type: "DELETE",
            headers: {
                "Authorization": "Bearer "+ token,
            },
            success: function(res) {
                console.log('Delete Response:', res);
                fetchLogs();
                fetchNextLogId();
                getDate();
            },
            error: function(err) {
                console.error('Failed to delete log:', err);
            }
        });
    } else {
        console.log('Delete action canceled');
    }
}

function populateLogForm(log) {

    document.getElementById("log_code").value = log.log_code;
    document.getElementById("log_date").value = log.log_date;
    document.getElementById('log_detail').value = log.log_details;

    $('#log_staff').val(log.id).trigger('change');
    $('#log_crop').val(log.crop_code).trigger('change');
    $('#log_field').val(log.field_code).trigger('change');
    
    if (log.observed_image) {
        const imagePreview = document.getElementById('imagePreviewLogImage');
        const mimeType = getMimeType(log.observed_image);

        imagePreview.src = `data:${mimeType};base64,${log.observed_image}`;
        imagePreview.style.display = 'block';

        const file = base64ToFile(log.observed_image, mimeType, 'image.' + mimeType.split('/')[1]);
        setFileToInputLog(file);
    }

    document.getElementById("log_update").style.display = "block"
    document.getElementById("log_add").style.display = "none"
}

function setFileToInputLog(file) {
    const fileInput = document.getElementById('log-image'); 
    const dataTransfer = new DataTransfer(); 
    dataTransfer.items.add(file); 
    fileInput.files = dataTransfer.files; 
}

document.querySelector('#log_update').onclick = function() {
    let log_id = document.getElementById("log_code").value;
    let date = document.getElementById("log_date").value;
    let logField = document.getElementById("log_field").value;
    let logCrop = document.getElementById("log_crop").value;
    let logStaff = document.getElementById("log_staff").value;
    let detail = document.getElementById("log_detail").value;
    let image = document.getElementById("log-image").files[0];

    const formData = new FormData(); 
    formData.append("log_code", log_id);
    formData.append("log_date", date);
    formData.append("log_details", detail);
    formData.append("observed_image", image);
    formData.append("field_code", logField);
    formData.append("crop_code", logCrop);
    formData.append("id", logStaff);
    
    if (image) {
        formData.append('log-image', image);         
    } else {
        const existingImageSrc = document.getElementById('imagePreviewLogImage').src;
        formData.append('log-image', existingImageSrc); 
    }

    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/log/${log_id}`, 
        type: "PATCH",
        data: formData,
        processData: false, 
        contentType: false, 
        headers: {
            "Authorization": "Bearer "+ token,
        },
        success: function(res, status, xhr) {
            if (xhr.status === 204) {  
                console.log('Log updated successfully');
                fetchLogs();  
                fetchNextLogId();
            } else {
                console.error('Failed to update log:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update log:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText);
            }
        }
    });

    document.getElementById("log_update").style.display = "none";
    document.getElementById("log_add").style.display = "block";
    logForm.reset(); 
    clearLogForm();
    getDate();

};

function populateLogFieldDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field", 
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res) {
            const fieldDropdown = $("#log_field");
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

function populateLogCropDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/crop", 
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res) {
            const cropDropdown = $("#log_crop");
            cropDropdown.empty(); 
            cropDropdown.append('<option value="" disabled selected>Select a crop</option>');

            res.forEach(crop => {
                const option = `<option value="${crop.crop_code}">${crop.crop_code} - ${crop.common_name}</option>`;
                cropDropdown.append(option);
            });

            cropDropdown.trigger('change');
        },
        error: function(err) {
            console.error('Failed to fetch crop:', err);
        }
    });
}

function populateLogStaffDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff", 
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(res) {
            const staffDropdown = $("#log_staff");
            staffDropdown.empty(); 
            staffDropdown.append('<option value="" disabled selected>Select a field</option>');

            res.forEach(staff => {
                const option = `<option value="${staff.id}">${staff.id} - ${staff.first_name} ${staff.last_name}</option>`;
                staffDropdown.append(option);
            });

            staffDropdown.trigger('change');
        },
        error: function(err) {
            console.error('Failed to fetch staff:', err);
        }
    });
}

$("#log_search").keydown(function (e) {
    if (e.keyCode == 13) {  
        let id = document.getElementById("log_search").value;

        if (id) {
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/log/${id}`,
                type: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                success: function(log) {
                    if (log && log.log_code) { 
                        populateLogForm(log);
                    } else {
                        console.warn("Log not found.");
                        alert("Log ID not found!"); 
                        logForm.reset();  
                        fetchNextLogId();  
                    }
                },
                error: function(err) {
                    console.error('Error fetching log:', err);
                    alert("Invalid Log ID! Please enter a valid ID."); 
                    logForm.reset();  
                    fetchNextLogId();  
                }
            });
        } else {
            alert("Search log cannot be empty!");
            logForm.reset(); 
            fetchNextLogId();  
        }
    }
});

function clearLogForm() {
    $('#log_staff').val('').trigger('change'); 
    $('#log_crop').val('').trigger('change'); 
    $('#log_field').val('').trigger('change'); 
    document.getElementById('imagePreviewLogImage').style.display = "none";
}