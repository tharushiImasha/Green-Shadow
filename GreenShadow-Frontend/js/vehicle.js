$(document).ready(function() {
    $('#vehicle-staff').select2({
        dropdownCssClass: 'custom-dropdown', // Custom class for dropdown styling
        minimumResultsForSearch: Infinity // Hides the search box for small lists
    });
});