document.addEventListener("scroll", event => {
    // Show or hide prfile pic in navbar
    if (document.documentElement.clientHeight / 1.25 > document.documentElement.scrollTop) {
        document.getElementById("profile-pic").classList.remove("show");
        document.getElementById("profile-pic").classList.add("hide");
    } else {
        document.getElementById("profile-pic").classList.remove("hide");
        document.getElementById("profile-pic").classList.add("show");
    }

    // Show or hide arrow to scroll to info
    if (document.documentElement.clientHeight / 1.5 < document.documentElement.scrollTop) {
        document.getElementById("scroll-to-info").classList.remove("show");
        document.getElementById("scroll-to-info").classList.add("hide");
    } else {
        document.getElementById("scroll-to-info").classList.remove("hide");
        document.getElementById("scroll-to-info").classList.add("show");
    }
})
