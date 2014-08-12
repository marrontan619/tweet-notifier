/* global Event */
$(function() {
  'use strict';
  var storage = chrome.storage.local,
    options = document.getElementById('options'),
    maxTweet = document.getElementById('max-tweet'),
    windowWidth = document.getElementById('window-width'),
    windowHeight = document.getElementById('window-height'),
    incognito = document.getElementById('is-incognito'),
    demoWindow = document.getElementById('window-demo'),
    windowDemo = function() {
      demoWindow.style.width = windowWidth.value + 'px';
      demoWindow.style.height = windowHeight.value + 'px';
    },
    setStorageItem = function() {
    var item = {},
      maxTweetVal = Math.min( maxTweet.value, 20 ),
      windowWidthVal = Math.max( windowWidth.value, 1 ),
      windowHeightVal = Math.max( windowHeight.value, 1 ),
      isIncognito = incognito.checked;
      item['tweet-notifier'] = {
      'maxTweetVal': maxTweetVal,
      'windowWidthVal': windowWidthVal,
      'windowHeightVal': windowHeightVal,
      'isIncognito': isIncognito
      };
      storage.set(item, function() {});
    };

  options.addEventListener( 'input', setStorageItem );

  incognito.addEventListener( 'change', function() {
    var inputEvent = new Event('input');
    options.dispatchEvent( inputEvent );
  });

  windowWidth.addEventListener( 'input', windowDemo );
  windowHeight.addEventListener( 'input', windowDemo );

  storage.get( 'tweet-notifier', function( items ) {
    if ( items['tweet-notifier'] !== null ) {
      var item = items['tweet-notifier'];
      maxTweet.value = item.maxTweetVal;
      windowWidth.value = item.windowWidthVal;
      windowHeight.value = item.windowHeightVal;
      incognito.checked = item.isIncognito;
      windowDemo();
    }
  });

  // ログイン状態の判定
  var xhr = new XMLHttpRequest();
  xhr.addEventListener( 'load', function() {
    if ( this.response.querySelector('.t1-form.signin') ) {
      $('<a/>')
        .attr( 'href', 'http://twitter.com')
        .attr( 'target', '_brank' )
        .html('ログイン画面へ')
        .appendTo( $('.login-state') );
    } else if ( this.response.querySelector('a.u-textInheritColor') ) {
      $('<span/>')
        .html( this.response.querySelector('a.u-textInheritColor').innerText + 'でログインしています。' )
        .appendTo( $('.login-state') );
    }
  });
  xhr.responseType = 'document';
  xhr.open( 'POST', 'https://twitter.com/sessions' );
  xhr.send();
});
