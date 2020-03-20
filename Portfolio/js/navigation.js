$(document).ready(function(){

    // scroll to function
    // "a" tags in .scrollToContainer automatically scrolls to the id in the href attribute
    $(".scrollToContainer a").click(function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
    })
    

    $("#mobile-nav-button").click(function(ev){
        ev.stopPropagation();
        if ($(this).next("nav").is(":visible")) {
            $(this).next("nav:visible").slideUp(300);
            $(this).html("menu");
        } else {
            $(this).next("nav").slideDown(300);
            $(this).html("close");
        }
    })
})