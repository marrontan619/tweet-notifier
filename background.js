var noop = function() {};
var xhr = new XMLHttpRequest();
xhr.responseType = 'document';
xhr.onload = function() {
    'use strict';
    var tweetElements = this.response.querySelectorAll( 'div.original-tweet' );
    for ( var i = 0; i < 5; i++ ) {
        var icon = tweetElements[i].querySelector( '.js-retweet-text' ) ? 'retweet.jpg' : 'tweet.jpg';
        var tweeter = tweetElements[i].dataset.name;
        var tweet = tweetElements[i].querySelector( 'p.js-tweet-text.tweet-text' ).innerText;
        chrome.notifications.create(
            '',
            {
                type: 'basic',
                iconUrl: icon,
                title: tweeter,
                message: tweet,
                isClickable: true
            },
            noop
        );
    }
};

chrome.browserAction.onClicked.addListener(function() {
    'use strict';
    xhr.open( 'GET', 'https://twitter.com/?lang=ja' );
    xhr.send();
});
