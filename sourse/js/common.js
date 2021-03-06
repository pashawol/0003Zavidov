
const $ = jQuery;
const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	body: document.querySelector("body"),

	modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		$(".link-modal").click(function () {
			let th = $(this);
			let modal = $(th.attr('href'));
			let content = {
				title: th.data('title'),
				text: th.data('text'),
				btn: th.data('btn'),
				order: th.data('order')
			}
			modal.find('.ttu').html(content.title);
			modal.find('.after-headline').html(content.text);
			modal.find('.btn').val(content.btn);
			modal.find('.order').val(content.order);
		})
	},
	// /magnificPopupCall
	toggleMenu() {
		let _this = this;
		if (_this.btnToggleMenuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {

					_this.btnToggleMenuMobile.forEach(function (element) {
						element.classList.toggle("on");
					});
					_this.menuMobile.classList.toggle("active");
					_this.body.classList.toggle("fixed");

					return false;
				});
			});
		}
	},

	closeMenu() {
		let _this = this;
		if (_this.menuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");

			});
			_this.menuMobile.classList.remove("active");
			_this.body.classList.remove("fixed");
		}

	},

	mobileMenu() {
		// закрыть/открыть мобильное меню
		let _this = this;
		if (_this.menuMobileLink) {

			_this.toggleMenu();
			// _this.menuMobileLink.forEach(function (element) {
			// 	element.addEventListener('click', function (e) {
			// 		console.log(element);
			// 		_this.closeMenu();

			// 	});
			// })
			document.addEventListener('mouseup', function (event) {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					_this.closeMenu();

				}
			});
		}
	},
	// /mobileMenu

	// табы  . 
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).show().addClass('active');

		});
	},
	// /табы  
	inputMask() { 
			var input = document.querySelectorAll('[type="tel"]');
			input.forEach(function (element) { 
				window.intlTelInput(element, {
					preferredCountries: ["ru", "by"], 
					// any initialisation options go here
				}); 
			}); 
	},
	// /inputMask
	customRange() {
		function InputFormat() {
			// $('.input_from, .input_to').toFixed(2,0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '0')
		}
		InputFormat();
						function currencyFormat(num) {
							return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
						}
			
						// currencyFormat(num)
		$(".range-wrap").each(function () {
			let _this = $(this);
			var $range= _this.find(".slider-js");
			var $inputFrom = _this.find(".input_from");
			var $inputTo = _this.find(".input_to");
			var instance, from, to,
				min = $range.data('min'),
				max = $range.data('max');
			$range.ionRangeSlider({
				skin: "round",
				type: "double",
				grid: false,
				grid_snap: false,
				hide_min_max: true,
				hide_from_to: true,
				onStart: updateInputs,
				onChange: updateInputs,
				onFinish: updateInputs
			});
			instance = $range.data("ionRangeSlider");

			function updateInputs(data) {
				from = data.from;
				to = data.to;

				$inputFrom.prop("value", currencyFormat(from));
				$inputTo.prop("value", currencyFormat(to));
				// InputFormat();
			}

			$inputFrom.on("change input ", function () {
				var val = +($(this).prop("value").replace(/\s/g, ''));
				// validate
				if (val < min) {
					val = min;
				} else if (val > to) {
					val = to;
				}
				
				instance.update({
					from: val
				}); 
				$(this).prop("value", currencyFormat(val)); 
				console.log(val)
			});

			$inputTo.on("change input ", function () {
				var val = +($(this).prop("value").replace(/\s/g, ''));

				// validate
				if (val < from) {
					val = from;
				} else if (val > max) {
					val = max;
				}

				instance.update({
					to: val
				}); 
				$(this).prop("value", currencyFormat(val));
			});

		})
	},
};

function eventHandler() { 
	JSCCommon.modalCall();

	JSCCommon.tabscostume('tabs');

	JSCCommon.mobileMenu();

	JSCCommon.inputMask();
	JSCCommon.customRange();

 

	// /закрыть/открыть мобильное меню

	function heightses() {
 
		// скрывает моб меню

		const topH = 0;
		let stickyElement = document.querySelector('.fixed-line');

		function lineTop() {
			if ($(window).scrollTop() > topH) {

				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		}
		window.onscroll = () => {

			lineTop();
		};
		lineTop();
		// конец добавил
		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	window.addEventListener('resize', () => {
		heightses();

	}, { passive: true });

	heightses();

	// листалка по стр
	$(" .top-nav li a, .scroll-link").click(function () {
		const elementClick = $(this).attr("href") + 120;
		const destination = $(elementClick).offset().top;

		$('html, body').animate({ scrollTop: destination }, 1100);

		return false;
	});

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
	}
	const swiper4 = new Swiper('.sCategories__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 20,
		breakpoints: {

			768: {
				slidesPerView: 2,
				navigation: {
					nextEl: '.sCategories .swiper-button-next',
					prevEl: '.sCategories .swiper-button-prev',
				},
				992: {

					spaceBetween: 44,
				}
			}
		}
	});
	
	const swipersCatalog = new Swiper('.sCatalog__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		watchOverflow: true,
		slidesPerView: 1, 
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.sCatalog .swiper-button-next',
			prevEl: '.sCatalog .swiper-button-prev',
		},
		breakpoints: { 
			768: { 
				slidesPerView: 2,
			},
			
			992: { 
				slidesPerView: 3,
			},

			1200: { 
				slidesPerView: 4,
			},
		}
	});
	
	const swipersRew = new Swiper('.sRews__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		watchOverflow: true,
		slidesPerView: 1, 
		spaceBetween: 30,
		autoHeight: true,
		loop: true,
		navigation: {
			nextEl: '.sRews .swiper-button-next',
			prevEl: '.sRews .swiper-button-prev',
		},
		pagination: {
			el: '.sRews .swiper-pagination',
			type: 'bullets', 
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
		},
	});

	$('.acardion-js').click(function(){
		$(this).parent().find('.acardion-toggle').slideToggle();
		$(this).toggleClass('active');
	})


	$(".sTeam__btn").click(function () {
		$(".sTeam__col:hidden").fadeIn(() => $(this).hide());
	})
  
	$(".sRews__more").click(function () {
		$(this).toggleClass('show').parent().find('p').toggleClass('show')
		swipersRew.updateAutoHeight();
	})
	var wow = new WOW({
		mobile: false,
		animateClass: 'animate__animated',
	});
	wow.init();


	$(".menu-mobile__link").click(function () {
		if ($(this).next()) {
			$(this).next().slideToggle();
			return false;
		}
	})
	// paralax

 	//luckyone JS

	$('.sContact__header').click(function () {
		//
		if (window.matchMedia("(min-width: 992px)").matches) {
			return
		}

		$(this).toggleClass('active');
		$(this.parentElement).find('.sContact__txt-block').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	//07 object page

	//03 slider
	let objSliderThumb = new Swiper('.object-slider-thumb-js', {
		slidesPerView: 'auto',
		//bp
		breakpoints: {
			320 : {
				spaceBetween: 18,
			},
			1200 : {
				spaceBetween: 22,
			},
		},
		//
	});

	let objSlider = new Swiper('.object-slider-js', {
		slidesPerView: '1',
		spaceBetween: 10,
		loop: true,
		//
		navigation: {
			nextEl: '.object-next-js',
			prevEl: '.object-prev-js',
		},
		//
		thumbs: {
			swiper: objSliderThumb
		},
		//
		lazy: {
			loadPrevNext: true,
		},
	});

	//chars toggle
	$('.other-data__header').click(function () {
		//
		if (window.matchMedia("(min-width: 992px)").matches) {
			return
		}

		$(this).toggleClass('active');
		$(this.parentElement).find('.other-data__content').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	//objectPageCloud


	//end luckyone js

	function animateCloud(el) {
		var scene = document.getElementById(el);
		if (scene) {

			var parallaxInstance = new Parallax(scene, {
				invertX: false,
				invertY: false,
				// limitX: 200,
				// limitY: 200
			});
		}
	}
	let blockWithAnimate = [
		'sCategories-inner',
		'sForm-inner1',
		'sForm-inner2',
		'sMap-inner',
		'sCatalog-inner',
		'sDo-inner',
		'sLogos-inner1',
		'sAbout-inner',
		'sVideo-inner',
		'sContacts-inner',
		'sBlog-inner',
		'sFilter-inner',
		'objectPageCloud',
	];
	blockWithAnimate.forEach(element => animateCloud(element));
 

	var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
	if (isIE11) {
		$("body").prepend(`<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>`)

	}

	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// We listen to the resize event
	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, { passive: true });
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}



$(document).ready(function () {

	jQuery(function ($) {
		var counterUp = window.counterUp["default"]; // import counterUp from "counterup2"

		var $counters = $(".counter");

		/* Start counting, do this on DOM ready or with Waypoints. */
		$counters.each(function (ignore, counter) {
			var waypoint = new Waypoint({
				element: $(this),
				handler: function () {
					counterUp(counter, {
						duration: 1000,
						delay: 16
					});
					this.destroy();
				},
				offset: 'bottom-in-view',
			});
		});

	});
});