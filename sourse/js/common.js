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
		// mask for input
		var input = document.querySelector('[type="tel"]');
		window.intlTelInput(input, {
			preferredCountries: ["ru", "by"],

			// any initialisation options go here
		});
	},
	// /inputMask
	customRange() {
	 
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

				$inputFrom.prop("value", from);
				$inputTo.prop("value", to);
			}

			$inputFrom.on("change", function () {
				var val = $(this).prop("value");

				// validate
				if (val < min) {
					val = min;
				} else if (val > to) {
					val = to;
				}

				instance.update({
					from: val
				});

				$(this).prop("value", val);

			});

			$inputTo.on("change", function () {
				var val = $(this).prop("value");

				// validate
				if (val < from) {
					val = from;
				} else if (val > max) {
					val = max;
				}

				instance.update({
					to: val
				});

				$(this).prop("value", val);
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

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	$(".main-wrapper").after('<div class="pixel-perfect" style="background-image: url(screen/main.jpg);"></div>')
	// /добавляет подложку для pixel perfect



	// const url = document.location.href;
	// $.each($(".top-nav__nav a "), function() {

	// 	if (this.href == url) {
	// 		if ($(this).hasClass("top-nav__link") == true) {

	// 			$(this).addClass('top-nav__link-active');
	// 		}
	// 		if ($(this).hasClass("footer__link") == true) {

	// 			$(this).addClass('footer__link-active');
	// 		} 
	// 	}; 
	// }); 

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

	});

	heightses();

	// листалка по стр
	$(" .top-nav li a, .scroll-link").click(function () {
		const elementClick = $(this).attr("href");
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

	// modal window

	// custom Select
	// const element = document.querySelector('.js-choice');
	// /custom Select
 

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
	});
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
