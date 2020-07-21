function boostDigits() {
	let digitsItems = document.querySelectorAll('.digits-boost-js');
	for (let item of digitsItems) {
		//replace numbers by 0
		let number = item.innerHTML.replace('.', '');
		item.customPropInnerNumber = number;
		item.innerHTML = '0';
	}

	window.addEventListener('scroll', trigerDigitsCounter, { passive: true });
}

function trigerDigitsCounter() {
	let firstDigitItem = document.querySelector('.digits-boost-js');
	if (!firstDigitItem) return
	let digitsItemsTop = $(firstDigitItem).offset().top;
	let windowScroll = window.scrollY + vhh(100);

	if (windowScroll > digitsItemsTop + 50) {
		window.removeEventListener('scroll', trigerDigitsCounter, { passive: true });

		let digitsItems = document.querySelectorAll('.digits-boost-js');
		for (let item of digitsItems) {
			fromZeroToDigit(item);
		}
	}
}
//
function fromZeroToDigit(item) {
	let currNum = Number(item.innerHTML.replace('.', ''));
	let targetNum = Number(item.customPropInnerNumber);
	let difference = targetNum - currNum;
	let step = Math.floor(difference / 25); //
	if (step === 0) step = 1;

	if (difference > 0) {
		let newVal = currNum + step;
		item.innerHTML = placeDot(newVal);

		window.setTimeout(function () {
			fromZeroToDigit(item);
		}, 10); //
	}

}

function placeDot(number) {
	if (number < 1000) return number

	let strArr = String(number).split('');
	strArr.splice(-3, 0, '.'); // 3
	return strArr.join('')
}

function vhh(v) {
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return (v * h) / 100;
}
boostDigits();