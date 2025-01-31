function getstarted(){
    window.location.href = "/login";
}

function showLoader() {
    document.getElementById("loader").style.display = "flex";
}
function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

setTimeout(hideLoader, 6000);
