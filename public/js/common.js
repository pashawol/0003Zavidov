"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var $ = jQuery;
var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	body: document.querySelector("body"),
	modalCall: function modalCall() {
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
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		$(".link-modal").click(function () {
			var th = $(this);
			var modal = $(th.attr('href'));
			var content = {
				title: th.data('title'),
				text: th.data('text'),
				btn: th.data('btn'),
				order: th.data('order')
			};
			modal.find('.ttu').html(content.title);
			modal.find('.after-headline').html(content.text);
			modal.find('.btn').val(content.btn);
			modal.find('.order').val(content.order);
		});
	},
	// /magnificPopupCall
	toggleMenu: function toggleMenu() {
		var _this = this;

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
	closeMenu: function closeMenu() {
		var _this = this;

		if (_this.menuMobile) {
			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});

			_this.menuMobile.classList.remove("active");

			_this.body.classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		// закрыть/открыть мобильное меню
		var _this = this;

		if (_this.menuMobileLink) {
			_this.toggleMenu(); // _this.menuMobileLink.forEach(function (element) {
			// 	element.addEventListener('click', function (e) {
			// 		console.log(element);
			// 		_this.closeMenu();
			// 	});
			// })


			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this.closeMenu();
				}
			});
		}
	},
	// /mobileMenu
	// табы  . 
	tabscostume: function tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).show().addClass('active');
		});
	},
	// /табы  
	inputMask: function inputMask() {
		var input = document.querySelectorAll('[type="tel"]');
		input.forEach(function (element) {
			window.intlTelInput(element, {
				preferredCountries: ["ru", "by"] // any initialisation options go here

			});
		});
	},
	// /inputMask
	customRange: function customRange() {
		function InputFormat() {// $('.input_from, .input_to').toFixed(2,0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '0')
		}

		InputFormat();

		function currencyFormat(num) {
			return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
		} // currencyFormat(num)


		$(".range-wrap").each(function () {
			var _this = $(this);

			var $range = _this.find(".slider-js");

			var $inputFrom = _this.find(".input_from");

			var $inputTo = _this.find(".input_to");

			var instance,
					from,
					to,
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
				$inputTo.prop("value", currencyFormat(to)); // InputFormat();
			}

			$inputFrom.on("change input ", function () {
				var val = +$(this).prop("value").replace(/\s/g, ''); // validate

				if (val < min) {
					val = min;
				} else if (val > to) {
					val = to;
				}

				instance.update({
					from: val
				});
				$(this).prop("value", currencyFormat(val));
				console.log(val);
			});
			$inputTo.on("change input ", function () {
				var val = +$(this).prop("value").replace(/\s/g, ''); // validate

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
		});
	}
};

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.customRange(); // /закрыть/открыть мобильное меню

	function heightses() {
		// скрывает моб меню
		var topH = 0;
		var stickyElement = document.querySelector('.fixed-line');

		function lineTop() {
			if ($(window).scrollTop() > topH) {
				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		}

		window.onscroll = function () {
			lineTop();
		};

		lineTop(); // конец добавил

		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	window.addEventListener('resize', function () {
		heightses();
	}, {
		passive: true
	});
	heightses(); // листалка по стр

	$(" .top-nav li a, .scroll-link").click(function () {
		var elementClick = $(this).attr("href") + 120;
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	});
	var defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		}
	};
	var swiper4 = new Swiper('.sCategories__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4
		},
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 20,
		breakpoints: {
			768: {
				slidesPerView: 2,
				navigation: {
					nextEl: '.sCategories .swiper-button-next',
					prevEl: '.sCategories .swiper-button-prev'
				},
				992: {
					spaceBetween: 44
				}
			}
		}
	}));
	var swipersCatalog = new Swiper('.sCatalog__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.sCatalog .swiper-button-next',
			prevEl: '.sCatalog .swiper-button-prev'
		},
		breakpoints: {
			768: {
				slidesPerView: 2
			},
			992: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 4
			}
		}
	}));
	var swipersRew = new Swiper('.sRews__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoHeight: true,
		loop: true,
		navigation: {
			nextEl: '.sRews .swiper-button-next',
			prevEl: '.sRews .swiper-button-prev'
		},
		pagination: {
			el: '.sRews .swiper-pagination',
			type: 'bullets',
			clickable: true,
			renderBullet: function renderBullet(index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
		}
	}));
	$('.acardion-js').click(function () {
		$(this).parent().find('.acardion-toggle').slideToggle();
		$(this).toggleClass('active');
	});
	$(".sTeam__btn").click(function () {
		var _this2 = this;

		$(".sTeam__col:hidden").fadeIn(function () {
			return $(_this2).hide();
		});
	});
	$(".sRews__more").click(function () {
		$(this).toggleClass('show').parent().find('p').toggleClass('show');
		swipersRew.updateAutoHeight();
	});
	var wow = new WOW({
		mobile: false,
		animateClass: 'animate__animated'
	});
	wow.init();
	$(".menu-mobile__link").click(function () {
		if ($(this).next()) {
			$(this).next().slideToggle();
			return false;
		}
	}); // paralax
	//luckyone JS

	$('.sContact__header').click(function () {
		//
		if (window.matchMedia("(min-width: 992px)").matches) {
			return;
		}

		$(this).toggleClass('active');
		$(this.parentElement).find('.sContact__txt-block').slideToggle(function () {
			$(this).toggleClass('active');
		});
	}); //07 object page
	//03 slider

	var objSliderThumb = new Swiper('.object-slider-thumb-js', {
		slidesPerView: 'auto',
		//bp
		breakpoints: {
			320: {
				spaceBetween: 18
			},
			1200: {
				spaceBetween: 22
			}
		} //

	});
	var objSlider = new Swiper('.object-slider-js', {
		slidesPerView: '1',
		spaceBetween: 10,
		loop: true,
		//
		navigation: {
			nextEl: '.object-next-js',
			prevEl: '.object-prev-js'
		},
		//
		thumbs: {
			swiper: objSliderThumb
		},
		//
		lazy: {
			loadPrevNext: true
		}
	}); //chars toggle

	$('.other-data__header').click(function () {
		//
		if (window.matchMedia("(min-width: 992px)").matches) {
			return;
		}

		$(this).toggleClass('active');
		$(this.parentElement).find('.other-data__content').slideToggle(function () {
			$(this).toggleClass('active');
		});
	}); //objectPageCloud
	//end luckyone js

	function animateCloud(el) {
		var scene = document.getElementById(el);

		if (scene) {
			var parallaxInstance = new Parallax(scene, {
				invertX: false,
				invertY: false // limitX: 200,
				// limitY: 200

			});
		}
	}

	var blockWithAnimate = ['sCategories-inner', 'sForm-inner1', 'sForm-inner2', 'sMap-inner', 'sCatalog-inner', 'sDo-inner', 'sLogos-inner1', 'sAbout-inner', 'sVideo-inner', 'sContacts-inner', 'sBlog-inner', 'sFilter-inner', 'objectPageCloud'];
	blockWithAnimate.forEach(function (element) {
		return animateCloud(element);
	});
	var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

	if (isIE11) {
		$("body").prepend("<p   class=\"browsehappy container\">\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0432\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435 \u0443\u0441\u0442\u0430\u0440\u0435\u0432\u0448\u0438\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, <a href=\"http://browsehappy.com/\" target=\"_blank\">\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0432\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440</a>, \u0447\u0442\u043E\u0431\u044B \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C, \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0433\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 \u0438 \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C.</p>");
	} // First we get the viewport height and we multiple it by 1% to get a value for a vh unit


	var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

	document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

	window.addEventListener('resize', function () {
		// We execute the same script as before
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
	}, {
		passive: true
	});
}

;

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
				handler: function handler() {
					counterUp(counter, {
						duration: 1000,
						delay: 16
					});
					this.destroy();
				},
				offset: 'bottom-in-view'
			});
		});
	});
});