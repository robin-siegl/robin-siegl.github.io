let gbl_fadeOutTimer = 1000;
let gbl_timer = 4000;
let gbl_pictureArray = new Array();
let gbl_thumbnailArray = new Array();
let gbl_sliderAutoPlay = true;
let gbl_darkMode = true;
let gbl_sliderInterval;
let gbl_thumbnailSize;

$(document).ready(function() {
    // get all pictures from slideshowcontainer
    gbl_pictureArray = Array.from(document.getElementsByClassName("img-container")[0].children);

    // remove controlls
    gbl_pictureArray.pop();

    // init thumbnails if option is enabled
    if (document.getElementsByClassName("thumbnails") != null) {
        initThumbnails();
        highlightCurrentPicture();
    }

    // set interval for slideshow
    gbl_sliderInterval = setInterval("setPicture()", gbl_timer);

    $(".controls > div:nth-child(1)").click(function() {
        slideshowAutoplay(!gbl_sliderAutoPlay);
    });

    $(".controls > div:nth-child(2)").click(function() {
        if (gbl_darkMode) {
            $(this).children().attr("src","brightness_2-24px.svg");
            document.getElementById("slider").className = "light";
        } else {
            $(this).children().attr("src","wb_sunny-24px.svg");
            document.getElementById("slider").className = "dark";
        }
        gbl_darkMode = !gbl_darkMode;
    });

    $(".controls > div:nth-child(3)").click(function() {
        gbl_thumbnailSize = document.getElementsByClassName("thumbnails")[0].className.split(" ")[1];
        document.getElementsByClassName("thumbnails")[0].classList.remove(gbl_thumbnailSize);

        switch(gbl_thumbnailSize) {
            case "big":
                document.getElementsByClassName("thumbnails")[0].classList.add("none");
                break;
            case "medium":
                document.getElementsByClassName("thumbnails")[0].classList.add("big");
                break;
            case "small":
                document.getElementsByClassName("thumbnails")[0].classList.add("medium");
                break;
            case "none":
                document.getElementsByClassName("thumbnails")[0].classList.add("small");
                break;
            default:
                console.log("ERROR: Thumbnailsize not found!");
        }
        
    });

    $(".thumbnails img").click(function() {
        handselectedPicture($(this));
    });
});

function setPicture() {
    loopPictureArray();
}

function loopPictureArray(fadeOutTimerActive = true) {
    if (!fadeOutTimerActive) {
        // remove last array item and insert it as first
        gbl_pictureArray.unshift(gbl_pictureArray.pop());
    }

    for (i = 0; i < gbl_pictureArray.length; i++) {
        gbl_pictureArray[i].style.zIndex = i + 1;

        if (gbl_pictureArray[i].style.zIndex == gbl_pictureArray.length && fadeOutTimerActive) {
            $(gbl_pictureArray[i]).fadeOut(gbl_fadeOutTimer);
        }

        $(gbl_pictureArray[i]).show();
    }

    if (fadeOutTimerActive) {
        // remove last array item and insert it as first
        gbl_pictureArray.unshift(gbl_pictureArray.pop());
    }
    highlightCurrentPicture();
}

function initThumbnails() {

    for (i = 0; i < gbl_pictureArray.length; i++) {
        let thumbnail = document.createElement("img");
        let filenameArray = gbl_pictureArray[gbl_pictureArray.length - 1 - i].children[0].src.split(".");
        thumbnail.src = filenameArray[0] + "_thumbnail." + filenameArray[1];
        document.getElementsByClassName("thumbnails")[0].appendChild(thumbnail);
    }
    gbl_thumbnailArray = Array.from(document.getElementsByClassName("thumbnails")[0].children);
    
}

function highlightCurrentPicture() {
    for (i = 0; i < gbl_thumbnailArray.length; i++) {
        let filenameArray = gbl_pictureArray[gbl_pictureArray.length - 1].children[0].src.split(".");
        if (filenameArray[0] + "_thumbnail." + filenameArray[1] == gbl_thumbnailArray[i].src) {
            gbl_thumbnailArray[i].classList.add("activePicture");
        } else {
            gbl_thumbnailArray[i].classList.remove("activePicture");
        }
    }
}

// when user wants to handpick current picture
function handselectedPicture(clickedPicture) {
    slideshowAutoplay(false);
    let checkStep = true;

    for (j = 0; j < gbl_pictureArray.length; j++) {

        let filenameArray = clickedPicture.attr("src").split(".");
        filenameArray[0] = filenameArray[0].split("_")[0];
        let fullPictureName = filenameArray[0] + "." + filenameArray[1];

        if (checkStep && fullPictureName != gbl_pictureArray[gbl_pictureArray.length - 1].children[0].src) {
            loopPictureArray(false);
        } else {
            checkStep = !checkStep;
        }

    }
}

// function when you stop autoplay
function slideshowAutoplay(state) {
    if (state) {
        $(".controls > div:first-child > img").attr("src","pause-24px.svg");
        gbl_sliderInterval = setInterval("setPicture()", gbl_timer);
    } else if (!state) {
        $(".controls > div:first-child > img").attr("src","play_arrow-24px.svg");
        clearInterval(gbl_sliderInterval);
    }
    gbl_sliderAutoPlay = state;
}