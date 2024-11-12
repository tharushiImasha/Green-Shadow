function previewImage1(event) {
    const imagePreview1 = document.getElementById('imagePreviewF1');
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

function previewImage2(event) {
    const imagePreview2 = document.getElementById('imagePreviewF2');
    const file = event.target.files[0];
        
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview2.src = e.target.result;
            imagePreview2.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}