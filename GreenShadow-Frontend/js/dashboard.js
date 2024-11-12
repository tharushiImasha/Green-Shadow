document.getElementById("dashboard").style.display = "block";
document.getElementById("crops").style.display = "none";
document.getElementById("fields").style.display = "none";
document.getElementById("staff").style.display = "none";
document.getElementById("vehicles").style.display = "none";
document.getElementById("equipment").style.display = "none";
document.getElementById("logs").style.display = "none";

document.getElementById("dashboard-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "block";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("logs").style.display = "none";

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

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Logs-img.png')";

});

const menuItems = document.querySelectorAll(".sidebar nav ul li");

document.getElementById("dashboard-btn").classList.add("active");

menuItems.forEach(item => {
    item.addEventListener("click", function() {
        // Remove active class from all items
        menuItems.forEach(el => el.classList.remove("active"));
        // Add active class to the clicked item
        this.classList.add("active");
    });
});