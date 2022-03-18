/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

  var docElem = document.documentElement,
    header = document.querySelector( '.navbar.fixed-top' ),
    didScroll = false,
    changeHeaderOn = 50;

  function init() {
    let elements = $('.modal').toArray();
    elements.push(window);

    elements.forEach(function(elem) {
        elem.addEventListener( 'scroll', function( event ) {
          if( !didScroll ) {
            didScroll = true;
            setTimeout(scrollPage(elem), 50);
          }
        }, false );
    });
  }

  function scrollPage(elem) {
    var sy = scrollY(elem);
    headerModal = $( '.modal.show .navbar.fixed-top' );

    if (sy >= changeHeaderOn) {
      $(header).addClass('navbar-shrink');
      headerModal.addClass('navbar-shrink');
    } else {
      $(header).removeClass('navbar-shrink');
      headerModal.removeClass('navbar-shrink');
    }
    didScroll = false;
  }

  function scrollY(elem) {
    return $(elem).scrollTop() || docElem.scrollTop;
  }

  init();

})();