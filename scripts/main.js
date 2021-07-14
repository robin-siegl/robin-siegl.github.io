document.addEventListener("scroll", event => {
    if (document.documentElement.clientHeight > document.documentElement.scrollTop) {
        document.getElementById("profile-pic").classList.remove("show");
        document.getElementById("profile-pic").classList.add("hide");
    } else {
        document.getElementById("profile-pic").classList.remove("hide");
        document.getElementById("profile-pic").classList.add("show");
    }
})