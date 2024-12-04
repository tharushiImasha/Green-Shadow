function logoutUser() {
    window.location.href = "/index.html";
    localStorage.removeItem("token");
}