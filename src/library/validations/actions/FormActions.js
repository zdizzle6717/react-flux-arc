'use strict';

import AppDispatcher from '../../../dispatcher';
import FormConstants from '../constants/FormConstants';

export default {
	addInput: (input) => {
		AppDispatcher.dispatch({
			actionType: FormConstants.ADD_INPUT,
			input: input
		});
	},
	removeInput: (input) => {
		AppDispatcher.dispatch({
			actionType: FormConstants.REMOVE_INPUT,
			input: input
		});
	}
}
