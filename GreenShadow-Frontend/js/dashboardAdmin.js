document.getElementById("dashboard").style.display = "block";
document.getElementById("staff").style.display = "none";
document.getElementById("vehicles").style.display = "none";
document.getElementById("equipment").style.display = "none";
document.getElementById("profile").style.display = "none";

document.getElementById("dashboard-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "block";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Dashboard-Side.png')";

});

document.getElementById("staff-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("staff").style.display = "block";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Staff-img.png')";

});

document.getElementById("vehicles-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "block";
    document.getElementById("equipment").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Vehicle-img.png')";

});

document.getElementById("equipment-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "block";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Equipment-img.png')";

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

$(document).ready(function() {
    const datetimeInput = document.getElementById('datetimeInput');

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

let token = localStorage.getItem('token');

function getProfile(){
    document.getElementById("profile").style.display = "block";

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("vehicles").style.display = "none";
    document.getElementById("equipment").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/ProfileSide.png')";
}
