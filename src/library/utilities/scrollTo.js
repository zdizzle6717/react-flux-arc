'use strict';

// NOTE: Scrolls to the designated number of pixels from top over the duration specified

const scrollTo = (to, duration) => {
	let start = window.pageYOffset || document.documentElement.scrollTop,
	change = to - start,
	currentTime = 0,
	increment = 20;

	//t = current time
	//b = start value
	//c = change in value
	//d = duration
	Math.easeInOutQuad = function (t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	let animateScroll = function(){
	   currentTime += increment;
	   let val = Math.easeInOutQuad(currentTime, start, change, duration);
	   document.body.scrollTop = val;
	   document.documentElement.scrollTop = val;
	   if(currentTime < duration) {
		   setTimeout(animateScroll, increment);
	   }
	};
	animateScroll();
}


export default scrollTo;
