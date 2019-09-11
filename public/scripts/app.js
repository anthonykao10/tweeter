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

  const createTweetElement = function(tweet) {
    // let $tweet = $('<article>').addClass('tweet');

    // Create display picture
    // let $displayPicture = $('<img>').addClass('display-picture').attr('src', tweet.user.avatars);


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
        <p class="content">${tweet.content.text}</p>
        <footer>
          <hr>
          <div class="tweet-time">${daysAgo} days ago</div>
          <div class="tweet-social">
            <a href="#">flag</a>
            <a href="#">retweet</a>
            <a href="#">like</a>
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
    // console.log($(this).serialize());

    // Validation
    let userInputLength = $userInput.val().length;
    if (!userInputLength) {
      alert('please enter something...');
      return;
    } else if (userInputLength > 140) {
      alert('too much!');
    }

    $.ajax('/tweets', { 
      method: 'POST',
      data: $(this).serialize()
    })
    .then(function (data) {
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
  
  loadTweets();

  // Form button animation
  $formSubmit.on('click', function() {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      setTimeout(() => {
        $(this).removeClass('active');
      }, 2000);
    }
  });

  $composeButton.on('click', function() {
    $formSection.slideToggle(600);
  });

});