$(document).ready(function() {
    $('#designation').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#role').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });
});

const staffForm = document.getElementById("staff_form");
const staffTableBody = document.getElementById("staff_table").querySelector('tbody');

document.getElementById("staff_update").style.display = "none"

function validateStaffForm(){
    let email = document.getElementById("email").value;
    let firstName = document.getElementById("first_name").value;
    let lastName = document.getElementById("last_name").value;
    let designation = document.getElementById("designation").value;
    let contact = document.getElementById("contact").value;
    let line1 = document.getElementById("line_1").value;
    let line2 = document.getElementById("line_2").value;
    let line3 = document.getElementById("line_3").value;
    let line4 = document.getElementById("line_4").value;
    let line5 = document.getElementById("line_5").value;
    let joinedDate = document.getElementById("joined_date").value;
    let dob = document.getElementById("dob").value;
    let role = document.getElementById("role").value;

    let genderSelected = document.querySelector('input[name="options"]:checked');

    if(email == ""){
        $("#emailError").text("Please enter your email");
        $("#email").css("border-color",  "red");
        return false;
    }else if (!(regexEmail.test($("#email").val()))){
        $("#emailError").text("Please enter valid email");
        $("#email").css("border-color",  "red");
        return false;
    }else{
        $("#emailError").text("");
        $("#email").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(firstName == ""){
        $("#firstNError").text("Please enter your first name");
        $("#first_name").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#first_name").val()))){
        $("#firstNError").text("Please enter valid name");
        $("#first_name").css("border-color",  "red");
        return false;
    }else{
        $("#firstNError").text("");
        $("#first_name").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(lastName == ""){
        $("#lastNError").text("Please enter your last name");
        $("#last_name").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#last_name").val()))){
        $("#lastNError").text("Please enter valid name");
        $("#last_name").css("border-color",  "red");
        return false;
    }else{
        $("#lastNError").text("");
        $("#last_name").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(designation == ""){
        $("#designationError").text("Please enter your designation");
        $("#designation").css("border-color",  "red");
        return false;
    }else{
        $("#designationError").text("");
        $("#designation").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(contact == ""){
        $("#contactError").text("Please enter your conatact number");
        $("#contact").css("border-color",  "red");
        return false;
    }else if (!(regexTel.test($("#contact").val()))){
        $("#contactError").text("Please enter valid number");
        $("#contact").css("border-color",  "red");
        return false;
    }else{
        $("#contactError").text("");
        $("#contact").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(line4 == ""){
        $("#cityError").text("Please enter your city");
        $("#line4").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#line4").val()))){
        $("#cityError").text("Please enter valid city");
        $("#line4").css("border-color",  "red");
        return false;
    }else{
        $("#cityError").text("");
        $("#line4").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(line1 == "" && line2 == "" && line3 == "" && line4 == "" && line5 == ""){
        $("#addressError").text("Please enter your address");
        return false;
    }else{
        $("#addressError").text("");
        $("#last_name").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(joinedDate == ""){
        $("#joinedDError").text("Please enter your joined date");
        $("#joined_date").css("border-color",  "red");
        return false;
    }else{
        $("#joinedDError").text("");
        $("#joined_date").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(dob == ""){
        $("#dobError").text("Please enter your date of birth");
        $("#dob").css("border-color",  "red");
        return false;
    }else{
        $("#dobError").text("");
        $("#dob").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(role == ""){
        $("#roleError").text("Please enter your role");
        $("#role").css("border-color",  "red");
        return false;
    }else{
        $("#roleError").text("");
        $("#role").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if (!genderSelected) {
        $("#genderError").text("Please select your gender");
        return false;
    } else {
        $("#genderError").text("");
    }

    return true;
}

function fetchStaff() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res);
            buildStaffTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch staff data:', err);
        }
    });
}

function fetchNextStaffId() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff/next-id",
        type: "GET",
        success: function(res) {
            console.log('Next Staff ID:', res);
            document.getElementById("staff_id").value = res; 
            document.getElementById("staff_id").readOnly = true; 
        },
        error: function(err) {
            console.error('Failed to fetch next staff ID:', err);
        }
    });
}

$(document).ready(function() {
    $('#designation').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#designation').on('change', function() {
        let selectedValue = $(this).val();
        console.log('Selected field code:', selectedValue);
    });

    fetchNextStaffId();
    fetchStaff(); 
    populateDesignationDropdown();
    populateRoleDropdown();
});

document.getElementById("designation").addEventListener("change", function() {
    let selectedValue = this.value;
    console.log(selectedValue); 
});

staffForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateStaffForm()) {
        let email = document.getElementById("email").value;
        let firstName = document.getElementById("first_name").value;
        let lastName = document.getElementById("last_name").value;
        let designation = document.getElementById("designation").value;
        let contact = document.getElementById("contact").value;
        let line1 = document.getElementById("line_1").value;
        let line2 = document.getElementById("line_2").value;
        let line3 = document.getElementById("line_3").value;
        let line4 = document.getElementById("line_4").value;
        let line5 = document.getElementById("line_5").value;
        let joinedDate = document.getElementById("joined_date").value;
        let dob = document.getElementById("dob").value;
        let role = document.getElementById("role").value;
        let genderSelected = document.querySelector('input[name="options"]:checked').value;

        const staffData = {
            first_name:firstName,
            last_name:lastName,
            email:email,
            contact_no:contact,
            address_line_1:line1,
            address_line_2:line2,
            address_line_3:line3,
            address_line_4:line4,
            address_line_5:line5,
            designation:designation,
            role:role,
            gender:genderSelected.toUpperCase(),
            dob:dob,
            joined_date:joinedDate
        }
        
        const staffJson = JSON.stringify(staffData);

        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/staff",
            type: "POST",
            data: staffJson,
            headers: {"Content-Type": "application/json"},
            success:(res) => {
                console.log(JSON.stringify(res));
                fetchStaff();
                fetchNextStaffId();
            },
            Error: (res) => {
                console.error(res);
            }
        });

        staffForm.reset();
        clearStaffForm();
    }
});

function buildStaffTable(allStaff){
    if (!Array.isArray(allStaff)) {
        console.error('Expected an array but got:', allStaff);
        return;
    }

    staffTableBody.innerHTML = '';
    allStaff.forEach(function (element) {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.id}</td>
            <td>${element.first_name}</td>
            <td>${element.email}</td>
            <td>${element.contact_no}</td>
            <td>${element.designation}</td>
            <td>${element.role}</td>
            <td>${element.address_line_4}</td>            
            <td>${element.gender}</td>
            <td>${element.joined_date}</td>
            <td>${element.dob}</td>
            <td class = "actionBtn">
                <button onclick="deleteStaffData('${element.id}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateStaffForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        staffTableBody.appendChild(row);
    });

}

function deleteStaffData(id) {
    if (confirm("Are you sure you want to delete this member?")) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/staff/${id}`,
            type: "DELETE",
            success: function(res) {
                console.log('Delete Response:', res);
                fetchStaff();
                fetchNextStaffId();
            },
            error: function(err) {
                console.error('Failed to delete member:', err);
            }
        });
    } else {
        console.log('Delete action canceled');
    }
}

function populateStaffForm(staff) {

    document.getElementById("staff_id").value = staff.id;
    document.getElementById("first_name").value = staff.first_name;
    document.getElementById('last_name').value = staff.last_name;
    document.getElementById('email').value = staff.email;
    document.getElementById('contact').value = staff.contact_no;
    document.getElementById("line_1").value = staff.address_line_1;
    document.getElementById("line_2").value = staff.address_line_2;
    document.getElementById('line_3').value = staff.address_line_3;
    document.getElementById('line_4').value = staff.address_line_4;
    document.getElementById('line_5').value = staff.address_line_5;
    document.getElementById('joined_date').value = staff.joined_date;
    document.getElementById('dob').value = staff.dob;

    $('#designation').val(staff.designation).trigger('change');
    $('#role').val(staff.role).trigger('change');

    if (staff.gender) {
        document.querySelector(`input[name="options"][value="${staff.gender.toLowerCase()}"]`).checked = true;
    }
    
    document.getElementById("staff_update").style.display = "block"
    document.getElementById("staff_add").style.display = "none"
}

document.querySelector('#staff_update').onclick = function() {
    let id = document.getElementById("staff_id").value
    let email = document.getElementById("email").value;
    let firstName = document.getElementById("first_name").value;
    let lastName = document.getElementById("last_name").value;
    let designation = document.getElementById("designation").value;
    let contact = document.getElementById("contact").value;
    let line1 = document.getElementById("line_1").value;
    let line2 = document.getElementById("line_2").value;
    let line3 = document.getElementById("line_3").value;
    let line4 = document.getElementById("line_4").value;
    let line5 = document.getElementById("line_5").value;
    let joinedDate = document.getElementById("joined_date").value;
    let dob = document.getElementById("dob").value;
    let role = document.getElementById("role").value;
    let genderSelected = document.querySelector('input[name="options"]:checked').value;

    const staffData = {
            id:id,
            first_name:firstName,
            last_name:lastName,
            email:email,
            contact_no:contact,
            address_line_1:line1,
            address_line_2:line2,
            address_line_3:line3,
            address_line_4:line4,
            address_line_5:line5,
            designation:designation,
            role:role,
            gender:genderSelected.toUpperCase(),
            dob:dob,
            joined_date:joinedDate
        }
        
        const staffJson = JSON.stringify(staffData);

    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/staff/${staffData.id}`, 
        type: "PATCH",
        data: staffJson,
        headers: {"Content-Type": "application/json"},
        success: function(res, status, xhr) {
            if (xhr.status === 204) { // No Content
                console.log('Update member successfully');
                fetchStaff(); 
            } else {
                console.error('Failed to update member:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update member:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText); // Log detailed error response
            }
        }
    });

    document.getElementById("staff_update").style.display = "none";
    document.getElementById("staff_add").style.display = "block";
    staffForm.reset(); 
    clearStaffForm();
};

function populateDesignationDropdown() {
    const desSelect = document.getElementById('designation');

    const defaultOption = desSelect.querySelector('option[value=""]');
    desSelect.innerHTML = ''; 
    if (defaultOption) {
        desSelect.appendChild(defaultOption); 
    }

    const designations = ["Manager", "Senior Assistant Manager", "Assistant Manager", "Admin and HR Staff", "Office Assistant", "Senior Agronomist", "Agronomist", "Soil scientist", "Senior Technician", "Technician", "Supervisors", "Labors"];

    designations.forEach(designation => {
        const option = document.createElement('option');
        option.value = designation;
        option.textContent = designation;
        desSelect.appendChild(option);
    });
}

function populateRoleDropdown() {
    const roleSelect = document.getElementById('role');

    const defaultOption = roleSelect.querySelector('option[value=""]');
    roleSelect.innerHTML = ''; 
    if (defaultOption) {
        roleSelect.appendChild(defaultOption); 
    }

    const roles = ["ADMINISTRATIVE", "MANAGER", "SCIENTIST", "OTHER"];

    roles.forEach(role => {
        const existingOption = Array.from(roleSelect.options).find(option => option.value === role);
        if (!existingOption) {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleSelect.appendChild(option);
        }
    });
}

$("#search_staff").keydown(function (e) {
    if (e.keyCode == 13) {  
        let id = document.getElementById("search_staff").value;

        if (id) {
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/staff/${id}`,
                type: "GET",
                headers: { "Content-Type": "application/json" },
                success: function(staff) {
                    if (staff && staff.id) { 
                        populateStaffForm(staff);
                    } else {
                        console.warn("Staff not found.");
                        alert("Staff ID not found!"); 
                        staffForm.reset();  
                        fetchNextStaffId();  
                    }
                },
                error: function(err) {
                    console.error('Error fetching staff:', err);
                    alert("Invalid ID! Please enter a valid ID."); 
                    staffForm.reset();  
                    fetchNextStaffId();  
                }
            });
        } else {
            alert("Search staff cannot be empty!");
            staffForm.reset(); 
            fetchNextStaffId();  
        }
    }
});


function clearStaffForm() {
    document.querySelectorAll('input[name="options"]').forEach(radio => {
        radio.checked = false;
    });

    document.getElementById('dob').value = "";
    document.getElementById('joined_date').value = "";

    $('#designation').val('').trigger('change'); 
    $('#role').val('').trigger('change');      
}
