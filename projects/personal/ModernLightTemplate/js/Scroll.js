// get document height
const documentHeight = document.documentElement.scrollHeight;

// get section elements by id
const divNew = document.getElementById("new");
const divAbout = document.getElementById("about");
const divLocation = document.getElementById("location");
const divContact = document.getElementById("contact");

// get link elements by id
const divScrollbar = document.getElementById("scrollbar");

// nav button and list
const navButton = document.getElementById("navButton");
const navList = document.getElementById("navList");
let navVisible = false;

// change headline when div is visible for the user
const onScrollActive = (element) => {
	// remove class from every item
	divNew.classList.remove("on-scroll-active");
	divAbout.classList.remove("on-scroll-active");
	divLocation.classList.remove("on-scroll-active");
	divContact.classList.remove("on-scroll-active");
	
	// add class to current target
	element.classList.add("on-scroll-active");
}

// change headline when div is visible for the user
const changeHeadlineOnScroll = () => {
	// check if user can see div
	if (120 < divNew.getBoundingClientRect().bottom) {
		onScrollActive(divNew);
	} else if (120 < divAbout.getBoundingClientRect().bottom) {
		onScrollActive(divAbout);
	} else if (120 < divLocation.getBoundingClientRect().bottom) {
		onScrollActive(divLocation);
	} else if (120 < divContact.getBoundingClientRect().bottom) {
		onScrollActive(divContact);
	}
}

changeHeadlineOnScroll();
	
// scroll eventlistener
document.addEventListener("scroll", function(e) {
	let divWidth = (100 / (documentHeight - window.innerHeight)) * window.scrollY;
	divScrollbar.style.width = divWidth + "%";
	
	// check if user can see div
	changeHeadlineOnScroll();
});

navButton.addEventListener("click", function(e) {
	if (navVisible) {
		navList.classList.remove("openNav");
		navButton.classList.remove("animateSVG");
		navVisible = false;
	} else if (!navVisible) {
		navList.classList.add("openNav");
		navButton.classList.add("animateSVG");
		navVisible = true;
	}
});