'use strict';

// NOTE: Common input handlers for forms

const updateCheckBox = (event, stateObj) => {
	let value = stateObj[event.target.name] || false;
	stateObj[event.target.name] = !value;
	return stateObj;
};

const updateInput = (event, stateObj) => {
	stateObj[event.target.name] = event.target.value;
	return stateObj;
};

const updateRadioButton = (event, name, stateObj) => {
	stateObj[name] = event.target.value;
	return stateObj;
};

const updateSearchSuggestion = (event, suggestionKey, stateObj) => {
	if (event.target.suggestionObject) {
		stateObj[event.target.name] = event.target.suggestionObject[suggestionKey];
	} else {
		stateObj[event.target.name] = event.target.value;
	}
	return stateObj;
}

export {
	updateCheckBox,
	updateInput,
	updateRadioButton,
	updateSearchSuggestion
};
