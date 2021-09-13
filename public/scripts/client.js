/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  timeago.render(document.querySelectorAll('.need_to_be_rendered'));

// Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').append($tweet); 
    }
  };

  const createTweetElement = function(tweetObj) {
    let $tweet = $(`
    <article name="tweet" class="tweet">
    <header>
      <p class="name"><img src="${tweetObj.user.avatars}" width="30" height="30"></img> ${tweetObj.user.name}</p>
      <p class="username">${tweetObj.user.handle}</p>
    </header>
    <output>
      <p class="tweet-message">${tweetObj.content.text}</p>
    </output>
    <footer>
      <span class="need_to_be_rendered" datetime="">${timeago.format(tweetObj.created_at)}</span>
      <div class="tweet-reaction">
        <button type="button" name="flag-tweet">
          <i class="fas fa-flag"></i>
        </button>
        <button type="button" name="retweet">
          <i class="fas fa-retweet"></i>
        </button>
        <button type="button" name="like-tweet">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </footer>
    </article>
    `);
    return $tweet;
  };

  renderTweets(data);

  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    const $form = $(this);
    const tweet = $form.serialize();
    $.ajax({ 
      url: "/tweets/",
      method: 'POST', 
      data: tweet
    })
    console.log(tweet);
  })



});