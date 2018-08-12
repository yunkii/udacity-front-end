$( ".menu-icon" ).click(function() {
  $(this).toggleClass('change')
  $('.sidebar').fadeToggle();
});