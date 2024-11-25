$(document).ready(function() {
    $('#field-crop').select2({
        dropdownCssClass: 'custom-dropdown', // Custom class for dropdown styling
        minimumResultsForSearch: Infinity // Hides the search box for small lists
    });
});

function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];
        
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

const cropForm = document.getElementById("crop_form");
const cropTableBody = document.getElementById("crop-table").querySelector('tbody');

document.getElementById("crop_update").style.display = "none"

function validateForm(){
    let commonName = document.getElementById("common_name").value;
    let scientificName = document.getElementById("scientific_name").value;
    let season = document.getElementById("season").value;
    let category = document.getElementById("category").value;
    // let image = document.getElementById("crop_image").value;

    if(commonName == ""){
        $("#commonError").text("Please enter crop common name");
        $("#common_name").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#common_name").val()))){
        $("#commonError").text("Please enter valid name");
        $("#common_name").css("border-color",  "red");
        return false;
    }else{
        $("#commonError").text("");
        $("#common_named").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(scientificName == ""){
        $("#scientificError").text("Please enter crop scientific name");
        $("#scientific_name").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#common_name").val()))){
        $("#scientificError").text("Please enter valid name");
        $("#scientific_name").css("border-color",  "red");
        return false;
    }else{
        $("#scientificError").text("");
        $("#scientific_name").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(season == ""){
        $("#seasonError").text("Please enter crop season");
        $("#season").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#common_name").val()))){
        $("#seasonError").text("Please enter valid season");
        $("#season").css("border-color",  "red");
        return false;
    }else{
        $("#seasonError").text("");
        $("#season").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(category == ""){
        $("#categoryError").text("Please enter crop category");
        $("#category").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#common_name").val()))){
        $("#categoryError").text("Please enter valid category");
        $("#category").css("border-color",  "red");
        return false;
    }else{
        $("#categoryError").text("");
        $("#category").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    return true;
}

function fetchCrops() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/crop",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res);
            buildCropTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch crop data:', err);
        }
    });
}

function fetchNextCropId() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/crop/next-id",
        type: "GET",
        success: function(res) {
            console.log('Next Crop ID:', res);
            document.getElementById("crop_id").value = res; 
            document.getElementById("crop_id").readOnly = true; 
        },
        error: function(err) {
            console.error('Failed to fetch next crop ID:', err);
        }
    });
}

$(document).ready(function () {
    fetchNextCropId();
    fetchCrops(); 
    populateFieldDropdown();
});

cropForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateForm()) {
        let commonName = document.getElementById("common_name").value;
        let scientificName = document.getElementById("scientific_name").value;
        let season = document.getElementById("season").value;
        let category = document.getElementById("category").value;
        let image = document.getElementById("crop_image").files[0];
        let fieldCode = document.getElementById("field").value;

        const formData = new FormData();
        formData.append("common_name", commonName);
        formData.append("specific_name", scientificName);
        formData.append("crop_image", image);
        formData.append("category", category);
        formData.append("crop_season", season);
        formData.append("field_code", fieldCode);

        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/crop",
            type: "POST",
            data: formData,
            processData: false, 
            contentType: false, 
            success: (res) => {
                console.log(JSON.stringify(res));
                document.getElementById("crop_id").value = res.crop_code;
                fetchCrops();
            },
            error: (res) => {
                console.error(res);
            }
        });

        cropForm.reset();
    }
});

function buildCropTable(allCrops){

    if (!Array.isArray(allCrops)) {
        console.error('Expected an array but got:', allCrops);
        return;
    }

    cropTableBody.innerHTML = '';
    allCrops.forEach(function (element) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.crop_code}</td>
            <td>${element.common_name}</td>
            <td>${element.specific_name}</td>
            <td>${element.category}</td>
            <td>${element.crop_season}</td>
            <td>${element.field_code}</td>
            <td class = "actionBtn">
                <button onclick="deleteCropData('${element.crop_code}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateCropForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        cropTableBody.appendChild(row);
    });

}

function deleteCropData(id) {
    if (confirm("Are you sure you want to delete this crop?")) {
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/crop/${id}`,
            type: "DELETE",
            success: function(res) {
                console.log('Delete Response:', res);
                fetchCrops();
            },
            error: function(err) {
                console.error('Failed to delete crop:', err);
            }
        });
    } else {
        console.log('Delete action canceled');
    }
}

function populateCropForm(crop) {

    document.getElementById("crop_id").value = crop.crop_code;
    document.getElementById("common_name").value = crop.common_name;
    document.getElementById('scientific_name').value = crop.specific_name;
    document.getElementById('season').value = crop.crop_season;
    document.getElementById('category').value = crop.category;
    document.getElementById('field').value = crop.field_code;
    document.getElementById('crop_image').files[0] = crop.crop_image;

    document.getElementById("crop_update").style.display = "block"
    document.getElementById("crop_add").style.display = "none"
}

document.querySelector('#crop_update').onclick = function() {
    let crop_id = document.getElementById("crop_id").value;
    let commonName = document.getElementById("common_name").value;
    let scientificName = document.getElementById("scientific_name").value;
    let season = document.getElementById("season").value;
    let category = document.getElementById("category").value;
    let image = document.getElementById("crop_image").files[0];
    let fieldCode = document.getElementById("field").value;

    const formData = new FormData(); 
    formData.append('crop_code', crop_id);
    formData.append('common_name', commonName);
    formData.append('specific_name', scientificName);
    formData.append('season', season);
    formData.append('category', category);
    formData.append('field_code', fieldCode);

    if (image) {
        formData.append('crop_image', image);
    }

    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/crop/${crop_id}`, 
        type: "PATCH",
        data: formData,
        processData: false, 
        contentType: false, 
        success: function(res, status, xhr) {
            if (xhr.status === 204) {  
                console.log('Crop updated successfully');
                fetchCrops();  
            } else {
                console.error('Failed to update crop:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update crop:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText);
            }
        }
    });

    document.getElementById("crop_update").style.display = "none";
    document.getElementById("crop_add").style.display = "block";
    itemForm.reset(); 
};

function populateFieldDropdown() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field", // Your endpoint
        type: "GET",
        headers: { "Content-Type": "application/json" },
        success: function(res) {
            const fieldDropdown = $("#field-crop");
            fieldDropdown.empty(); // Clear existing options
            fieldDropdown.append('<option value="" disabled selected>Select a field</option>');

            res.forEach(field => {
                const option = `<option value="${field.field_code}">${field.field_code}</option>`;
                fieldDropdown.append(option);
            });

            // Reinitialize Select2 after dynamically adding options
            fieldDropdown.trigger('change');
        },
        error: function(err) {
            console.error('Failed to fetch fields:', err);
        }
    });
}