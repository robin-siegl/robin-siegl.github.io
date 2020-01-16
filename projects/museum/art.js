let navButton = document.getElementById("nav-button");  // navigation open-close button
let nav = document.getElementsByTagName("ul")[0];       // navigationlist

// Eventlistener for Navigation Open-Close Button
navButton.addEventListener("click", function displayNav(e) {
    
    // if classlist contains mobile-nav-displayNone -> remove this class and display navigationlist
    if (nav.classList.contains("mobile-nav-displayNone")) {
        nav.classList.remove("mobile-nav-displayNone");
        navButton.classList.add("mobile-nav-buttonOpen");

    // else -> add mobile-nav-displayNone class and hide navigationlist
    } else {
        nav.classList.add("mobile-nav-displayNone");
        navButton.classList.remove("mobile-nav-buttonOpen");
    }

});

nav.addEventListener("click", function closeNavAuto(e) {
    if (e.target.localName == "a") {
        nav.classList.add("mobile-nav-displayNone");
        navButton.classList.remove("mobile-nav-buttonOpen");
    }
});