$(document).ready(function(){

    // scroll to function
    // "a" tags in .scrollToContainer automatically scrolls to the id in the href attribute
    $(".scrollToContainer a").click(function(ev){
        ev.preventDefault();
        ev.stopPropagation();

        if ($("#mobile-nav-button").is(":visible")) {

            let tempLinkObject = $(this);

            $("#mobile-nav-button").html("menu").next("nav:visible").slideUp(300, function() {
                $('html, body').animate({scrollTop: $(tempLinkObject.attr('href')).offset().top}, 500);
            });

        } else {

            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
            
        }
    })
    

    $("#mobile-nav-button").click(function(ev){
        ev.stopPropagation();
        if ($(this).next("nav").is(":visible")) {
            $(this).html("menu").next("nav:visible").slideUp(300);
        } else {
            $(this).html("close").next("nav").slideDown(300);
        }
    })
})

function closeMenu(button) {
    button.html("menu").next("nav:visible").slideUp(300);
}
function openMenu(button) {
    button.html("close").next("nav").slideDown(300);
}