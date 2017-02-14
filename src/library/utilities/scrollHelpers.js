'use strict';

const scrollDown = (rowCount, element, selectedIndex, listArrLength) => {
			let listElement = element.getElementsByTagName('ul')[0];
			let rowHeight = element.getElementsByTagName('li')[0].offsetHeight;
			let nextRowNumber = selectedIndex + 2;
			if (nextRowNumber <= listArrLength) {
				if (nextRowNumber - (listElement.scrollTop / rowHeight) > rowCount) {
					listElement.scrollTop = (nextRowNumber - rowCount) * rowHeight;
				} else if (nextRowNumber - (listElement.scrollTop / rowHeight) < 1) {
					listElement.scrollTop = (nextRowNumber * rowHeight) - rowHeight;
				}
			}
		};
const scrollUp = (rowCount, element, selectedIndex) => {
	let listElement = element.getElementsByTagName('ul')[0];
	let rowHeight = element.getElementsByTagName('li')[0].offsetHeight;
	let containerHeight = rowCount * rowHeight;
	let selectedRow = selectedIndex + 1;
	let nextRowNumber = selectedIndex;
	if (nextRowNumber > -1) {
		if (nextRowNumber - (listElement.scrollTop / rowHeight) < 1) {
			listElement.scrollTop = (nextRowNumber - 1) * rowHeight ;
		} else if (nextRowNumber - (listElement.scrollTop / rowHeight) > rowCount) {
			listElement.scrollTop = (selectedRow * rowHeight) - (containerHeight + rowHeight);
		}
	}
};

export {
	scrollUp,
	scrollDown
}
