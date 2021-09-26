/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(".new-tweet form").on("submit", onSubmit);

  loadTweets();

});

const onSubmit = function(event) {

  event.preventDefault();
  const $form = $(this);
  const data = $form.serialize();

  const newTweetTextString = $form.children('textarea').val(); // .val() GETS text area

  if (newTweetTextString.length === 0) {
    $('.new-tweet p').append("<b>Error:</b> Tweets must contain minimum one character.");
    setTimeout(() => {
      $('.new-tweet p').slideDown("slow")
        .then($('.new-tweet p').slideUp(3000));
    }, 600);
    return;
  }

  if (newTweetTextString.length > 140) {
    $('.new-tweet p').append("<b>Error:</b> Tweet maximum length is 140 characters.");
    setTimeout(() => {
      $('.new-tweet p').slideDown("slow")
        .then($('.new-tweet p').slideUp(3000));
    }, 600);
    return;
  }

  $.post("/tweets", data)
    .then(() => {
      loadTweets();
      $form.children('textarea').val("");
      $form[0].reset(); 
      $('.counter').html(140);
    });
};

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {

  const ago = timeago.format(tweetObj.created_at);

  let $tweet = $(`<article>`).addClass("tweet");

  let html = `    
    <header>
      <p class="name"><img src="${tweetObj.user.avatars}" width="30" height="30"></img> ${tweetObj.user.name}</p>
      <p class="username">${tweetObj.user.handle}</p>
    </header>
    <output>
      <p class="tweet-message">${escape(tweetObj.content.text)}</p>
    </output>
    <footer>
      <span class="need_to_be_rendered" datetime="">${ago}</span>
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
  `;

  let tweetElement = $tweet.append(html);

  return tweetElement;
};

const renderTweets = function (tweets) {
  $('#tweets-container').html('');
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (allTweets) {
      renderTweets(allTweets);
    });
};