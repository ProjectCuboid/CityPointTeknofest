function getstarted(){
    window.location.href = "/login";
}

function showLoader() {
    document.getElementById("loader").style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
}
function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";
}
setTimeout(hideLoader, 5000);
