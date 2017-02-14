'use strict';

import AppDispatcher from '../../../dispatcher';
import FormConstants from '../constants/FormConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'form:change';

let _forms = {};
let _validity = {};

function setInput(newInput) {
	let inputAlreadyExists = false;
	if (!newInput.formName) {
		console.log('Input has no form property');
		return;
	}
	if (_forms[newInput.formName]) {
		_forms[newInput.formName].forEach((input, i) => {
			if (input.name === newInput.name) {
				inputAlreadyExists = true;
				_forms[newInput.formName][i] = newInput;
				return setValidity(newInput.formName)
			}
		});
		if (!inputAlreadyExists) {
			_forms[newInput.formName].push(newInput);
			return setValidity(newInput.formName);
		}
	} else {
		_forms[newInput.formName] = [];
		_forms[newInput.formName].push(newInput);
	}
}

function removeInput(oldInput) {
	_forms[oldInput.formName].forEach((input, i) => {
		if (input.name === oldInput.name) {
			_forms[input.formName].splice(i, 1);
			return setValidity(input.formName);
		}
	});
}

function setValidity(formName) {
	_validity[formName] = true;
	_forms[formName].forEach((input, i) => {
		if (input.valid === false) {
			_validity[formName] = false;
			return _validity[formName];
		}
	});

	if (_validity[formName]) {
		return _validity[formName];
	}
}

class FormStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

	getInput(formName, inputName) {
		let response = false;
		if (_forms[formName]) {
			_forms[formName].forEach((input, i) => {
				if (input.name === inputName) {
					response = input;
				}
			})
		}
		return response;
	}

    getForm(formName) {
        return _forms[formName];
    }

	getValidity(formName) {
		return _validity[formName];
	}

	getErrorCount(formName) {
		let count = 0;
		if (!_forms[formName]) {
			return 0;
		}
		_forms[formName].forEach((input) => {
			if (input.valid === false) {
				count++;
			}
		});
		return count;
	}

	resetForm(formName) {
		_forms[formName] = [];
		_validity[formName] = {};
	}

	resetAllForms() {
		_forms = {};
		_validity = {};
	}

}

const FormStore = new FormStoreClass();

FormStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case FormConstants.ADD_INPUT:
            setInput(action.input);
            FormStore.emitChange();
            break;

		case FormConstants.REMOVE_INPUT:
            removeInput(action.input);
            FormStore.emitChange();
            break;

        default:
    }

});

export default FormStore;
