/* use as handler for resize*/
$(window).resize(adjustLayout);
/* call function in ready handler*/
$(document).ready(function(){
    adjustLayout();
    /* your other page load code here*/
})

function adjustLayout(){
    $('#signin-form').css({
        position:'absolute',
        top: ($(window).height() - $('#signin-form').height())/2
    });
}