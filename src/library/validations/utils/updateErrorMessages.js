'use strict';

function addErrorMessage(currentErrors, key, message) {

	let errorExists = false;
	let error = {
		key,
		message
	};

	for (let i in currentErrors) {
		if (currentErrors[i].key === error.key) {
			errorExists = true;
			currentErrors[i] = error;
			return currentErrors;
		}
	}
	if (!errorExists) {
		currentErrors.push(error);
		return currentErrors;
	}
}

function removeErrorMessage(currentErrors, key) {
	for (let i in currentErrors) {
		if (currentErrors[i].key === key) {
			currentErrors.splice(i, 1);
			return currentErrors;
		}
	}
	return currentErrors;
}

export {
	addErrorMessage,
	removeErrorMessage
};
