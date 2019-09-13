$(function() {

  const $formSection = $('.new-tweet');
  const $userInput = $('.new-tweet textarea');
  const $composeButton = $('nav .compose-button');

  // Character counter
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

  // Show/hide scroll-to-top button
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 0) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  // Scroll-to-top
  $('#back-to-top').on('click', function() {
    $('html').animate({scrollTop: 0});
    // Slide form open if closed
    if ($formSection.css('display') === 'none') {
      $formSection.css('display', 'block')
      $userInput.focus();
      $composeButton.find('img').fadeOut();
    }
  });

});