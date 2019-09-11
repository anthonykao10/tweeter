/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  const createTweetElement = function(tweet) {
    // let $tweet = $('<article>').addClass('tweet');

    // Create display picture
    // let $displayPicture = $('<img>').addClass('display-picture').attr('src', );

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
      $('#tweets-container').append(tweetElem);
    }
  };


  // Listener to send form data to server
  $('.new-tweet form').submit(function(e) {
    e.preventDefault();
    // console.log($(this).serialize());

    // Validation
    let userInputLength = $('.new-tweet textarea').val().length;
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
      // console.log('Success: ', data);
      loadTweets();
    });
  });

  // Fetch tweets
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET'
    })
    .then(function (data) {
      $('#tweets-container').empty();
      if (data) renderTweets(data);
    });
  };
  
  loadTweets();

  // Form button animation
  $('.new-tweet input[type="submit"]').on('click', function() {
    $(this).toggleClass('active');
  });

});