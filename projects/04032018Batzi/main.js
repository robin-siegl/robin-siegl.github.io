var containerItems = document.getElementsByClassName("day");

document.addEventListener("click", function(e) {

    for (i = 0; i < containerItems.length; i++) {

        if (e.target == containerItems[i]) {
            
            if (containerItems[i].classList.value == "day opened") {
                containerItems[i].classList.remove("opened");
                containerItems[i].classList.add("closed");
            } else {
                containerItems[i].classList.remove("closed");
                containerItems[i].classList.add("opened");
            }

        }

    }
    
})

console.log(containerItems);