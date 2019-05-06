jQuery(function(){

objectFitImages(null, {watchMQ: true});

setBaseElementsStyles();
function setBaseElementsStyles() {
  setResponsiveFunction([
    {
      func: function() {
        $('.video-elem').setProportionalSize({ ratio: 315/560 });

        $('.topic-full-window').css({
          'height': function() {
            var defaultHeight = $(window).height() - $('.topBar-main').outerHeight();
            var minHeight = $('.topic-full-window-content').outerHeight() + 160;
            return defaultHeight > minHeight ? defaultHeight : minHeight;
          },
        });

        setTimeout(function() {
          $('.gallery-item-img img').setProportionalSize({ ratio: 360/255 });
          $('.gallery-item-img.wide-img img').setProportionalSize({ ratio: 360/550 });
          $('.gallery-preview-extra').css('height', $('.gallery-item-img img').height() + 'px');
        },10);

        $('.shop-item-display, .testimonials-item img').setProportionalSize();
      }
    },
    {
      maxWidth: 480,
      func: function() {
        $('.cart-display').setProportionalSize();
      },
    },
    {
      maxWidth: 640,
      func: function() {
        var topBarWrapHeight = $('.topBar-wrap').outerHeight();
        $('.account-labels-wrap').css({
          'margin-top': topBarWrapHeight - 8 + 'px',
        });

        var topBarMainHeight = $('.account-labels-wrap').length != 0 ? $('.topBar-main').outerHeight() : topBarWrapHeight;
        $('[data-first-block]').css({
          'padding-top': topBarMainHeight + 20 + 'px',
        });

        $('.love-story-content img').setProportionalSize({ ratio: 0.6 });
      }
    },
    {
      minWidth: 640,
      func: function() {
        var topBarWrapHeight = $('.topBar-wrap').outerHeight();
        $('.account-labels-wrap').css({
          'margin-top': topBarWrapHeight - 24 + 'px',
        });

        var topBarMainHeight = $('.account-labels-wrap').length != 0 ? $('.topBar-main').outerHeight() : topBarWrapHeight;
        $('[data-first-block]').css({
          'padding-top': topBarMainHeight + 40 + 'px',
        });

        $('.love-story-content img').setProportionalSize();
      }
    },
    {
      maxWidth: 1024,
      func: function() {
        setTimeout(function() {
          $('.chat-now-list').css({
            height: function() {
              var extraPadding = parseFloat($('.chat-now-list .mCSB_container').css('padding-top'));
              var itemHeight = $('.chat-now-item').outerHeight();
              var itemMargin = parseFloat($('.chat-now-item').css('margin-bottom'));
              var countItems = 3;
              return extraPadding + itemHeight * countItems + itemMargin * (countItems - 1) + 4 + 'px';
            }
          });
        }, 10);

        $('.cart-details-item:first-child').removeAttr('style');
      },
    },
    {
      minWidth: 480,
      maxWidth: 1024,
      func: function() {
        $('.cart-display').removeAttr('style');
      },
    },
    {
      minWidth: 1024,
      func: function() {
        setTimeout(function() {
          $('.account-labels-wrap').removeAttr('style');
          $('[data-first-block]').css({
            'padding-top': $('.topBar-main').outerHeight() + 40 + 'px',
          });

          $('.chat-now-list').css({
            height: function() {
              var extraPadding = parseFloat($('.chat-now-list .mCSB_container').css('padding-top'));
              var itemHeight = $('.chat-now-item').outerHeight();
              var itemMargin = parseFloat($('.chat-now-item').css('margin-bottom'));
              var heightSample = $('.chat-now').siblings().outerHeight() * 0.75;
              var countItems = Math.max(3, Math.round(heightSample / (itemHeight + itemMargin)));
              return extraPadding + itemHeight * countItems + itemMargin * (countItems - 1) + 4 + 'px';
            },
          });
        }, 10);

        $('.cart-display').setProportionalSize();
        $('.cart-details-item:first-child').css('height', $('.cart-display').outerHeight() + 'px');
      },
    },
  ]);
}

/*** Preloader ***/

$(window).on('load', function() {
  $('[data-preloader]').fadeOut(300);
});

/*** Header Functions ***/

$('[data-submenu-button]').on('click', function(event) {
  $('[data-submenu-button]').not(event.currentTarget).closest('[data-submenu-wrap]').find('.topBar-submenu-wrap').addClass('is-hidden');
  $('[data-submenu-button]').not(event.currentTarget).find('.icon').removeClass('rotate-icon');
  $(event.currentTarget).find('.icon, .fa').toggleClass('rotate-icon');

  var root = $(event.target).closest('[data-submenu-wrap]');
  if ( root.find('.topBar-submenu-wrap').hasClass('is-hidden') ) {
    root.find('.topBar-submenu-wrap').removeClass('is-hidden');
    root.find('.topBar-submenu').addClass('slide-in-up');
    setTimeout(function() {
      root.find('.topBar-submenu').removeClass('slide-in-up');
    }, 500);
  } else {
    root.find('.topBar-submenu').addClass('slide-out-down');
    setTimeout(function() {
      root.find('.topBar-submenu').removeClass('slide-out-down');
      root.find('.topBar-submenu-wrap').addClass('is-hidden');
    }, 500);
  }
});

$('[data-submenu-hover-button]').on('mouseenter', function(event) {
  $('[data-submenu-hover-button]').not(event.currentTarget).closest('[data-submenu-hover-wrap]').find('.topBar-submenu-wrap').addClass('is-hidden');
  $('[data-submenu-hover-button]').not(event.currentTarget).find('.icon').removeClass('rotate-icon');
  $(event.currentTarget).find('.icon, .fa').addClass('rotate-icon');

  var root = $(event.target).closest('[data-submenu-hover-wrap]');
  root.find('.topBar-submenu-wrap').removeClass('is-hidden');
  root.find('.topBar-submenu').addClass('fade-in');
  setTimeout(function() {
    root.find('.topBar-submenu').removeClass('fade-in');
  }, 500);
});

$('[data-submenu-hover-wrap]').on('mouseleave', function(event) {
  $(event.currentTarget).find('.icon, .fa').removeClass('rotate-icon');

  var root = $(event.target).closest('[data-submenu-hover-wrap]');
  root.find('.topBar-submenu').addClass('fade-out');
  setTimeout(function() {
    root.find('.topBar-submenu').removeClass('fade-out');
    root.find('.topBar-submenu-wrap').addClass('is-hidden');
  }, 500);
});

$('[data-open-innermenu]').on('click', function(e) {
  var self = $(e.currentTarget);
  self.find('.hamburger').toggleClass('is-opened');
  $('body').toggleClass('is-noscroll');
  var ANIM_DURATION = 400;

  var menu = $('.topBar-innermenu-absolute');
  if ( menu.css('display') == 'none' ) {
    $('.topBar-main').addClass('is-innermenu-open');
    menu.removeClass('is-hidden').css('height', '0');
    menu.animate({
      height: $(window).height() - $('.topBar-main-inner').outerHeight() + 'px',
    }, {
      duration: ANIM_DURATION,
      // complete: function() {
      // },
    });
  } else {
    menu.animate({
      height: 0,
    }, {
      duration: ANIM_DURATION,
      complete: function() {
        $('.topBar-main').removeClass('is-innermenu-open');
        menu.addClass('is-hidden');
      },
    });
  }
});

$(window).on('scroll', function() {
  if ( $(document).scrollTop() > 0 ) {
    $('.topBar-wrap').addClass('is-scrolled');
  } else {
    $('.topBar-wrap').removeClass('is-scrolled');
  }
});

/*** Footer Functions ***/

$('[data-up-button]').on('click', function() {
  $('body, html').animate({scrollTop: 0}, 500);
});

/*** Form Functions ***/

$('[data-form-popup]').on('submit', function(e) {
  e.preventDefault();

  var form = $(e.currentTarget);
  var wrap = form.closest('.popup-container');
  var title = wrap.find('[data-success-title]');
  var successMassage = wrap.find('[data-success-message]');

  title.attr( 'data-default-title', title.html() );
  title.html( title.attr('data-success-title') );
  form.addClass('is-hidden');
  successMassage.removeClass('is-hidden');
});

$('[data-form-inpage]').on('submit', function(e) {
  e.preventDefault();

  var popupWrap = $('[data-popup-id="success-message"]');
  popupWrap.removeClass('is-hidden');
  popupWrap.find('.popup-window').addClass('fade-in');
  setTimeout(function() {
    popupWrap.find('.popup-window').removeClass('fade-in');
  }, 500);
});

//--- Form elements

$('select').selectmenu({
  classes: {
    'ui-selectmenu-button': 'select-main-btn',
    'ui-selectmenu-button-closed': 'select-main-btn-closed',
    'ui-selectmenu-button-open': 'select-main-btn-open',
    'ui-selectmenu-text': 'select-main-text',
    'ui-selectmenu-icon': 'select-main-icon',
    'ui-selectmenu-menu': 'select-main-menu',
    'ui-selectmenu-open': 'select-main-menu-open',
    'ui-selectmenu-optgroup': 'select-main-group',
  },
  position: {
    my: "left top+10",
  },
  open: function() {
    $('.select-main-menu').mCustomScrollbar({
      axis: "y",
      theme: "main",
    });
  },
});

$('select[data-select-nowrap]').selectmenu({
  classes: {
    'ui-selectmenu-button': 'select-nowrap-btn',
    'ui-selectmenu-button-closed': 'select-nowrap-btn-closed',
    'ui-selectmenu-button-open': 'select-nowrap-btn-open',
    'ui-selectmenu-text': 'select-nowrap-text',
    'ui-selectmenu-icon': 'select-nowrap-icon',
    'ui-selectmenu-menu': 'select-main-menu',
    'ui-selectmenu-open': 'select-main-menu-open',
    'ui-selectmenu-optgroup': 'select-main-group',
  },
  position: {
    my: "right+20 top+20",
  },
  open: function() {
    $('.select-main-menu').mCustomScrollbar({
      axis: "y",
      theme: "main",
    });
  },
});

$('input[type="checkbox"]').checkboxradio({
  classes: {
    'ui-checkboxradio': 'checkbox-main',
    'ui-checkboxradio-label': 'checkbox-main-label',
    'ui-checkboxradio-checked': 'checkbox-main-checked',
    'ui-checkboxradio-icon': 'checkbox-main-icon',
    'ui-checkboxradio-icon-space': 'checkbox-main-icon-space',
  },
});

$('input[type="checkbox"][data-checkbox-secondary]').checkboxradio({
  classes: {
    'ui-checkboxradio': 'checkbox-main',
    'ui-checkboxradio-label': 'checkbox-main-label checkbox-secondary',
    'ui-checkboxradio-checked': 'checkbox-main-checked',
    'ui-checkboxradio-icon': 'checkbox-main-icon',
    'ui-checkboxradio-icon-space': 'checkbox-main-icon-space',
  },
});

/*$('input[type="radio"]').checkboxradio({
  classes: {
    'ui-checkboxradio': 'radio-main',
    'ui-checkboxradio-label': 'radio-main-label',
    'ui-checkboxradio-checked': 'radio-main-checked',
    'ui-checkboxradio-radio-label': 'radio-main-radio-label',
    'ui-checkboxradio-icon': 'radio-main-icon',
    'ui-checkboxradio-icon-space': 'radio-main-icon-space',
  },
});
*/
$('.datepicker').datepicker();

//--- File Upload Button

$( ".file-upload" ).each(function() {
  var fileUploadWrapper = $( this ),
      fileUploadInput = fileUploadWrapper.find( "input" ),
      fileUploadBtn = fileUploadWrapper.find( ".file-upload-btn" ),
      fileUploadLbl = fileUploadWrapper.find( ".file-upload-mark" );

  fileUploadInput.focus(function(){
    fileUploadWrapper.addClass( "is-focus" );
  }).blur(function(){
    fileUploadWrapper.removeClass( "is-focus" );
  });

  var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

  fileUploadInput.change(function(){
    var file_name;
    if( file_api && fileUploadInput[ 0 ].files[ 0 ] )
    file_name = fileUploadInput[ 0 ].files[ 0 ].name;
    else
    file_name = fileUploadInput.val().replace( "C:\\fakepath\\", '' );

    if( ! file_name.length )
    return;

    if( fileUploadLbl.length != 0 ){
      fileUploadLbl.text( file_name );
    }else
    fileUploadBtn.find('span').text( file_name );
  }).change();

  $( window ).resize(function(){
    fileUploadInput.triggerHandler( "change" );
  });
});

//--- Show success message
$('form').on('submit', function(e) {
  e.preventDefault();

  var self = $(e.currentTarget);
  var containerHeight = self.outerHeight();
  var title = self.find('[data-form-success-title]');
  var oldTitleText = title.html();
  var message = self.find('[data-form-success-massage]');
  var formElems = self.find('[data-form-elements]');

  self.css('height', containerHeight + 'px');
  title.html( title.attr('data-form-success-title') );
  message.removeClass('is-hidden');
  formElems.addClass('is-hidden');

  setTimeout(function() {
    title.html( oldTitleText );
    message.addClass('is-hidden');
    formElems.removeClass('is-hidden');
  }, 10000);
});

/*** General Widgets Functions ***/

//--- On-page Links
$('[data-link-on-page]').on('click', function(event) {
  event.preventDefault();

  var scrollTo = $( $(event.currentTarget).attr('href') ).offset().top;
  $('body, html').animate({scrollTop: scrollTo}, 500);
});

//--- Spoiler
$('[data-spoiler-button]').on('click', function(event) {
  var self = $(event.currentTarget);
  var wrap = self.closest('[data-spoiler-wrap]');
  wrap.toggleClass('is-opened');
  wrap.find('[data-spoiler-content]').slideToggle(400);
  wrap.find('[data-spoiler-icon="arrow"]').toggleClass('rotate-icon');
  wrap.find('[data-spoiler-icon="arrow-right"]').toggleClass('rotate-icon-90');
  var iconPlus = wrap.find('[data-spoiler-icon="plus"]');
  if ( iconPlus.find('.icon-plus').length != 0 ) {
    iconPlus.html('<svg class="icon icon-minus"><use xlink:href="icons/symbol-defs.svg#icon-minus"></use></svg>');
  } else {
    iconPlus.html('<svg class="icon icon-plus"><use xlink:href="icons/symbol-defs.svg#icon-plus"></use></svg>');
  }
});

var isSpoilerMobileEventSet;
setResponsiveFunction({
  maxWidth: 1024,
  func: function() {
    if ( !isSpoilerMobileEventSet ) {
      $('[data-spoiler-mobile-button]').on('click', function(event) {
        $(event.currentTarget).toggleClass('is-active');
        $(event.currentTarget).closest('[data-spoiler-mobile-wrap]').find('[data-spoiler-mobile-content]').slideToggle(400);
        $(event.currentTarget).closest('[data-spoiler-mobile-wrap]').find('[data-spoiler-mobile-icon="arrow"]').toggleClass('rotate-icon');
      });
      isSpoilerMobileEventSet = true;
    }
  },
  funcAlternate: function() {
    $('[data-spoiler-mobile-button]').removeClass('is-active').off('click');
    $('[data-spoiler-mobile-content]').removeAttr('style');
    $('[data-spoiler-mobile-icon]').removeClass('rotate-icon');
    isSpoilerMobileEventSet = false;
  },
});

//--- Pop Up
$('[data-popup-button]').on('click', function(e) {
  popupOpen(e);
});
$('[data-popup-close]').on('click', function(e) {
  popupClose(e);
});

$('[data-popup-bg-close]').on('click', function(e) {
  if ( $(e.target).is('[data-popup-bg-close]') ) {
    popupClose(e);
  }
});

function popupOpen(e) {
  var eventId = $(e.currentTarget).attr('data-popup-id');
  var wrap = $('.popup-wrap[data-popup-id=' + eventId + ']');
  wrap.removeClass('is-hidden');
  wrap.find('.popup-window').addClass('fade-in');
  setTimeout(function() {
    wrap.find('.popup-window').removeClass('fade-in');
  }, 500);
}
function popupClose(e) {
  var wrap = $(e.currentTarget).closest('.popup-wrap');
  wrap.find('.popup-window').addClass('fade-out');
  setTimeout(function() {
    wrap.find('.popup-window').removeClass('fade-out');
    wrap.addClass('is-hidden');
    var title = wrap.find('[data-default-title]');
    title.html( title.attr('data-default-title') );
    wrap.find('[data-success-message]').addClass('is-hidden');
    wrap.find('form').removeClass('is-hidden');
  }, 500);
}

//--- Text overflow - Fixed height
setResponsiveFunction({
  func: function() {
    $('[data-text-overflow-fixed-height]').each(function(index,item) {
      $(item).css({ height: 'auto' });
      $(item).css({
        height: function() {
          var lineHeight = parseFloat( $(item).css('line-height') );
          var height = $(item).height();
          return height - ( height % lineHeight );
        }
      });
    });
  },
});

//--- Load new content
$('[data-load-more-btn]').on('click', function(e) {
  var target = $(e.currentTarget);
  $.ajax({
    url: target.attr('data-load-more-url'),
    type: 'GET',
    dataType: 'html',
    // async: false,
    cache: false,
    processData: false,
    contentType: false,
    success: function(data) {
      target.closest('[data-load-more-wrap]').find('[data-load-more-content]').append(data);
      setBaseElementsStyles();
    },
    error: function() {
      var oldHtml = target.html();
      target.html("Ошибка");
      setTimeout(function(){
        target.html( oldHtml );
      }, 5000);
    },
  });
});

//--- Play video
$('[data-video-play]').on('click', function(e) {
  var self = $(e.currentTarget);
  self.closest('[data-video-cover]').addClass('is-hidden');
});

//--- Responsive Accordion-Tabs
$('[data-responsive-accordion-tabs]').foundation();

// $('[data-accordion-tabs-link]').on('click', function(e) {
//   var self = $(e.currentTarget);
//   var target = self.attr('data-accordion-tabs-link');
//   self.foundation('_openTab', target);
// });

/*** Block Functions ***/

var carouselPrevButtonIcon = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="7.425025" height="13.75" viewBox="0 0 7.425025 13.75" class="icon icon-angle-left"><defs><clipPath clipPathUnits="userSpaceOnUse" id="clipPath30"><path d="M 0,11 5.94,11 5.94,0 0,0 0,11 Z"/></clipPath></defs><g transform="matrix(1.25,0,0,-1.25,0,13.75)"><g><g clip-path="url(#clipPath30)"><g transform="translate(5.44,0.5)"><path d="M -0.0234375,-0.50390625 A 0.50005,0.50005 0 0 0 -0.36328125,-0.34375 L -5.4394531,5 l 5.07617185,5.34375 a 0.50013731,0.50013731 0 1 0 0.7265625,-0.6875 L -4.0605469,5 0.36328125,0.34375 A 0.50005,0.50005 0 0 0 -0.0234375,-0.50390625 Z" /></g></g></g></g></svg>';
var carouselNextButtonIcon = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="7.425025" height="13.75" viewBox="0 0 7.425025 13.75" class="icon icon-angle-right"><defs><clipPath clipPathUnits="userSpaceOnUse" id="clipPath31"><path d="M 0,11 5.94,11 5.94,0 0,0 0,11 Z"/></clipPath></defs><g transform="matrix(1.25,0,0,-1.25,0,13.75)"><g><g clip-path="url(#clipPath31)"><g transform="translate(5.44,0.5)"><path d="M -4.9113953,-0.50390625 A 0.50005,0.50005 0 0 1 -4.5715516,-0.34375 L 0.50462028,5 -4.5715516,10.34375 A 0.50013731,0.50013731 0 0 1 -5.2981141,9.65625 L -0.87428592,5 -5.2981141,0.34375 a 0.50005,0.50005 0 0 1 0.3867188,-0.84765625 z" /></g></g></g></g></svg>';

//--- Blocks - Chat now
$('.chat-now-list').mCustomScrollbar({
  axis: "y",
  theme: 'disable',
  scrollbarPosition: 'outside',
  scrollButtons: {
    enable: true,
    scrollAmount: 200,
    scrollType: "stepped",
  },
  // mouseWheel: {
  //   enable: false,
  // },
  // contentTouchScroll: false,
  // documentTouchScroll: false,
  callbacks: {
    onInit: function(){
      $('[data-chat-now-move="next"]').on('click', function() {
        $('.mCSB_buttonDown').click();
      });
    },
  },
});

//--- Home - Gallery Preview
$('.gallery-preview-list').addClass('owl-carousel');
$('.gallery-preview-list').owlCarousel({
  autoplay: true,
  autoplayTimeout: 3000,
  rewind: true,
  nav: true,
  dots: false,
  navText: [carouselPrevButtonIcon, carouselNextButtonIcon],
  navClass: ['carousel-arrows-usual bigger positioned prev', 'carousel-arrows-usual bigger positioned next'],
  responsive: {
    0: {
      items: 1,
      margin: 8,
    },
    480: {
      items: 2,
      margin: 16,
    },
    768: {
      items: 3,
      margin: 32,
    },
    1104: {
      items: 4,
      margin: 40,
    },
  },
});

//--- Home - Testimonials
$('.testimonials-preview-carousel').addClass('owl-carousel');
$('.testimonials-preview-carousel').owlCarousel({
  items: 1,
  autoplay: true,
  // autoplayTimeout:
  animateIn: 'fadeIn',
  animateOut: 'fadeOut',
  dotsClass: 'testimonials-preview-bullets',
  dotClass: 'carousel-dot-usual',
});

//--- Gallery
$('.gallery-item-favorites, .gallery-item-button').foundation();

//--- Profile - Photos
$('.profile-photo-main-carousel').addClass('owl-carousel');
$('.profile-photo-main-carousel').owlCarousel({
  items: 1,
  dots: false,
  mouseDrag: false,
  touchDrag: false,
  animateIn: 'fadeIn',
  animateOut: 'fadeOut',
  onTranslated: setActivePagination,
});

$('.profile-photos-pagination').addClass('owl-carousel');
$('.profile-photos-pagination').owlCarousel({
  items: 4,
  margin: 4,
  dots: false,
  nav: true,
  navText: [carouselPrevButtonIcon, carouselNextButtonIcon],
  navClass: ['carousel-arrows-usual centered prev', 'carousel-arrows-usual centered next'],
  onInitialized: setActivePagination,
  onRefreshed: setActivePagination,
});

function setActivePagination() {
  $('.profile-photos-pagination-img').removeClass('is-active');
  var currentIndex = $('.profile-photo-main-carousel .owl-item.active').index();
  $('.profile-photos-pagination .owl-item').eq(currentIndex).find('.profile-photos-pagination-img').addClass('is-active');
}

$('.profile-photos-pagination-img').on('click', function(e) {
  var self = $(e.currentTarget);
  var index = self.closest('.owl-item').index();
  $('.profile-photo-main-carousel').trigger('to.owl.carousel', [index, 200]);
});

$('.profile-photos-videos').addClass('owl-carousel');
$('.profile-photos-videos').owlCarousel({
  items: 2,
  margin: 4,
  dots: false,
  nav: true,
  navText: [carouselPrevButtonIcon, carouselNextButtonIcon],
  navClass: ['carousel-arrows-usual centered prev', 'carousel-arrows-usual centered next'],
});

$('[data-open-video]').magnificPopup({
  type: 'iframe',
});

//--- Profile - Info
$('.profile-info-actions-btn').foundation();

//--- Messages and Chats
$('[data-messages-list-checkbox]').on('change', function() {
  var checked = false;
  $('[data-messages-list-checkbox]').each(function() {
    if ( $(this).prop('checked') )
      checked = true;
  });
  if ( checked ) {
    $('.messages-sidebar-window').removeClass('is-hidden');
    $('.messages-lists-delete').addClass('is-active');
  }
  else {
    $('.messages-sidebar-window').addClass('is-hidden');
    $('.messages-lists-delete').removeClass('is-active');
  }
});

$('.chats-item-gift').foundation();

//--- Message and Chat - Sidebar
var messagesSidebarContactsMobileScroll;
setResponsiveFunction({
  maxWidth: 1024,
  func: function() {
    messagesSidebarContactsMobileScroll = $('.messages-sidebar-contacts.mobile-short').mCustomScrollbar({
      theme: "main",
      axis: "y",
    });
  },
  funcAlternate: function() {
    if ( messagesSidebarContactsMobileScroll ) {
      messagesSidebarContactsMobileScroll.mCustomScrollbar("destroy");
    }
  },
});

//--- Message and Chat - Correspondence
$('.chat-content-correspondence,.chat-content-companion-wrap').mCustomScrollbar({
  theme: "main",
  axis: "y",
  setTop: $('.chat-content-correspondence-container,.chat-content-companion-container').outerHeight() * -1 + 'px',
});

var chatTimeDefault = $('[data-chat-time-countdown]').html();
var chatStartTime;
var chatTimeUpdateInterval;

$('[data-start-chat]').on('click', function() {
  $('[data-start-chat]').addClass('btn-disabled');
  $('[data-chat-form] textarea').removeAttr('disabled');
  $('[data-chat-form] [type="submit"], [data-stop-chat]').removeClass('btn-disabled');
  $('[data-chat-time-countdown]').removeClass('is-disabled');
  chatStartTime = Date.now();
  chatTimeUpdateInterval = setInterval(function() {
    var timeNow = Date.now();
    var timeResidual = timeNow - chatStartTime;
    var residualMinutes = Math.floor(timeResidual / 60000);
    var residualSeconds = Math.floor((timeResidual % 60000) / 1000) + "";
    if ( !residualSeconds.charAt(1) ) {
      residualSeconds = "0" + residualSeconds;
    }
    $('[data-chat-time-countdown]').html( residualMinutes + ":" + residualSeconds );
  }, 1000);
});

$('[data-stop-chat]').on('click', function() {
  $('[data-chat-form] [type="submit"], [data-stop-chat]').addClass('btn-disabled');
  $('[data-chat-time-countdown]').addClass('is-disabled').html(chatTimeDefault);
  $('[data-chat-form] textarea').attr('disabled', '');
  $('[data-start-chat]').removeClass('btn-disabled');
  clearInterval(chatTimeUpdateInterval);
});

//--- Tours - Photos carousel
$('.tours-carousel').addClass('owl-carousel');
$('.tours-carousel').owlCarousel({
  loop: true,
  nav: true,
  dots: false,
  navText: [carouselPrevButtonIcon, carouselNextButtonIcon],
  navClass: ['carousel-arrows-usual centered bigger prev', 'carousel-arrows-usual centered bigger next'],
  autoplay: true,
  // autoplayTimeout: 5000,
  responsive: {
    0: {
      items: 1,
      margin: 10,
    },
    640: {
      items: 2,
      margin: 16,
    },
    1024: {
      items: 3,
      margin: 32,
    },
  },
});

//--- About - Tours photos carousel
$('.about-tours-photos').addClass('owl-carousel');
$('.about-tours-photos').owlCarousel({
  margin: 8,
  loop: true,
  nav: true,
  dots: false,
  navText: [carouselPrevButtonIcon, carouselNextButtonIcon],
  navContainer: '.about-tours-photos-nav',
  navClass: ['carousel-arrows-usual static', 'carousel-arrows-usual static'],
  // autoplay: true,
  // autoplayTimeout: 5000,
  responsive: {
    0: {
      items: 2,
    },
    640: {
      items: 3,
    },
    1024: {
      items: 3,
    },
  },
});

//--- Invitations
$('[data-invitation-edit]').on('click', function(e) {
  var self = $(e.currentTarget);
  self.addClass('is-hidden');
  self.siblings('[data-invitation-form]').removeClass('is-hidden');
  self.siblings('[data-invitation-form]').find('textarea').val( self.siblings('[data-invitation-text]').find('[data-invitation-text-current]').html() );
});

$('[data-invitation-form]').on('submit', function(e) {
  e.preventDefault();

  var self = $(e.currentTarget);
  self.siblings('[data-invitation-text]').find('[data-invitation-text-current]').html( self.find('textarea').val() );
  self.find('textarea').val('');
  self.siblings('[data-invitation-edit]').removeClass('is-hidden');
  self.addClass('is-hidden');
});

//--- Stats
$('.stats-change-period').on('click', function() {
  $('.stats-change-period-popup').removeClass('is-hidden');
});

$('.stats-change-period-popup-choose-open').on('click', function() {
  $('.stats-change-period-popup-choose').removeClass('is-hidden');
});

$('.stats-change-period-datepicker .from').datepicker().on('change', function() {
  var date = $('.stats-change-period-datepicker .from').datepicker( "getDate" );
  $('.stats-change-period-inputs .from').val( date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() );
});
$('.stats-change-period-datepicker .to').datepicker().on('change', function() {
  var date = $('.stats-change-period-datepicker .to').datepicker( "getDate" );
  $('.stats-change-period-inputs .to').val( date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() );
});

$('.stats-change-period-button-cancel').on('click', function() {
  $('.stats-change-period-popup-choose').addClass('is-hidden');
  $('.stats-change-period-popup').addClass('is-hidden');
});

/*** Animation Functions ***/

$('[data-anim-block-wrap]').each(function() {
  var self = $(this);
  if ( self.find('[data-anim-block-current-wrap]').length != 0 ) {
    var currentWrap = self.find('[data-anim-block-current-wrap]');
  } else {
    var currentWrap = self;
  }
  if ( self.is('[data-anim-block-elem]') ) {
    var items = self;
  } else {
    var items = self.find('[data-anim-block-elem], [data-anim-block-group-elem]');
  }
  var ANIM_DELAY_COUNTER = 0.2;
  var ANIM_TIMING_FUNCTION = 'slide-in-up-block';
  var ANIM_START_OFFSET = '50%';

  currentWrap.each(function() {
    $(this).find('[data-anim-block-elem], [data-anim-block-group]').each(function(groupIndex, groupItem) {
      if ( $(this).is('[data-anim-block-elem]') ) {
        $(this).css({
          'animation-delay': groupIndex * ANIM_DELAY_COUNTER + 's',
        });
      } else {
        var numberItems = $(groupItem).attr('data-anim-block-group').split(' ');
        setResponsiveFunction([
          {
            maxWidth: 640,
            func: function() {
              var numberItemsCurrent = numberItems[0];
              setAnimDelay(groupIndex, groupItem, numberItemsCurrent);
            },
          },
          {
            minWidth: 640,
            maxWidth: 1024,
            func: function() {
              var numberItemsCurrent = numberItems[1];
              setAnimDelay(groupIndex, groupItem, numberItemsCurrent);
            },
          },
          {
            minWidth: 1024,
            func: function() {
              var numberItemsCurrent = numberItems[2];
              setAnimDelay(groupIndex, groupItem, numberItemsCurrent);
            },
          },
        ]);
      }
    });

    function setAnimDelay(groupIndex, groupItem, numberItemsCurrent) {
      var currentIndex = groupIndex;
      $(groupItem).find('[data-anim-block-group-elem]').each(function(itemIndex) {
        if ( itemIndex != 0 && itemIndex % numberItemsCurrent == 0 ) {
          currentIndex++;
        }
        $(this).css({
          'animation-delay': currentIndex * ANIM_DELAY_COUNTER + 's',
        });

      });
    }
  });

  self.waypoint({
    handler: function() {
      items.addClass(ANIM_TIMING_FUNCTION);
    },
    offset: ANIM_START_OFFSET,
  });
});

$('.intro').waypoint({
  handler: function() {
    // items.addClass(ANIM_TIMING_FUNCTION);
    $('.intro-topic').addClass('fade-in-from-right');
    $('.intro-form').addClass('fade-in-from-left');
  },
  // offset: ANIM_START_OFFSET,
});

$('.gallery-preview').waypoint({
  handler: function() {
    $('.gallery-preview').addClass('fade-in');
  },
  offset: '50%',
});

$('.testimonials-preview').waypoint({
  handler: function() {
    $('.testimonials-preview').addClass('fade-in');
  },
  offset: '70%',
});

$('.about-preview').waypoint({
  handler: function() {
    $('.about-preview').addClass('fade-in');
  },
  offset: '70%',
});

});

/*** Base Functions ***/

/***
options = {
  eventName: (event) / [(eventOn), (eventOff)],
  toggleElems: [
    {
      elem: (JQuery object),
      class: (className) / [(classNameOn), (classNameOff)],
      anim: {
        duration: (number),
        delay: (nubmer),
      },
      toggleAfter: {
        on: (JQuery object),
        off: (JQuery object),
      }
    },
  ],
}
***/

(function($){
   $.fn.toggleElemState = function(options) {
      var settings = {
        eventName: 'click',
        toggleElems: [],
      };

      return this.each(function() {
        if (options) $.extend(settings,options);

        var eventOn;
        var eventOff;
        setEventName(settings.eventName);

        if ( eventOn ) {
          $(this).on(eventOn, function() {
            if ( eventOn == eventOff ) {
              var toggleClass = Array.isArray(settings.toggleElems[0].class) ? settings.toggleElems[0].class[0] : settings.toggleElems[0].class;
              if ( settings.toggleElems[0].elem.hasClass( toggleClass ) ) {
                switchOn();
              }
            } else {
              switchOn();
            }
          });
        }

        if ( eventOff ) {
          $(this).on(eventOff, function() {
            if ( eventOn == eventOff ) {
              var toggleClass = Array.isArray(settings.toggleElems[0].class) ? settings.toggleElems[0].class[0] : settings.toggleElems[0].class;
              if ( settings.toggleElems[0].elem.hasClass( toggleClass ) ) {
                switchOff();
              }
            } else {
              switchOff();
            }
          });
        }

        function switchOn() {
          for (var i = 0; i < settings.toggleElems.length; i++) {
            var switchDelay = setDelay('on');

            setTimeout(function() {
              if ( settings.toggleElems[i].anim ) {
                var duration = settings.toggleElems[i].anim.duration || 0;
                var delay = settings.toggleElems[i].anim.delay || 0;

                if (duration) settings.toggleElems[i].elem.css('animation-duration', duration + 'ms');
                if (delay) settings.toggleElems[i].elem.css('animation-delay', delay + 'ms');

                toggleElemClass('on');

                setTimeout(function(){
                  toggleElemClass('on');
                }, duration + delay);
              } else {
                toggleElemClass('on');
              }
            }, switchDelay);
          }
        }

        function switchOff() {
          for (var i = 0; i < settings.toggleElems.length; i++) {
            var switchDelay = setDelay('off');
            toggleElemClass('off');

            setTimeout(function() {
              if ( settings.toggleElems[i].anim ) {
                var duration = settings.toggleElems[i].anim.duration || 0;
                var delay = settings.toggleElems[i].anim.delay || 0;

                if (duration) settings.toggleElems[i].elem.css('animation-duration', duration + 'ms');
                if (delay) settings.toggleElems[i].elem.css('animation-delay', delay + 'ms');

                toggleElemClass('off');

                setTimeout(function(){
                  toggleElemClass('off');
                  if (duration || delay) settings.toggleElems[i].elem.removeAttr('style');
                }, duration + delay);
              } else {
                toggleElemClass('off');
              }
            }, switchDelay);
          }
        }

        function setDelay(switchEvent) {
          if ( settings.toggleElems[i].toggleAfter[switchEvent] ) {
            var afterElem = settings.toggleElems[i].toggleAfter[switchEvent];
            for (var j = 0; j < settings.toggleElems.length; j++) {
              if ( settings.toggleElems[j].elem == settings.toggleElems[i].toggleAfter[switchEvent] ) {
                var beforeDelay = setDelay();
                var currentDelay = settings.toggleElems[j].anim.duration + settings.toggleElems[j].anim.delay;
                return beforeDelay + currentDelay;
              }
            }
          } else {
            return 0;
          }
        }

        function toggleElemClass(classItem) {
          var classNumber = 0;
          switch (classItem) {
            case 'on':
              classItem = 0;
              break;
            case 'off':
              classItem = 1;
              break;
          }

          if ( Array.isArray(settings.toggleElems[i].class) ) {
            settings.toggleElems[i].elem.toggleClass( settings.toggleElems[i].class[classNumber] );
          } else {
            settings.toggleElems[i].elem.toggleClass( settings.toggleElems[i].class );
          }
        }

        function setEventName(eventName) {
          if ( Array.isArray( eventName ) ) {
            eventOn = eventName[0];
            eventOff = eventName[1];
          } else {
            switch (eventName) {
              case 'click':
              case 'dblclick':
              case 'hover':
              case 'mousemove':
                eventOn = eventName;
                eventOff = eventName;
                break;
              case 'click-on':
              case 'dblclick-on':
                eventOn = eventName.slice(0, eventName.indexOf('-'));
              case 'click-off':
              case 'dblclick-off':
                eventOff = eventName.slice(0, eventName.indexOf('-'));
            }
          }
        }

      });
   };
})(jQuery);

/// options = {maxWidth: maxWidth(number), minWidth: minWidth(number), changedElem: changedElem(selector), sampleElem: sampleElem(selector),}
function setResponsiveHeight(options) {
  var changedElem = options.changedElem;
  var sampleElem = options.sampleElem;

  setResponsiveFunction({
    minWidth: options.minWidth,
    maxWidth: options.maxWidth,
    func: function() {
      jQuery(changedElem).height( jQuery(sampleElem).innerHeight() );
    },
    funcAlternate: function() {
      jQuery(changedElem).removeAttr('style');
    },
  });
}

/// options = {minWidth: (number), maxWidth: (number), func: (function), funcAlternate: (function)};
/// options = [{minWidth: minWidth, maxWidth: maxWidth, func: func, funcAlternate: funcAlternate(function)}, {minWidth: minWidth, maxWidth: maxWidth, func: func, funcAlternate: funcAlternate(function)}];
function setResponsiveFunction(options) {
  respondFunction();
  jQuery(window).on('resize', respondFunction);

  function respondFunction() {
    if ( Array.isArray(options) ) {
      for (var i = 0; i < options.length; i++) {
        var minWidth = options[i].minWidth || 0;
        var maxWidth = options[i].maxWidth || Infinity;
        var func = options[i].func;
        var funcAlternate = options[i].funcAlternate;
        goFunc();
      }
    } else {
      var minWidth = options.minWidth || 0;
      var maxWidth = options.maxWidth || Infinity;
      var func = options.func;
      var funcAlternate = options.funcAlternate;
      goFunc();
    }

    function goFunc() {
      if ( jQuery(window).width() >= minWidth && jQuery(window).width() < maxWidth ) {
        func();
      } else if (funcAlternate) {
        funcAlternate();
      }
    }
  }
}

//--- Text overflow - Fixed lenght
function cutTextBeforeMaxLenght(textSelector, maxLenght) {
  if ( jQuery(textSelector).is(textSelector) ) {
    var oldHtml = [];
    if ( jQuery(textSelector).html().length > maxLenght ) {
      jQuery(textSelector).each(function(index,item) {
        oldHtml.push( $(item).html() );
        if ( $(item).html().length > maxLenght ) {
          $(item).html( $(item).html().slice(0, maxLenght) + '...' );
        }
      });
    }
    return oldHtml;
  }
}

//--- Proportion Size
(function($){
   $.fn.setProportionalSize = function(options) {
      var settings = {
        param: 'height',
        ratio: 1,
      };
      return this.each(function() {
        if (options) $.extend(settings,options);

        var self = $(this);

        var staticParamValue;
        if ( settings.param == 'height' ) {
          staticParamValue = self.outerWidth();
        } else {
          staticParamValue = self.outerHeight();
        }

        self.css( settings.param, staticParamValue * settings.ratio + 'px' );

      });
   };
})(jQuery);

/***
/// JQuery Plugin's start
(function($){
   $.fn.pluginName = function(options) {
      var settings = {
        setting: (defaultValue),
      };
      return this.each(function() {
        if (options) $.extend(settings,options);
        var self = $(this);
        // Plugin body ...
      });
   };
})(jQuery);
***/
