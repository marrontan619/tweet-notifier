var maxCount,
  windowWidth,
  windowHeight,
  isIncognito,
  notificationIds = [],
  tweetLinks = [],
  itemCounter = 0,
  timeoutId,
  xhr = new XMLHttpRequest(),
  noop = function() {},
  allClear = function() {
    'use strict';
    notificationIds.forEach(function( id ) {
      chrome.notifications.clear( id, noop );
    });
  },
  setProperties = function() {
    'use strict';
    chrome.storage.local.get( 'tweet-notifier', function( items ) {
      var item = items['tweet-notifier'];
      maxCount = item.maxTweetVal;
      windowWidth = item.windowWidthVal;
      windowHeight = item.windowHeightVal;
      isIncognito = item.isIncognito;
      notificationIds.length = maxCount;
    });
  };

xhr.responseType = 'document';
xhr.addEventListener( 'load', function() {
  'use strict';
  var tweetElements = this.response.querySelectorAll('div.original-tweet');
  for ( var i = 0; i < maxCount; i++ ) {
    notificationIds[i] = String( itemCounter++ );
    var isRetweet = tweetElements[i].querySelector('.js-retweet-text'),
      icon = isRetweet ? 'retweet.jpg' : 'tweet.jpg',
      retweeter = isRetweet ? isRetweet.innerText : null,
      tweeter = tweetElements[i].dataset.name,
      tweetParagraph = tweetElements[i].querySelector('p.js-tweet-text.tweet-text'),
      tweet = tweetParagraph.innerText,
      tweetLink = null,
      buttonItems = [{ title: 'Clear' }];
    tweetLink =
      tweetElements[i].querySelectorAll('a.twitter-timeline-link') ?
        tweetElements[i].querySelectorAll('a.twitter-timeline-link') : null;
    if ( tweetLink ) {
      for ( var j = 0; j < tweetLink.length; j++ ) {
        buttonItems.push({ title: tweetLink[j].href });
        tweetLinks[itemCounter++] = tweetLink[j].href;
      }
    }
    chrome.notifications.create(
      notificationIds[i],
      {
        type: 'basic',
        iconUrl: icon,
        title: tweeter,
        message: tweet,
        contextMessage: retweeter,
        buttons: buttonItems,
        isClickable: true
      },
      noop
    );
  }
});

chrome.browserAction.onClicked.addListener(function() {
  'use strict';
  itemCounter = 0;
  setProperties();
  clearTimeout( timeoutId );
  xhr.open( 'GET', 'https://twitter.com/?lang=ja' );
  xhr.send();
  timeoutId = setTimeout( allClear, Math.floor( maxCount / 3 + 1 ) * 8000 );
});

chrome.notifications.onButtonClicked.addListener(function( notificationId, buttonIndex ) {
  'use strict';
  switch ( buttonIndex ) {
    case 0:
      allClear();
      break;
    default:
      chrome.windows.create(
        {
          url: tweetLinks[Number(notificationId) + buttonIndex],
          width: windowWidth,
          height: windowHeight,
          incognito: isIncognito
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

chrome.runtime.onInstalled.addListener(function() {
  'use strict';
  chrome.storage.local.get( 'tweet-notifier', function( items ) {
    if ( items['tweet-notifer'] !== null ) {
      chrome.storage.local.set({
        'tweet-notifier': {
          'maxTweetVal': 5,
          'windowWidthVal': 500,
          'windowHeightVal': 400,
          'isIncognito': true
        }
      });
    }
  });
});
