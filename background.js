var createNotification = function() {
    'use strict';
    var noop = function() {};
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'document';
    xhr.onload = function() {
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
    xhr.open( 'GET', 'https://twitter.com/?lang=ja' );
    xhr.send();
};

chrome.browserAction.onClicked.addListener(function() {
    'use strict';
    createNotification();
});
