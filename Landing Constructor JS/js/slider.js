var mySwiper = new Swiper('.swiper-container', {
    slidesPerView:1,
    loop: true,
    navigation: {
       nextEl: '.arrow',
     },
 
     breakpoints:
    {
       540: {
         slidesPerView: 2
       }
    }
 });