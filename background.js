var createNotification = function() {
    'use strict';
    var noop = function() {};
    var xhr = new XMLHttpRequest();
    var item = [];
    xhr.responseType = 'document';
    xhr.onload = function() {
        var tweetElements = this.response.querySelectorAll( 'div.original-tweet' );
        for ( var i = 0; i < 5; i++ ) {
            item[i] = {
                title: tweetElements[i].dataset.name,
                message: tweetElements[i].querySelector( 'p.js-tweet-text.tweet-text' ).innerText
            };
        }
        chrome.notifications.create(
            '',
            {
                type: 'list',
                title: 'tweet',
                message: 'contents',
                iconUrl: './icon.png',
                items: item,
                isClickable: true
            },
            noop
        );
    };
    xhr.open( 'GET', 'https://twitter.com/?lang=ja' );
    xhr.send();
};

chrome.browserAction.onClicked.addListener(function() {
    'use strict';
    createNotification();
});
