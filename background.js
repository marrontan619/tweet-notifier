/* global console */
var MAX_COUNT = 5,
    noop = function() {},
    allClear = function() {
        'use strict';
        for ( var j = 0; j < MAX_COUNT; j++ ) {
            chrome.notifications.clear( String(j), noop );
        }
    },
    tweetLink = [],
    timeoutId;
    xhr = new XMLHttpRequest(),

xhr.responseType = 'document';
xhr.addEventListener( 'load', function() {
    'use strict';
    var tweetElements = this.response.querySelectorAll('div.original-tweet');
    for ( var i = 0; i < MAX_COUNT; i++ ) {
        var icon = tweetElements[i].querySelector('.js-retweet-text') ? 'retweet.jpg' : 'tweet.jpg',
            tweeter = tweetElements[i].dataset.name,
            tweetParagraph = tweetElements[i].querySelector('p.js-tweet-text.tweet-text'),
            tweet = tweetParagraph.innerText,
            buttonItems = [{ title: 'Clear' }];
        tweetLink[i] =
            tweetElements[i].querySelector('a.twitter-timeline-link') ?
                tweetElements[i].querySelector('a.twitter-timeline-link').href : null;
        if (tweetLink[i]) {
            buttonItems.push({title: tweetLink[i]});
        }
        chrome.notifications.create(
            String(i),
            {
                type: 'basic',
                iconUrl: icon,
                title: tweeter,
                message: tweet,
                buttons: buttonItems,
                isClickable: true
            },
            noop
        );
    }
});

chrome.browserAction.onClicked.addListener(function() {
    'use strict';
    clearTimeout( timeoutId );
    xhr.open( 'GET', 'https://twitter.com/?lang=ja' );
    xhr.send();
    timeoutId = setTimeout( allClear, Math.floor( MAX_COUNT / 3 + 1 ) * 8000 );
});

chrome.notifications.onButtonClicked.addListener(function( notificationId, buttonIndex) {
    switch (buttonIndex) {
        case 0:
            allClear();
            break;
        default:
            chrome.windows.create(
                {
                    url: tweetLink[Number( notificationId )],
                    width: 500,
                    height: 400,
                    incognito: true
                },
                noop
            );
            chrome.notifications.clear( notificationId, noop );
            break;
    }
});

chrome.notifications.onClicked.addListener(function( notificationId ) {
    'use strict';
    chrome.notifications.clear( notificationId, noop );
});
