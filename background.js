var noop = function() {},
    xhr = new XMLHttpRequest(),
    MAX_COUNT = 5;
xhr.responseType = 'document';
xhr.addEventListener('load', function() {
    'use strict';
    var tweetElements = this.response.querySelectorAll( 'div.original-tweet' );
    for ( var i = 0; i < MAX_COUNT; i++ ) {
        var icon = tweetElements[i].querySelector( '.js-retweet-text' ) ? 'retweet.jpg' : 'tweet.jpg';
        var tweeter = tweetElements[i].dataset.name;
        var tweet = tweetElements[i].querySelector( 'p.js-tweet-text.tweet-text' ).innerText;
        chrome.notifications.create(
            String(i),
            {
                type: 'basic',
                iconUrl: icon,
                title: tweeter,
                message: tweet,
                buttons: [{title: 'Clear'}],
                isClickable: true
            },
            noop
        );
    }
    chrome.notifications.onButtonClicked.addListener(function() {
        for (var j = 0; j < MAX_COUNT; j++) {
            chrome.notifications.clear(String(j), noop);
        }
    });
});

chrome.browserAction.onClicked.addListener(function() {
    'use strict';
    xhr.open( 'GET', 'https://twitter.com/?lang=ja' );
    xhr.send();
});
