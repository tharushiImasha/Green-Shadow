const togglePassword = document.querySelector('#toggle-password');
const toggleConfPassword = document.querySelector('#toggle-conf-password');
const passwordField = document.querySelector('#NewPassword'); 
const confirmPasswordField = document.querySelector('#confirmNewPassword');

const profileForm = document.getElementById("profile_form");

let userName = document.getElementById("user_name");
let email = localStorage.getItem("email")

let localPassword = localStorage.getItem("password");
let role = localStorage.getItem("role");

const currentPw = document.getElementById("current_pw").value;

document.getElementById("userEmail").innerHTML = email

togglePassword.addEventListener('click', () => {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    
    togglePassword.classList.toggle('ri-eye-line');
    togglePassword.classList.toggle('ri-eye-off-line');
});

toggleConfPassword.addEventListener('click', () => {
    const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordField.setAttribute('type', type);
    
    toggleConfPassword.classList.toggle('ri-eye-line');
    toggleConfPassword.classList.toggle('ri-eye-off-line');
});

$(document).ready(function() {
    const datetimeInput = document.getElementById('datetimeInputPr');

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

    fetchUser(email);
});

async function fetchUser(email) {
    try {
        let response = await fetch(`http://localhost:8080/greenShadow/api/v1/user/getUsers/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            let user = await response.json();

            userName.innerHTML = user.name;
            document.getElementById("changeName").value = user.name

        } else {
            console.error("Failed to fetch user data:", response.status);
        }
    } catch (error) {
        console.error("Error while fetching user data:", error);
    }
}

function validateProfile(){
    const currentPwV = document.getElementById("current_pw").value;
    if(currentPwV == ""){
        $("#currentPwError").text("Please enter your current password");
        $("#current_pw").css("border-color",  "red");
        return false;
    }else{
        $("#currentPwError").text("");
        $("#current_pw").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(passwordField == ""){
        $("#newPwError").text("Please enter your new password");
        $("#NewPassword").css("border-color",  "red");
        return false;
    }else{
        $("#newPwError").text("");
        $("#NewPassword").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    if(confirmPasswordField == ""){
        $("#conPwError").text("Please enter your new password");
        $("#confirmNewPassword").css("border-color",  "red");
        return false;
    }else{
        $("#conPwError").text("");
        $("#confirmNewPassword").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }

    return true;
}

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentPwU = document.getElementById("current_pw").value;
    const newPwU = document.getElementById("NewPassword").value;
    const conPwU = document.getElementById("confirmNewPassword").value;

    if(validateProfile()) {
        console.log(localPassword)
        console.log(currentPwU)
        if(localPassword == currentPwU){
            if(newPwU == conPwU){
                const userData = {
                    email: email,
                    password: newPwU,
                    name: document.getElementById("changeName").value,
                    role:role
                }
            
                const userJson = JSON.stringify(userData);

                $.ajax({
                    url: `http://localhost:8080/greenShadow/api/v1/user/${userData.email}`, 
                    type: "PATCH",
                    data: userJson,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    success: function(res, status, xhr) {
                        if (xhr.status === 204) { 
                            console.log('Update member successfully');
                            localStorage.setItem("password", newPwU);
                            fetchUser(); 
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
            }else{
                alert("Confirm password is not same")
            }
        }else{
            alert("Current password is not correct")
        }
    }else{
        console.log("err")
    }
})