const togglePassword = document.querySelector('#toggle-password');
const passwordField = document.querySelector('#password');

togglePassword.addEventListener('click', () => {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    
    togglePassword.classList.toggle('ri-eye-line');
    togglePassword.classList.toggle('ri-eye-off-line');
});


// function user_login(){
//     window.location.href = '/pages/Dashboard.html';
// }