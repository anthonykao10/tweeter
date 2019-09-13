/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  const $tweetsContainer = $('#tweets-container');
  const $userInput = $('.new-tweet textarea');
  const $counter = $('.new-tweet .counter');
  const $formSection = $('.new-tweet');
  const $form = $('.new-tweet form');
  const $formSubmit = $('.new-tweet input[type="submit"]');
  const $composeButton = $('nav .compose-button');
  const $formMessage = $('.new-tweet .form-message');

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(tweet) {
    let daysAgo = Math.round((Date.now() - tweet.created_at) / (1000 * 60 * 60 * 24));

    const $tweet = `
      <article class="tweet">
        <header>
          <div>
            <img class="display-picture" src="${tweet.user.avatars}" alt="profile">
            <span class="name">${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="content">${escape(tweet.content.text)}</p>
        <footer>
          <hr>
          <div class="tweet-time">${daysAgo} days ago</div>
          <div class="tweet-social">
            <a href="#">
              <img class="flag" src="/images/flag-solid.svg" alt="profile">
            </a>
            <a href="#">
              <img class="retweet" src="/images/retweet-solid.svg" alt="profile">
            </a>
            <a href="#">
              <img class="like" src="/images/heart-solid.svg" alt="profile">
            </a>
          </div>
        </footer>
      </article>
    `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElem = createTweetElement(tweet);
      $tweetsContainer.prepend(tweetElem);
    }
  };

  // Listener to send form data to server
  $form.submit(function(e) {
    e.preventDefault();
    // Validation
    let userInputLength = $userInput.val().length;
    if (!userInputLength) {
      $formMessage.text('Tweet is empty').slideDown();
      return;
    } else if (userInputLength > 140) {
      $formMessage.text('Character limit reached').slideDown();
      return;
    }

    $.ajax('/tweets', { 
      method: 'POST',
      data: $(this).serialize()
    })
    .then(function (data) {
      // Verify formMessage is removed
      $formMessage.slideUp();
      // Clear input
      $userInput.val('');
      // Reset counter
      $counter.text('140');
      loadTweets();
    });
  });

  // Fetch tweets
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET'
    })
    .then(function (data) {
      if (data) {
        // Clear container
        $tweetsContainer.empty();
        renderTweets(data);
      }
    });
  };

  // Form submit button animation
  $formSubmit.on('click', function() {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      setTimeout(() => {
        $(this).removeClass('active');
      }, 2000);
    }
  });

  // Show/hide form
  $composeButton.on('click', function() {
    $formSection.slideToggle(600, function() {
      // Hide arrow and focus input
      if ($formSection.css('display') === 'block') {
        $userInput.focus();
        $composeButton.find('img').fadeOut();
      // Show arrow
      } else if ($formSection.css('display') === 'none') {
        $composeButton.find('img').fadeIn();
      }
    });
  });

  // Load tweets on page load
  loadTweets();
});