AOS.init({
 	duration: 800,
 	easing: 'ease',
 	once: true,
 	offset: -100
});

jQuery(function($) {
	
	'use strict';
	loader();
	siteMenuClone();
	mobileToggleClick();
	onePageNavigation();
	siteIstotope();
	portfolioItemClick();
	owlCarouselPlugin();
	floatingLabel();
	scrollWindow();
	counter();
	jarallaxPlugin();
	contactForm();
	stickyFillPlugin();
	animateReveal();

});

var siteIstotope = function() {
	var $container = $('#posts').isotope({
    itemSelector : '.item',
    isFitWidth: true
  });

  $(window).resize(function(){
    $container.isotope({
      columnWidth: '.col-sm-3'
    });
  });
  
  $container.isotope({ filter: '*' });

  $('#filters').on( 'click', 'a', function(e) {
  	e.preventDefault();
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
    $('#filters a').removeClass('active');
    $(this).addClass('active');
  });

  $container.imagesLoaded()
  .progress( function() {
    $container.isotope('layout');
  })
  .done(function() {
  	$('.gsap-reveal-img').each(function() {
			var html = $(this).html();
			$(this).html('<div class="reveal-wrap"><span class="cover"></span><div class="reveal-content">'+html+'</div></div>');
		});

  	var controller = new ScrollMagic.Controller();

  	var revealImg = $('.gsap-reveal-img');

  	if ( revealImg.length ) {
  		var i = 0;
			revealImg.each(function() {

				var cover = $(this).find('.cover'),
					revealContent = $(this).find('.reveal-content'),
					img = $(this).find('.reveal-content img');


				var tl2 = new TimelineMax();


				setTimeout(function() {

					tl2
						tl2.set(img, {  scale: '2.0', autoAlpha: 1, })
						.to(cover, 1, { marginLeft: '0', ease:Expo.easeInOut, onComplete() {
							tl2.set(revealContent, { autoAlpha: 1 });
							tl2.to(cover, 1, { marginLeft: '102%', ease:Expo.easeInOut });
							tl2.to(img, 2, { scale: '1.0', ease:Expo.easeOut }, '-=1.5');
						} } )

				}, i * 700);

				

				var scene = new ScrollMagic.Scene({
					triggerElement: this,
					duration: "0%",
					reverse: false,
					offset: "-300%",
				})
				.setTween(tl2)
				.addTo(controller);

				i++;

			});
		}
  })

  $('.js-filter').on('click', function(e) {
  	e.preventDefault();
  	$('#filters').toggleClass('active');
  });

}

var loader = function() {
	setTimeout(function() {
		TweenMax.to('.site-loader-wrap', 1, { marginTop: 50, autoAlpha: 0, ease: Power4.easeInOut });
  }, 10);
  $(".site-loader-wrap").delay(200).fadeOut("slow");
	$("#unslate_co--overlayer").delay(200).fadeOut("slow");	
}

var siteMenuClone = function() {

	setTimeout(function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-inner');
		});
		
		var counter = 0;
    $('.unslate_co--site-mobile-menu .has-children').each(function(){
      var $this = $(this);
      
      $this.prepend('<span class="arrow-collapse collapsed">');

      $this.find('.arrow-collapse').attr({
        'data-toggle' : 'collapse',
        'data-target' : '#collapseItem' + counter,
      });

      $this.find('> ul').attr({
        'class' : 'collapse',
        'id' : 'collapseItem' + counter,
      });

      counter++;

    });

  }, 1000);

	$('body').on('click', '.arrow-collapse', function(e) {
    var $this = $(this);
    if ( $this.closest('li').find('.collapse').hasClass('show') ) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }
    e.preventDefault();  
    
  });

	$(window).resize(function() {
		var $this = $(this),
			w = $this.width();

		if ( w > 768 ) {
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
			}
		}
	});

	$('.js-burger-toggle-menu').click(function(e){
		e.preventDefault();
		if ( $('body').hasClass('offcanvas') ) {
  		$('body').removeClass('offcanvas');
  		$('.js-burger-toggle-menu').removeClass('open');
  	} else {
  		$('body').addClass('offcanvas');	
  		$('.js-burger-toggle-menu').addClass('open');
  	}
  });

}; 




// var siteIstotope = function() {


	  
	
// }

var owlCarouselPlugin = function() {

	$('.testimonial-slider').owlCarousel({
    center: false,
    items: 1,
    loop: true,
    stagePadding: 20,
  	margin: 10,
    smartSpeed: 2000,
    autoplay: true,
    autoplayHoverPause: true,
    dots: true,
    nav: true,
    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">'],

    responsive:{
        400:{
          stagePadding: 20,
  				margin: 10,
        },
        600:{
          stagePadding: 100,
  				margin: 50,
        }
    }
	});
	owlSingleSlider();

	if ( $('.logo-slider').length ) {

		$('.logo-slider').owlCarousel({
			center: false,
	    loop: true,
	    stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoplay: true,
	    autoplayHoverPause: true,
	    dots: false,
	    nav: false,
	    responsive:{
		    400:{
		      items: 2
		    },
		    768:{
		    	items: 3
		    },
		    1000:{
		    	items: 5
		    }
	    }
	   });
	}

};

var owlSingleSlider = function () {
	if ( $( '.single-slider' ).length ) {
		$('.single-slider').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
	    stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1500,
	    autoplay: true,
	    autoplayHoverPause: true,
	    dots: true,
	    nav: true,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">'],

	    responsive:{
	      400:{
	        stagePadding: 0,
					margin: 0,
	      },
	      600:{
	        stagePadding: 0,
					margin: 0,
	      }
	    }
		});
	}
}

var floatingLabel = function () {
	$('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});
};



// scroll
var scrollWindow = function() {
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.unslate_co--site-nav');
				// sd = $('.js-scroll-wrap');

		if (st > 150) {
			if ( !navbar.hasClass('scrolled') ) {
				navbar.addClass('scrolled');	
			}
		} 
		if (st < 150) {
			if ( navbar.hasClass('scrolled') ) {
				navbar.removeClass('scrolled sleep');
			}
		} 
		if ( st > 350 ) {
			if ( !navbar.hasClass('awake') ) {
				navbar.addClass('awake');	
			} 

			// hide / show on scroll
			if (st > lastScrollTop){
	      // downscroll code
	      navbar.removeClass('awake');	
	      navbar.addClass('sleep');	
	   	} else {
	      // upscroll code
	      navbar.addClass('awake');	
	   	}
	   	lastScrollTop = st;
			

		}
		if ( st < 350 ) {
			if ( navbar.hasClass('awake') ) {
				navbar.removeClass('awake');
				navbar.addClass('sleep');
			}
		}

   

	});

};


var counter = function() {
	
	$('.section-counter').waypoint( function( direction ) {

		if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

			var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
			$(this.element).find('.number-counter').each(function(){
				var $this = $(this),
					num = $this.data('number');
				$this.animateNumber(
				  {
				    number: num,
				    numberStep: comma_separator_number_step
				  }, 
				  {
				  	easing: 'swing',
    				duration: 3000
				  }
				);
			});
			
		}

	} , { offset: '95%' } );

};


var mobileToggleClick = function() {
	$('.js-menu-toggle').click(function(e) {

		e.preventDefault();

  	if ( $('body').hasClass('offcanvas') ) {
  		$('body').removeClass('offcanvas');
  		$('.js-menu-toggle').removeClass('active');
  		if ( $('.js-burger-toggle-menu').length ) {
  			$('.js-burger-toggle-menu').removeClass('open');
  		}
  	} else {
  		$('body').addClass('offcanvas');	
  		$('.js-menu-toggle').addClass('active');
  		if ( $('.js-burger-toggle-menu').length ) {
  			$('.js-burger-toggle-menu').addClass('open');
  		}
  	}


  });

  // click outisde offcanvas
	$(document).mouseup(function(e) {
    var container = $(".unslate_co--site-mobile-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('body').find('.js-menu-toggle').removeClass('active');

				$('body').find('.js-burger-toggle-menu').removeClass('open');
			}
    }
	}); 
};



// navigation
var onePageNavigation = function() {
  var navToggler = $('.site-menu-toggle');
 	$("body").on("click", ".unslate_co--site-nav .site-nav-ul li a[href^='#'], .smoothscroll[href^='#'], .unslate_co--site-mobile-menu .site-nav-wrap li a[href^='#']", function(e) {
    
    e.preventDefault();

    var $body = $('body');
    if ( $body.hasClass('offcanvas')  ) {
    	$body.removeClass('offcanvas');
    	$('body').find('.js-burger-toggle-menu').removeClass('open');
    }

    var hash = this.hash;
    
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, 'easeInOutExpo');

  });

};


// load ajax page
var portfolioItemClick = function() {
	$('.ajax-load-page').on('click', function(e) {
		
		var id = $(this).data('id'),
			href = $(this).attr('href');

		if ( $('#portfolio-single-holder > div').length ) {
			$('#portfolio-single-holder > div').remove();
		} 

		TweenMax.to('.loader-portfolio-wrap', 1, { top: '-50px', autoAlpha: 1, display: 'block', ease: Power4.easeOut });

		$('html, body').animate({
    	scrollTop: $('#portfolio-section').offset().top - 50
		}, 700, 'easeInOutExpo', function() {
		});
		
		setTimeout(function(){
			loadPortfolioSinglePage(id, href);
		}, 100);

		e.preventDefault();

	});

	// Close
	$('body').on('click', '.js-close-portfolio', function() {

		setTimeout(function(){
			$('html, body').animate({
	    	scrollTop: $('#portfolio-section').offset().top - 50
			}, 700, 'easeInOutExpo');
		}, 200);

		TweenMax.set('.portfolio-wrapper', { visibility: 'visible', height: 'auto' });
		TweenMax.to('.portfolio-single-inner', 1, { marginTop: '50px', opacity: 0,  display: 'none', onComplete() {
			TweenMax.to('.portfolio-wrapper', 1, { marginTop: '0px', autoAlpha: 1, position: 'relative' });

		} });
		
	});
};

$(document).ajaxStop(function(){
	setTimeout(function(){
		TweenMax.to('.loader-portfolio-wrap', 1, { top: '0px', autoAlpha: 0, ease: Power4.easeOut });	
	}, 400);
});

var loadPortfolioSinglePage = function(id, href) {
	$.ajax({
		url: href,
		type: 'GET',
		success: function(html) {

			TweenMax.to('.portfolio-wrapper', 1, { marginTop: '50px', autoAlpha: 0, visibility: 'hidden', onComplete() {
				TweenMax.set('.portfolio-wrapper', { height: 0 });
			} })

			var pSingleHolder = $('#portfolio-single-holder');
	    	
			var getHTMLContent = $(html).find('.portfolio-single-wrap').html();

			pSingleHolder.append(
				'<div id="portfolio-single-'+id+
				'" class="portfolio-single-inner"><span class="unslate_co--close-portfolio js-close-portfolio d-flex align-items-center"><span class="close-portfolio-label">Back to Portfolio</span><span class="icon-close2 wrap-icon-close"></span></span>' + getHTMLContent + '</div>'
			);

			setTimeout(function() {
				owlSingleSlider();
			}, 10);

			setTimeout(function() {
				TweenMax.set('.portfolio-single-inner', { marginTop: '100px', autoAlpha: 0, display: 'none' });
				TweenMax.to('.portfolio-single-inner', .5, { marginTop: '0px', autoAlpha: 1, display: 'block', onComplete() {

					TweenMax.to('.loader-portfolio-wrap', 1, { top: '0px', autoAlpha: 0, ease: Power4.easeOut });	
				} });
			}, 700 );
		}
	});

	return false;

};

var jarallaxPlugin = function() {
	$('.jarallax').jarallax({
    speed: 0.2
	});
	jarallax(document.querySelectorAll('.jarallax-video'), {
    speed: 0.2,
    videoSrc: 'https://www.youtube.com/watch?v=mwtbEGNABWU',
    videoStartTime: 8,
    videoEndTime: 70,
	});
};

var contactForm = function() {
	if ($('#contactForm').length > 0 ) {

		// Initialize EmailJS with your public key
		// Get your public key from: https://dashboard.emailjs.com/admin/account
		emailjs.init("YRHBS4C5EqZKKfbcX"); // Replace with your EmailJS public key

		$( "#contactForm" ).validate( {
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
					minlength: 10
				},
				message: {
					required: true,
					minlength: 5
				}
			},
			messages: {
				name: "Please enter your name",
				email: "Please enter a valid email address",
				phone: "Please enter a valid phone number",
				message: "Please enter a message"
			},
			errorElement: 'span',
			errorLabelContainer: '.form-error',
			/* submit via EmailJS */
			submitHandler: function(form) {
				var $submit = $('.submitting'),
					waitText = 'Sending...';

				$submit.css('display', 'block').text(waitText);

				// Prepare template parameters
				var templateParams = {
					from_name: $('#name').val(),
					from_email: $('#email').val(),
					phone: $('#phone').val(),
					message: $('#message').val(),
					to_email: 'qodebrik@gmail.com'
				};

				// Send email using EmailJS
				// Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
				emailjs.send('service_sv2hsk3', 'template_qnticlm', templateParams)
					.then(function(response) {
						console.log('SUCCESS!', response.status, response.text);
						$submit.css('display', 'none');

						// Show beautiful glass effect success popup
						Swal.fire({
							title: '<span style="color: #4ade80; font-size: 42px;">✓</span>',
							html: '<h3 style="color: #fff; margin: 10px 0 8px; font-size: 20px;">Message Sent!</h3><p style="font-size: 14px; opacity: 0.85; margin: 0;">Thank you for reaching out!<br>We\'ll get back to you shortly.</p>',
							confirmButtonText: 'Great!',
							showCloseButton: false,
							backdrop: 'rgba(0, 0, 0, 0.7)',
							showClass: {
								popup: 'animate__animated animate__fadeInUp animate__faster'
							},
							hideClass: {
								popup: 'animate__animated animate__fadeOutDown animate__faster'
							},
							didOpen: () => {
								const popup = Swal.getPopup();
								popup.style.background = 'rgba(255, 255, 255, 0.1)';
								popup.style.backdropFilter = 'blur(20px)';
								popup.style.webkitBackdropFilter = 'blur(20px)';
								popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
								popup.style.borderRadius = '20px';
								popup.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
								popup.style.padding = '24px 32px';
								popup.style.width = 'auto';
								popup.style.maxWidth = '320px';
								popup.style.minWidth = '280px';

								// Style the confirm button
								const btn = popup.querySelector('.swal2-confirm');
								if (btn) {
									btn.style.background = 'linear-gradient(135deg, #d63447 0%, #ff6b6b 100%)';
									btn.style.border = 'none';
									btn.style.borderRadius = '10px';
									btn.style.padding = '12px 28px';
									btn.style.fontSize = '14px';
									btn.style.fontWeight = '600';
									btn.style.boxShadow = '0 8px 20px rgba(214, 52, 71, 0.35)';
									btn.style.marginTop = '8px';
								}
							}
						});

						// Reset the form
						$('#contactForm')[0].reset();
						$('.form-group').removeClass('field--not-empty');

					}, function(error) {
						console.log('FAILED...', error);
						$submit.css('display', 'none');

						// Show error popup with glass effect
						Swal.fire({
							icon: 'error',
							title: 'Oops!',
							text: 'Something went wrong. Please try again or email us directly.',
							confirmButtonText: 'Try Again',
							confirmButtonColor: '#d63447',
							color: '#ffffff',
							backdrop: 'rgba(0, 0, 0, 0.7)',
							showClass: {
								popup: 'animate__animated animate__shakeX'
							},
							didOpen: () => {
								const popup = Swal.getPopup();
								popup.style.background = 'rgba(255, 255, 255, 0.1)';
								popup.style.backdropFilter = 'blur(20px)';
								popup.style.webkitBackdropFilter = 'blur(20px)';
								popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
								popup.style.borderRadius = '24px';
								popup.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';

								const btn = popup.querySelector('.swal2-confirm');
								if (btn) {
									btn.style.background = 'linear-gradient(135deg, #d63447 0%, #ff6b6b 100%)';
									btn.style.border = 'none';
									btn.style.borderRadius = '12px';
									btn.style.padding = '14px 32px';
									btn.style.fontSize = '16px';
									btn.style.fontWeight = '600';
								}
							}
						});
					});
			}

		} );
	}
};

var stickyFillPlugin = function() {
	var elements = document.querySelectorAll('.unslate_co--sticky');
	Stickyfill.add(elements);
};

var animateReveal = function() {


	var controller = new ScrollMagic.Controller();
	
	var greveal = $('.gsap-reveal');

	// gsap reveal
	$('.gsap-reveal').each(function() {
		$(this).append('<span class="cover"></span>');
	});
	if ( greveal.length ) {
		var revealNum = 0;
		greveal.each(function() {
			var cover = $(this).find('.cover');

			var tl = new TimelineMax();

			setTimeout(function() {
				tl
					.fromTo(cover, 2, { skewX: 0 }, { xPercent: 101, transformOrigin: "0% 100%", ease:Expo.easeInOut })
			}, revealNum * 0);
			
			var scene = new ScrollMagic.Scene({
				triggerElement: this,
				duration: "0%",
				reverse: false,
				offset: "-300%",
			})
			.setTween(tl)
			.addTo(controller);

			revealNum++;

		});
	}

	// gsap reveal hero
	$('.gsap-reveal-hero').each(function() {
		var html = $(this).html();
		$(this).html('<span class="reveal-wrap"><span class="cover"></span><span class="reveal-content">'+html+'</span></span>');
	});
	var grevealhero = $('.gsap-reveal-hero');

	if ( grevealhero.length ) {
		var heroNum = 0;
		grevealhero.each(function() {

			var cover = $(this).find('.cover'),
				revealContent = $(this).find('.reveal-content');

			var tl2 = new TimelineMax();

			setTimeout(function() {

				tl2
					.to(cover, 1, { marginLeft: '0', ease:Expo.easeInOut, onComplete() {
						tl2.set(revealContent, { x: 0 });
						tl2.to(cover, 1, { marginLeft: '102%', ease:Expo.easeInOut });
					} } )
			}, heroNum * 0 );

			var scene = new ScrollMagic.Scene({
				triggerElement: this,
				duration: "0%",
				reverse: false,
				offset: "-300%",
			})
			.setTween(tl2)
			.addTo(controller);

			heroNum++;
		});
	}

}

