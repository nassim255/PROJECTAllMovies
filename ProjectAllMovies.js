
// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/hide the button based on the user's scroll position
window.addEventListener('scroll', () => {
    var button = document.getElementById('scrollTopButton');
    if (window.scrollY > 200) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
});

/*NAVBAR*/

var list = document.querySelector(".navbar .list ul")
var menu = document.querySelector(".navbar .profil .menu")

menu.addEventListener('click',function(){
list.classList.toggle('show')
})

document.querySelectorAll(".carousel").forEach((carousel) => {
    var items = carousel.querySelectorAll(".carousel__item");
    var buttonsHtml = Array.from(items, () => {
    return `<span class="carousel__button"></span>`;
    });
    carousel.insertAdjacentHTML(
    "beforeend",
        `
        <div class="carousel__nav">
                ${buttonsHtml.join("")}
        </div>
        `
        );
    
        var buttons = carousel.querySelectorAll(".carousel__button");
    
    buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
    items.forEach((item) =>
    item.classList.remove("carousel__item--selected")
    );
    buttons.forEach((button) =>
    button.classList.remove("carousel__button--selected")
    );
    
    items[i].classList.add("carousel__item--selected");
    button.classList.add("carousel__button--selected");
    });
    });
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");
    });

    /*SLIDER*/
    
    
    /*timer*/

    /*document.querySelectorAll(".carousel").forEach((carousel) => {
        var items = carousel.querySelectorAll(".carousel__item");
        var buttonsHtml = Array.from(items, () => {
            return `<span class="carousel__button"></span>`;
        });
        carousel.insertAdjacentHTML(
            "beforeend",
            `
            <div class="carousel__nav">
                ${buttonsHtml.join("")}
            </div>
            `
        );
    
        var buttons = carousel.querySelectorAll(".carousel__button");
        let currentIndex = 0; // Track the current item index
        var intervalDuration = 3000; // Set the interval duration in milliseconds (e.g., 3000ms = 3 seconds)
    
        function showItem(index) {
            items.forEach((item) =>
                item.classList.remove("carousel__item--selected")
            );
            buttons.forEach((button) =>
                button.classList.remove("carousel__button--selected")
            );
    
            items[index].classList.add("carousel__item--selected");
            buttons[index].classList.add("carousel__button--selected");
        }
    
        function nextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }
    
        // Automatically switch to the next item at the specified interval
        var intervalId = setInterval(nextItem, intervalDuration);
    
        // Add event listeners to pause the auto-advance on button click
        buttons.forEach((button, i) => {
            button.addEventListener("click", () => {
                clearInterval(intervalId); // Stop the auto-advance
                currentIndex = i;
                showItem(currentIndex);
            });
        });
    
        // Initialize the first item and its corresponding button as selected
        showItem(currentIndex);
    });*/
    



    /* CAROUSEL1*/
    var wrapper = document.querySelector(".wrapper");
    var carousel1 = document.querySelector(".carousel1");
    var firstCardWidth = carousel1.querySelector(".card").offsetWidth;
    var arrowBtns = document.querySelectorAll(".wrapper i");
    var carousel1Childrens = [...carousel1.children];
    
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
    
    // Get the number of cards that can fit in the carousel1 at once
    let cardPerView = Math.round(carousel1.offsetWidth / firstCardWidth);
    
    // Insert copies of the last few cards to beginning of carousel1 for infinite scrolling
    carousel1Childrens.slice(-cardPerView).reverse().forEach(card => {
        carousel1.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    
    // Insert copies of the first few cards to end of carousel1 for infinite scrolling
    carousel1Childrens.slice(0, cardPerView).forEach(card => {
        carousel1.insertAdjacentHTML("beforeend", card.outerHTML);
    });
    
    // Scroll the carousel1 at appropriate postition to hide first few duplicate cards on Firefox
    carousel1.classList.add("no-transition");
    carousel1.scrollLeft = carousel1.offsetWidth;
    carousel1.classList.remove("no-transition");
    
    // Add event listeners for the arrow buttons to scroll the carousel1 left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel1.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    
    var dragStart = (e) => {
        isDragging = true;
        carousel1.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel1
        startX = e.pageX;
        startScrollLeft = carousel1.scrollLeft;
    }
    
    var dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel1 based on the cursor movement
        carousel1.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    
    var dragStop = () => {
        isDragging = false;
        carousel1.classList.remove("dragging");
    }
    
    var infiniteScroll = () => {
        // If the carousel1 is at the beginning, scroll to the end
        if(carousel1.scrollLeft === 0) {
            carousel1.classList.add("no-transition");
            carousel1.scrollLeft = carousel1.scrollWidth - (2 * carousel1.offsetWidth);
            carousel1.classList.remove("no-transition");
        }
        // If the carousel1 is at the end, scroll to the beginning
        else if(Math.ceil(carousel1.scrollLeft) === carousel1.scrollWidth - carousel1.offsetWidth) {
            carousel1.classList.add("no-transition");
            carousel1.scrollLeft = carousel1.offsetWidth;
            carousel1.classList.remove("no-transition");
        }
    
        // Clear existing timeout & start autoplay if mouse is not hovering over carousel1
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }
    
    var autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel1 after every 2500 ms
        timeoutId = setTimeout(() => carousel1.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();
    
    carousel1.addEventListener("mousedown", dragStart);
    carousel1.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel1.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
    
    
    // SWITCHER ENTRE DARK MODE AND LIGHT MODE
    var switcher = document.querySelector(".lightmode");
    var select = [
    document.body,
    document.querySelector('#scrollTopButton'),
    document.querySelector(".navbar .logo h1"),
    document.querySelector(".navbar .list ul li p"),
    document.querySelector(".navbar input"),
    document.querySelector(".navbar i"),
    document.querySelector(".carousel .carousel__item .text"),
    document.querySelector(".carousel .carousel__item .text ul li a p"),
    document.querySelector(".carousel__button"),
    document.querySelector(".title1"),
    document.querySelector(".wrapper i"),
    document.querySelector(".footer"),
    document.querySelector(".footer .part1 ul li a h1"),
    document.querySelector(".footer .part1 ul li p"),
    document.querySelector(".footer .part2 .column1 ul li a"),
    document.querySelector(".footer .part2 .column2 ul li a"),
    document.querySelector(".footer .part2 .column3 ul li a"),
    document.querySelector(".footer .part2 .column1 .titlef p"),
    document.querySelector(".footer .part2 .column2 .titlef p"),
    document.querySelector(".copyright p"),
    document.querySelector(".creator")
    ];

    let changeIcon = function(icon)
        {
            icon.classList.toggle('bi-moon-fill');
        }
    switcher.addEventListener('click',function()
    {
        for(let i = 0;i <= 20;i++){
            console.log(i);
            select[i].classList.toggle("lightmode");
            select[i].style.transition = '1s';
        }
    })


    