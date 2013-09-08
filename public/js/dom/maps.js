$(document).ready(function(){
  $('#maps-tabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });
  $('#maps-tabs a:first').tab('show')
});