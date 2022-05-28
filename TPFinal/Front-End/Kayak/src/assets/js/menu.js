
$( document ).ready(function() {
    console.log( "ready!" );
});
$('.actionmenu').on('click', function (){
    debugger;
    $('.actionmenu').removeClass('active');   
    $(this).addClass('active');
})