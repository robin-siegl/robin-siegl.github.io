var counter = 0;

$(document).ready(function(){

	// switch info container Headline
	$("section.info > div").hide();
	switchHeadline();
	setInterval("switchHeadline()", 4000);

	$(window).scroll(function(){
		// Highlight current navigation position
		if ($("section#sectionProjects").position().top - 150 <= $(window).scrollTop()) {
			$("header > * > nav li:last-of-type a").addClass("active");
			$("header > * > nav li:first-of-type a").removeClass("active");
		} else if ($("section#sectionIntroduction").position().top - 150 <= $(window).scrollTop()) {
			$("header > * > nav li:first-of-type a").addClass("active");
			$("header > * > nav li:last-of-type a").removeClass("active");
		} else if ($("nav li:first-of-type a").hasClass("active")) {
			$("header > * > nav li:first-of-type a").removeClass("active");
		} else if ($("nav li:last-of-type a").hasClass("active")) {
			$("header > * > nav li:last-of-type a").removeClass("active");
		}

		// make header compact after the first section
		if ($("section#sectionIntroduction").position().top - 150 <= $(window).scrollTop()) {
			$("header").addClass("compact-header");
		} else if ($("header").hasClass("compact-header")) {
			$("header").removeClass("compact-header");
		}

		// animate footer when visible
		if ($("footer").position().top - 200 <= $(window).scrollTop()) {
			$("footer").addClass("animate");
		} else if ($("footer").position().top - $(window).height() >= $(window).scrollTop() && $("footer").hasClass("animate")) {
			$("footer").removeClass("animate");
		}
	})
})

// switch info container headline
function switchHeadline() {
	$("section.info > div").each(function(i){
		if (counter == i) {
			$(this).fadeIn(500);
		} else {
			$(this).fadeOut(200);
		}
	});
	if ($("section.info > div").length - 1 > counter) {
		counter++;
	} else {
		counter = 0;
	}
}