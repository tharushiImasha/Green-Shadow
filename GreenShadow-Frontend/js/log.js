function previewImageLog(event) {
    const imagePreview1 = document.getElementById('imagePreviewLogImage');
    const file = event.target.files[0];
        
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview1.src = e.target.result;
            imagePreview1.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}
