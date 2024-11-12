const togglePassword = document.querySelector('#toggle-password');
const toggleConfPassword = document.querySelector('#toggle-conf-password');
const passwordField = document.querySelector('#password'); 
const confirmPasswordField = document.querySelector('#confirm-password');

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