$(document).ready(function() {
    $('#field-crop').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    const datetimeInput = document.getElementById('datetimeInputCr');

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

function validateCropForm(){
    let commonName = document.getElementById("common_name").value;
    let scientificName = document.getElementById("scientific_name").value;
    let season = document.getElementById("season").value;
    let category = document.getElementById("category").value;

    if(commonName == ""){
        $("#commonError").text("Please enter crop common name");
        $("#common_name").css("border-color",  "red");
        return false;
    }else if (!(cropRegex.test($("#common_name").val()))){
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
    }else if (!(cropRegex.test($("#scientific_name").val()))){
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
    }else if (!(cropRegex.test($("#season").val()))){
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
    }else if (!(cropRegex.test($("#category").val()))){
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
    if(token){
        console.log("Authorization:", "Bearer "+ token)
        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/crop",
            type: "GET",
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer "+ token,
            }, 
            success: function(res) {
                console.log('Response:', res);
                buildCropTable(res);
            },
            error: function(err) {
                console.error('Failed to fetch crop data:', err);
                if (err.responseJSON && err.responseJSON.message) {
                    console.error('Error message:', err.responseJSON.message); 
                }
            }
        });
    }
}

function fetchNextCropId() {
    if(token){
        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/crop/next-id",
            type: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
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
}

$(document).ready(function() {
    $('#field-crop').select2({
        dropdownCssClass: 'custom-dropdown', 
        minimumResultsForSearch: Infinity 
    });

    $('#field-crop').on('change', function() {
        let selectedValue = $(this).val();
        console.log('Selected field code:', selectedValue);
    });

    fetchNextCropId();
    fetchCrops(); 
    populateFieldDropdown();
});

document.getElementById("field-crop").addEventListener("change", function() {
    let selectedValue = this.value;
    console.log(selectedValue); 
});

cropForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateCropForm()) {
        let commonName = document.getElementById("common_name").value;
        let scientificName = document.getElementById("scientific_name").value;
        let season = document.getElementById("season").value;
        let category = document.getElementById("category").value;
        let image = document.getElementById("image").files[0];
        let fieldCode = document.getElementById("field-crop").value;

        const formData = new FormData();
        formData.append("common_name", commonName);
        formData.append("specific_name", scientificName);
        formData.append("crop_image", image);
        formData.append("category", category);
        formData.append("crop_season", season);
        formData.append("field_code", fieldCode);

        if(token){
            $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/crop",
            type: "POST",
            data: formData,
            processData: false, 
            contentType: false, 
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: (res) => {
                console.log(JSON.stringify(res));
                document.getElementById("crop_id").value = res.crop_code;
                fetchCrops();
                fetchNextCropId();
            },
            error: (res) => {
                console.error(res);
            }
        });

        cropForm.reset();
        clearCropForm();
        }
    }
});

function buildCropTable(allCrops){

    if (!Array.isArray(allCrops)) {
        console.error('Expected an array but got:', allCrops);
        return;
    }

    cropTableBody.innerHTML = '';
    allCrops.forEach(function (element) {
        const image = element.crop_image
            ? `<img src="data:image/jpeg;base64,${element.crop_image}" alt="Crop Image" style="width: 100px; height: 100px;">` 
            : 'No Image';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.crop_code}</td>
            <td>${element.common_name}</td>
            <td>${element.specific_name}</td>
            <td>${element.crop_season}</td>
            <td>${element.category}</td>
            <td>${image}</td>
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
        if(token){
            $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/crop/${id}`,
            type: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(res) {
                console.log('Delete Response:', res);
                fetchCrops();
                fetchNextCropId();
            },
            error: function(err) {
                console.error('Failed to delete crop:', err);
            }
        });
        }
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

    $('#field-crop').val(crop.field_code).trigger('change');

    console.log(crop.field_code)
    
    if (crop.crop_image) {
        const imagePreview = document.getElementById('imagePreview');
        const mimeTypeC = getMimeType(crop.crop_image);

        imagePreview.src = `data:${mimeTypeC};base64,${crop.crop_image}`;
        imagePreview.style.display = 'block';

        const file = base64ToFile(crop.crop_image, mimeTypeC, 'image.' + mimeTypeC.split('/')[1]);
        setFileToInputCrop(file);
    }

    document.getElementById("crop_update").style.display = "block"
    document.getElementById("crop_add").style.display = "none"
}

function setFileToInputCrop(file) {
    const fileInput = document.getElementById('image'); 
    const dataTransfer = new DataTransfer(); 
    dataTransfer.items.add(file); 
    fileInput.files = dataTransfer.files; 
}

document.querySelector('#crop_update').onclick = function() {
    let crop_id = document.getElementById("crop_id").value;
    let commonName = document.getElementById("common_name").value;
    let scientificName = document.getElementById("scientific_name").value;
    let season = document.getElementById("season").value;
    let category = document.getElementById("category").value;
    let imageC = document.getElementById("image").files[0];
    let fieldCode = document.getElementById("field-crop").value;

    const formData = new FormData(); 
    formData.append('crop_code', crop_id);
    formData.append('common_name', commonName);
    formData.append('specific_name', scientificName);
    formData.append('crop_season', season);
    formData.append('category', category);
    formData.append('field_code', fieldCode);
    
    if (imageC) {
        formData.append('crop_image', imageC);         
    } else {
        const existingImageSrc = document.getElementById('imagePreview').src;
        formData.append('crop_image', existingImageSrc); 
    }

    if(token){
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/crop/${crop_id}`, 
            type: "PATCH",
            data: formData,
            processData: false, 
            contentType: false, 
            headers: {
                'Authorization': `Bearer ${token}`
            },
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
    }

    document.getElementById("crop_update").style.display = "none";
    document.getElementById("crop_add").style.display = "block";
    cropForm.reset(); 
    clearCropForm();
};

function populateFieldDropdown() {
    if(token){
        $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field", 
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        },
        success: function(res) {
            const fieldDropdown = $("#field-crop");
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
}

$("#crop_search").keydown(function (e) {
    if (e.keyCode == 13) {  
        let id = document.getElementById("crop_search").value;

        if (id) {
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/crop/${id}`,
                type: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`, // Bearer token format
                    'Content-Type': 'application/json'
                },
                success: function(crop) {
                    if (crop && crop.crop_code) { 
                        populateCropForm(crop);
                    } else {
                        console.warn("Crop not found.");
                        alert("Crop ID not found!"); 
                        cropForm.reset();  
                        fetchNextCropId();  
                    }
                },
                error: function(err) {
                    console.error('Error fetching crop:', err);
                    alert("Invalid Crop ID! Please enter a valid ID."); 
                    cropForm.reset();  
                    fetchNextCropId();  
                }
            });
        } else {
            alert("Search crop cannot be empty!");
            cropForm.reset(); 
            fetchNextCropId();  
        }
    }
});

function clearCropForm() {
    $('#field-crop').val('').trigger('change'); 
    document.getElementById('imagePreview').style.display = "none";
}