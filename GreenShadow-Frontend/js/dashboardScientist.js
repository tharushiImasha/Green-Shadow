document.getElementById("dashboard").style.display = "block";
document.getElementById("crops").style.display = "none";
document.getElementById("fields").style.display = "none";
document.getElementById("logs").style.display = "none";
document.getElementById("profile").style.display = "none";

let token = localStorage.getItem('token');

document.getElementById("dashboard-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "block";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Dashboard-Side.png')";

});

document.getElementById("crops-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "block";
    document.getElementById("fields").style.display = "none";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Crop-img.png')";

});

document.getElementById("fields-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "block";
    document.getElementById("logs").style.display = "none";
    document.getElementById("profile").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/Field-img.png')";

});

document.getElementById("logs-btn").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("logs").style.display = "block";
    document.getElementById("profile").style.display = "none";

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

function getProfile(){
    document.getElementById("profile").style.display = "block";

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("crops").style.display = "none";
    document.getElementById("fields").style.display = "none";
    document.getElementById("logs").style.display = "none";

    const fieldImageDiv = document.getElementById("fieldImage");
    fieldImageDiv.style.backgroundImage = "url('/assets/ProfileSide.png')";
}