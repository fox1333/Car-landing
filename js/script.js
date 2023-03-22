//Ibg
function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();
//Menu Burger
$('.icon-menu').click(function (event) {
	$(this).toggleClass('active');
	$('.menu__body').toggleClass('active');
	$('body').toggleClass('lock');
});
//
//Fixed Header
window.onscroll = function showHeader() {
	var header = document.querySelector('.header__row');

	if (window.pageYOffset > 70) {
		header.classList.add('header__fixed');
	} else {
		header.classList.remove('header__fixed');
	}
};
//
//Animation on scroll
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active_animation');
			} else {
				if (!animItem.classList.contains('_active_stop_animation')) {
					animItem.classList.remove('_active_animation');
				};
			};
		};
	};

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	};

	setTimeout(() => {
		animOnScroll();
	}, 300);

};
//

//header__swiper
new Swiper('.header__swiper__container', {
	loop: true,
	slidesPerView: 1,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	speed: 500,
	direction: 'vertical',
	// Bullet
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});
//
//car-info Brands
class ItcTabs {
	constructor(target, config) {
		const defaultConfig = {};
		this._config = Object.assign(defaultConfig, config);
		this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
		this._elButtons = this._elTabs.querySelectorAll('.brands__btn');
		this._elPanes = this._elTabs.querySelectorAll('.car-info__content');
		this._eventShow = new Event('tab.itc.change');
		this._init();
		this._events();
	}
	_init() {
		this._elTabs.setAttribute('role', 'tablist');
		this._elButtons.forEach((el, index) => {
			el.dataset.index = index;
			el.setAttribute('role', 'tab');
			this._elPanes[index].setAttribute('role', 'tabpanel');
		});
	}
	show(elLinkTarget) {
		const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
		const elLinkActive = this._elTabs.querySelector('.brands__btn__active');
		const elPaneShow = this._elTabs.querySelector('.car-info__content_show');
		if (elLinkTarget === elLinkActive) {
			return;
		}
		elLinkActive ? elLinkActive.classList.remove('brands__btn__active') : null;
		elPaneShow ? elPaneShow.classList.remove('car-info__content_show') : null;
		elLinkTarget.classList.add('brands__btn__active');
		elPaneTarget.classList.add('car-info__content_show');
		this._elTabs.dispatchEvent(this._eventShow);
		elLinkTarget.focus();
	}
	showByIndex(index) {
		const elLinkTarget = this._elButtons[index];
		elLinkTarget ? this.show(elLinkTarget) : null;
	};
	_events() {
		this._elTabs.addEventListener('click', (e) => {
			const target = e.target.closest('.brands__btn');
			if (target) {
				e.preventDefault();
				this.show(target);
			}
		});
	}
}

// инициализация .tabs как табов
new ItcTabs('.car-info__brands');
//

//Swiper
new Swiper('.order-car__swiper__container', {
	loop: true,
	slidesPerView: 1,
	// autoplay: {
	// 	delay: 3000,
	// },
	speed: 500,

	// Bullet
	pagination: {
		el: '.order-car__swiper_pagination',
		dynamicBullets: true,
		clickable: true,
	},
});
//
//Advanced Search
const headers = document.querySelectorAll("[data-name='spoiler-title']");

headers.forEach(function (item) {
	item.addEventListener("click", headerClick);
});

function headerClick() {
	this.nextElementSibling.classList.toggle("spoiler-body");
}

function changeText(ev) {
	if (ev.getAttribute('data-show') === "true") {
		ev.innerText = "Show advanced search"
		ev.setAttribute('data-show', "false");
	}
	else {
		ev.innerText = "Hide advanced search"
		ev.setAttribute('data-show', "true");
	}
}
//