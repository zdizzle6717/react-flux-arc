'use strict';

import AppDispatcher from '../../../dispatcher';
import LoaderConstants from '../constants/LoaderConstants';

export default {
	showLoader: () => {
		AppDispatcher.dispatch({
			actionType: LoaderConstants.SHOW_LOADER
		});
	},
	hideLoader: () => {
		AppDispatcher.dispatch({
			actionType: LoaderConstants.HIDE_LOADER
		});
	},
}
