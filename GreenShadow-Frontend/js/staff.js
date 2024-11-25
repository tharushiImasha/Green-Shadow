const staffForm = document.getElementById("staff_form");
const staffTableBody = document.getElementById("staff_table").querySelector('tbody');

document.getElementById("crop_update").style.display = "none"

function validateForm(){
    let commonName = document.getElementById("common_name").value;
    let scientificName = document.getElementById("scientific_name").value;
    let season = document.getElementById("season").value;
    let category = document.getElementById("category").value;
    // let image = document.getElementById("crop_image").value;

    if(commonName == ""){
        $("#commonError").text("Please enter crop common name");
        $("#common_name").css("border-color",  "red");
        return false;
    }else if (!(regexName.test($("#common_name").val()))){
        $("#commonError").text("Please enter valid name");
        $("#common_name").css("border-color",  "red");
        return false;
    }else{
        $("#commonError").text("");
        $("#common_named").css("border-color",  "rgba(0, 0, 0, 0.1)");
    }
     return true;
}