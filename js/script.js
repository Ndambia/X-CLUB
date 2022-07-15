let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () =>{
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
};

window.onscroll = () =>{
   menu.classList.remove('fa-times');
   navbar.classList.remove('active');
};

var swiper = new Swiper(".home-slider", {
   loop:true,
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper(".reviews-slider", {
   grabCursor:true,
   loop:true,
   autoHeight:true,
   spaceBetween: 20,
   breakpoints: {
      0: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
   },
});

let loadMoreBtn = document.querySelector('.packages .load-more .btn');
let currentItem = 3;

loadMoreBtn.onclick = () =>{
   let boxes = [...document.querySelectorAll('.packages .box-container .box')];
   for (var i = currentItem; i < currentItem + 3; i++){
      boxes[i].style.display = 'inline-block';
   };
   currentItem += 3;
   if(currentItem >= boxes.length){
      loadMoreBtn.style.display = 'none';
   }
}

function dxSimpleSlider(element = '#dx-slider', auto = false, pause) {

   // Get parent element
   var $this = $(element);

   // Slides container
   var slidesCont = $this.children('.slides-container');
   // Get all slides
   var slides = slidesCont.children('.slide');

   // Get pager div
   var pager = $this.children('.pager');

   // Get Previous / Next links
   var arrowsCont = $this.children('.arrows');
   var prevSlide = arrowsCont.children('.prev');
   var nextSlide = arrowsCont.children('.next');

   // Total slides count
   var slidesCount = slides.length;

   // Set currentSlide to first child
   var currentSlide = slides.first();
   var currentSlideIndex = 1;

   var autoPlay = null;

   // Hide all slides except first and add active class to first
   slides.not(':first').css('display', 'none');
   currentSlide.addClass('active');

   // Function responsible for fading to next slide
   function fadeNext() {
       currentSlide.removeClass('active').fadeOut(700);

       if(currentSlideIndex == slidesCount) {
           currentSlide = slides.first();
           currentSlide.delay(500).addClass('active').fadeIn(700);
           currentSlideIndex = 1;
       } else {
           currentSlideIndex++;
           currentSlide = currentSlide.next();
           currentSlide.delay(500).addClass('active').fadeIn(700);
       }

       pager.text(currentSlideIndex+' / '+slidesCount);
   }

   // Function responsible for fading to previous slide
   function fadePrev() {
       currentSlide.removeClass('active').fadeOut(700);

       if(currentSlideIndex == 1) {
           currentSlide = slides.last();
           currentSlide.delay(500).addClass('active').fadeIn();
           currentSlideIndex = slidesCount;
       } else {
           currentSlideIndex--;
           currentSlide = currentSlide.prev();
           currentSlide.delay(500).addClass('active').fadeIn(700);
       }

       pager.text(currentSlideIndex+' / '+slidesCount);
   }

   // Function that starts the autoplay and resets it in case user navigated (clicked prev or next)
   function AutoPlay() {
       clearInterval(autoPlay);

       if(auto == true)
           autoPlay = setInterval(function() {fadeNext()}, pause);
   }

   // Detect if user clicked on arrow for next slide and fade next slide if it did
   $(nextSlide).click(function(e) {
       e.preventDefault();
       fadeNext();
       AutoPlay();
   });

   // Detect if user clicked on arrow for previous slide and fade previous slide if it did
   $(prevSlide).click(function(e) {
       e.preventDefault();
       fadePrev();
       AutoPlay();
   });

   // Start autoplay if auto is set to true
   AutoPlay();

}

$(function() {
   dxSimpleSlider('#slider', true, 4000);
});
