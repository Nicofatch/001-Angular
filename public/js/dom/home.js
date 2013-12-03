//==================== Slider js ========================//

$(document).ready(function(){
    /*$('#main-slider').flexslider({
        animation: "fade",
        slideshowSpeed: 7000
    });*/

    locationAutocomplete($('#l'));
    tagAutocomplete($('#k'));
    var hp = ['hp1.jpg','hp2.jpg'];
    $('.home-slider-top').css('background-image','url(../img/'+hp[Math.floor(Math.random() * hp.length)]+')');
    $('.home-slider-top').css('background-position','center');
    $('.home-slider-top').css('background-repeat','no-repeat');

});