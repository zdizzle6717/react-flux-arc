'use strict';

// NOTE: Returns an array of numbers each with a type of string unless 'typeOfNumber is set to true'

const _range = (min, max, typeOfNumber = false) => {
		let rangeArray = [];
		for (let i = min; i <= max; i++) {
			if (typeOfNumber) {
				rangeArray.push(i);
			} else {
				rangeArray.push(`${i}`);
			}
		}
		return rangeArray;
	};

export default _range;
