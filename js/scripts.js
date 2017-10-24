
$(document).ready(function() {

  checkScreenSize();

  function checkScreenSize() {
    var newWindowWidth = $(window).width();
    if (newWindowWidth < 481) {
      // MOBILE ONLY

      $('#fullpage').fullpage({
        anchors: ['mogwai', 'pup', 'thiswilldestroyyou', 'odesza', 'brandnew', 'dannybrown', 'pinkfloyd', 'sunsofthyme', 'radicalface', 'vince'],
        scrollOverflow: false,
        scrollBar: false,
        animateAnchor: true,
        loopHorizontally: true,
        continuousVertical: false,
        autoScrolling: false,
        loopTop: false,
        loopBottom: false,
        'onLeave': function(index, nextIndex, direction) {

          // slide albums up if moving down
          if (direction == 'down') {
            $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
          }
          // and slide albums down if moving up
          else if (direction == 'up') {
            $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
          }
          checkPaused();


        }

      });

      $.fn.fullpage.setAllowScrolling(false);

      // BURGER
      var burger = bodymovin.loadAnimation({
        container: document.getElementById('burger'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'ae/burger.json'
      })

      $('#burger').on('click', function() {
        $('#close').toggleClass('closeActive');
        $(document.body).addClass('navActive');
        burger.playSegments([
          [0, 25]
        ], true);
      });

      $('#close').on('click', function() {
        $('#close').toggleClass('closeActive');
        $(document.body).removeClass('navActive');
        burger.playSegments([
          [25, 50]
        ], true);
      });

      $('nav a').on('click', function() {
        $('#close').toggleClass('closeActive');
        $(document.body).removeClass('navActive');
        burger.playSegments([
          [25, 50]
        ], true);
      });

    } else {
      // DESKTOP ONLY

      $('#fullpage').fullpage({
        anchors: ['mogwai', 'pup', 'thiswilldestroyyou', 'odesza', 'brandnew', 'dannybrown', 'pinkfloyd', 'sunsofthyme', 'radicalface', 'vince'],
        scrollOverflow: false,
        scrollBar: false,
        animateAnchor: false,
        loopHorizontally: true,
        continuousVertical: true,
        lazyLoading: true,
        'onLeave': function(index, nextIndex, direction) {

          // if you loop forwards at the end, reset the transitions
          if (direction == 'down' && index == 10) {
            $('.section').removeClass('moveUp').addClass('moveDown');
            $('#vincee').removeClass('moveDown').addClass('moveUp');
          } else if (direction == 'up' && index == 1) {
            $('.section').removeClass('moveDown').addClass('moveUp');
            $('#mogwaii').removeClass('moveUp').addClass('moveDown')
          }
          // reset mogwai if getting close to a forward loop
          else if (direction == 'down' && index == 9) {
            $('#mogwaii').removeClass('moveUp').addClass('moveDown');
            $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
          }
          // reset twdy if getting close to a backward loop
          else if (direction == 'down' && index == 2) {
            $('#vincee').removeClass('moveUp').addClass('moveDown');
            $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
          }
          // slide albums up if moving down
          else if (direction == 'down') {
            $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
          }
          // and slide albums down if moving up
          else if (direction == 'up') {
            $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
          }
          checkPaused();
          var leavingSection = $(this);


        }



      });

      // TOGGLE THE NAV

      $("nav").on({
        mouseenter: function() {
          $('body').addClass("navActive");
        },
        mouseleave: function() {
          $('body').removeClass("navActive");
        },
        mousedown: function() {
          $('body').removeClass("creditsOpen");
          checkInfo();
          creditsOpen = false;
        }
      });


    }
  }

  // DELAY ENTRANCE

  $('#fullpage, #albumMockup, .control, h1').hide(); // this or use css to hide the div
  $('#fullpage, #albumMockup, .control, h1').delay(333).fadeIn('quick');
  $('.control#close').delay(3333).hide();

  // MUTE ALL THE AUDIO

  var audioMuted = false;
  var videoPaused = false;

  var mute = bodymovin.loadAnimation({
    container: document.getElementById('unmute'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'ae/mute.json'
  })
  // mute
  $('#mute').on('click', function() {
    $('#mute').css("display", "none");
    $('body audio, body video').each(function() {
      $(this).animate({
        volume: 0
      }, 1000, function() {
        muted = true;
      });
    });
    mute.playSegments([
      [0, 30]
    ], true);
    audioMuted = true;
    localStorage.setItem('muted', 'true');
  });
  // unmute
  $('#unmute').on('click', function() {
    $('#mute').css("display", "inline");
    $('body audio, body video').each(function() {
      $(this).prop('muted', false);
      $(this).animate({
        volume: 1
      }, 1000, function() {
        muted = false;
      });
    });
    mute.playSegments([
      [30, 0]
    ], true);
    audioMuted = false;
    localStorage.removeItem("muted");
  });
  // if they mute and leave and come back, remember the mute
  if (localStorage.getItem('muted') !== null) {
    $('#mute').css("display", "none");
    $('body audio, body video').each(function() {
      $(this).prop('muted', true);
    });
    mute.playSegments([
      [0, 30]
    ], true);
    audioMuted = true;
  }

  // I WAS PROMISED AUTOPLAY

  //Modernizr.on('videoautoplay', function(result){
  //  if(result) {
  //  }  else {
  //    $('#pause').css("display", "none");
  //    videoPaused = true;
  //    play.playSegments([
  //      [0, 30]
  //    ], true);
  //  }
  //});

  // PAUSE ALL THE VIDEOS

  var play = bodymovin.loadAnimation({
    container: document.getElementById('play'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'ae/play.json'
  })

  $('#pause').on('click', function() {
    $('#pause').css("display", "none");
    $('body video').each(function() {
      this.pause();
    });
    $('body audio').each(function() {
      $(this).animate({
        volume: 0
      }, 1000, function() {
        muted = true;
      });
    });
    videoPaused = true;
    play.playSegments([
      [0, 30]
    ], true);
  });

  // PLAY ALL THE VIDEOS

  $('#play').on('click', function() {
    $('#pause').css("display", "inline");
    $('.section.active video').each(function() {
      this.play();
    });
    play.playSegments([
      [30, 60]
    ], true);
    checkMute();
    videoPaused = false;
  });

  function checkMute() {
    if (audioMuted != true) {
      $('body audio').each(function() {
        $(this).animate({
          volume: 1
        }, 1000, function() {
          muted = false;
        });
      });
    }
  }

  function checkPaused() {
    if (videoPaused == true) {
      $('#pause').css("display", "inline");
      $('body video').each(function() {
        this.play();
      });
      play.playSegments([
        [30, 60]
      ], true);
      videoPaused = false;
    }
  }


  // GO BACK A SLIDE

  var prev = bodymovin.loadAnimation({
    container: document.getElementById('prev'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'ae/prev.json'
  })

  $('#prev, #mobilePrev').mousedown(function() {
    prev.playSegments([
      [0, 20]
    ], true);
  });

  $('#prev, #mobilePrev').mouseup(function() {
    prev.playSegments([
      [20, 39]
    ], true);
    $.fn.fullpage.moveSectionUp();
    if ($("body").hasClass("creditsOpen")) {
      $('body').removeClass('creditsOpen');
      info.playSegments([
        [30, 60]
      ], true);
    }
    $('body audio').each(function() {
      $(this).animate({
        volume: 1
      }, 1000, function() {
        muted = false;
      });
    });
  });

  // GO FORWARD A SLIDE

  var next = bodymovin.loadAnimation({
    container: document.getElementById('next'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'ae/next.json'
  })

  $('#next, #mobileNext').mousedown(function() {
    next.playSegments([
      [0, 20]
    ], true);
  });

  $('#next, #mobileNext').mouseup(function() {
    next.playSegments([
      [20, 39]
    ], true);
    $.fn.fullpage.moveSectionDown();
    if ($("body").hasClass("creditsOpen")) {
      $('body').removeClass('creditsOpen');
      info.playSegments([
        [30, 60]
      ], true);
    }
    $('body audio').each(function() {
      $(this).animate({
        volume: 1
      }, 1000, function() {
        muted = false;
      });
    });
  });


  // ACTIVATE CREDITS

  var creditsOpen = false;

  var info = bodymovin.loadAnimation({
    container: document.getElementById('info'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'ae/info.json'
  })

  $('#info').on('click', function() {
    $('body').toggleClass('creditsOpen');
    $('#closeInfo').toggleClass('active');
    info.playSegments([
      [0, 30]
    ], true);
    creditsOpen = true;
  });

  $('#closeInfo').on('click', function() {
    $('body').toggleClass('creditsOpen');
    $('#closeInfo').toggleClass('active');
    info.playSegments([
      [30, 60]
    ], true);
    creditsOpen = false;
  });

  function checkInfo() {
    if (creditsOpen == true) {
      info.playSegments([
        [30, 60]
      ], true);
    }
  }

  // IF WEBM, THEN BIRDS UP

  function supportsVideoType(type) {
    let video;
    let formats = {
      webm: 'video/webm; codecs="vp8, vorbis"',
    };
    if (!video) {
      video = document.createElement('video')
    }
    return video.canPlayType(formats[type] || type);
  }
  if (supportsVideoType('webm') === "probably") {
    $('.webm').css("display", "inline");
    $('.notwebm').css("display", "none");
  } else {
    $('.webm').css("display", "none");
    $('.notwebm').css("display", "inline");
  }

});

// MAKE THE LEFT & RIGHT ARROWS MIMIC THE UP AND DOWN ARROWS

$(document).keydown(function(e) {
  if (e.keyCode == 37) {
    $.fn.fullpage.moveSectionUp();
  }
  if (e.keyCode == 39) {
    $.fn.fullpage.moveSectionDown();
  }
});
