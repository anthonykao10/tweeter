$(function() {

  $('.new-tweet textarea').on('input', function(e) {
    const counter = $(this).parents('.new-tweet').find('.counter');
    // Update counter
    counter.text(140 - $(this).val().length);

    if (counter.text() < 0) {
      counter.css('color', '#ff0000');
    } else {
      counter.css('color', '');
    }
  });

});