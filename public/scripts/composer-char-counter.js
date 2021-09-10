$(document).ready(function() {

  $(".new-tweet").on('input', function() {    
    let input = $(this);    
    let form = input.closest('form');    
    let counter = form.find('.counter')
    let newTweet = $(this).val().length;
    let charactersLeft = 140 - newTweet;    
    counter.html(charactersLeft);
    if (newTweet > 140) {
      counter.addClass('tweetTooLong');
    } else if (newTweet <= 140) {
      counter.removeClass('tweetTooLong');
    }
  });


 });



