$(document).ready(function() {
  smoothScroll(1000);
  workBelt();
  workLoad();
  clientBelt();

  jQuery("header h1").fitText(1, { minFontSize: '60px', maxFontSize: '72px' });
  $(".email-link").fitText(1.5);
});

// smooth scrool for nav and content of the page
function smoothScroll(delay) {
  $('a[href^="#"]').on('click', function(e) {
    var target = $( $(this).attr('href'));

    if(target.length) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: target.offset().top
      }, delay);
    }
  });
}

// transition between project thumbnails and project content
function workBelt() {
  $('.thumb-item').click(function() {
    //$('.work-belt').css('left','-100%');
    $('.work-belt').addClass('slided');
    $('.work-container').show();
  });

  $('.thumb-return').click(function() {
    //$('.work-belt').css('left','0%');
    $('.work-belt').removeClass('slided');
    $('.work-container').hide(800);
  });
}

// load project content with AJAX
function workLoad() {
  $.ajaxSetup({ cache: true });

  $('.thumb-item').click(function() {
    var spinner = "<div class='loader'>Loading...</div>";
    var newTitle = $(this).find('strong').text();
    var newFolder = $(this).data('folder');
    // SyNDS URL HERE
    var newHTML = "/home/work/" + newFolder + ".html";

    $('.project-load').html(spinner).load(newHTML);
    $('.project-title').text(newTitle);
  });
}

function clientBelt() {
  $('.client-company, .client-button').click(function() {
    var position = $(this).parent().children().index($(this));

    $('.client-item').removeClass('active').eq(position).addClass('active');
    $('.client-company').removeClass('active').eq(position).addClass('active');
    $('.client-button').removeClass('active').eq(position).addClass('active');
  });

  $('.next, .prev').click(function() {
    var curActiveClient = $('.clients-belt').find('.active');
    var position = $('.clients-belt').children().index(curActiveClient);
    var clientNum = $('.client-item').length;

    if($(this).hasClass('next')) {
      if(position < clientNum -1){
        $('.active').removeClass('active').next().addClass('active');
      } else {
        $('.client-item').removeClass('active').first().addClass('active');
        $('.client-company').removeClass('active').first().addClass('active');
        $('.client-button').removeClass('active').first().addClass('active');
      }
    } else {
      if (position === 0) {
        $('.client-item').removeClass('active').last().addClass('active');
        $('.client-company').removeClass('active').last().addClass('active');
        $('.client-button').removeClass('active').last().addClass('active');
      } else {
        $('.active').removeClass('active').prev().addClass('active');
      }
    }
  });
}

/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){
  $.fn.fitText = function( kompressor, options ) {
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){
      // Store the object
      var $this = $(this);
      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };
      // Call once to set.
      resizer();
      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);
    });
  };
})( jQuery );
