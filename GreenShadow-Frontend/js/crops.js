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

//Vehicle
$(document).ready(function() {
        $('#vehicle-staff').select2({
            dropdownCssClass: 'custom-dropdown', // Custom class for dropdown styling
            minimumResultsForSearch: Infinity // Hides the search box for small lists
        });
    });