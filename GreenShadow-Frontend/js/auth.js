document.getElementById("user_register").addEventListener("click", function (){
    fetchStaff();    
});

let role = "";

function registerUser(role){
    let name = document.getElementById("name").value;
    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if(password === confirmPassword){
        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/auth/register",
            method: "POST",
            contentType: "application/json",
            "data":JSON.stringify({
                "email": email,
                "name": name,
                "password": password,
                "role": role
            }),
            success: function(response){
                console.log(response);
                localStorage.setItem("token", response.data.token);
                console.log(response.data.token);
            },
            error: function(error){
                console.log(error);
            }
        })
    }
}

function user_login (){
    let email = $("#username").val();
    let password = $("#password").val();

    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/auth/authenticate",
        method: "POST",
        contentType: "application/json",
        "data":JSON.stringify({
            "email": email,
            "password": password
        }),
        success: function(response){
            console.log(response);
            localStorage.setItem("token", response.data.token);
            console.log(response.data.token);
            window.location.href = '/pages/Dashboard.html';
        },
        error: function(error){
            console.log(error);
        }
    })
}

function fetchStaff() {
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.log('Response:', res);
            checkEmail(res);
        },
        error: function(err) {
            console.error('Failed to fetch staff data:', err);
        }
    });
}

function checkEmail(staff){
    let isAuthorized = false; 
    let isRegistered = false;
    let email = document.getElementById("username").value;

    if (!Array.isArray(staff)) {
        console.error('Expected an array but got:', staff);
        return;
    }

    staff.forEach(function (element) {
        let staffEmail = element.email;
        let staffRole = element.role;

        if (staffEmail === email && (staffRole === 'ADMINISTRATIVE,' || staffRole === 'MANAGER,' || staffRole === 'MANAGER')) {
            role = element.role;
            isAuthorized = true; 
        }
    });

    if (isAuthorized) {
        console.log("Email matches and user is authorized.");
        registerUser(role);
    } else {
        alert("Email does not match or user is not authorized.")
        console.log("Email does not match or user is not authorized.");
    }
}