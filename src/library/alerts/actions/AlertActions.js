'use strict';

import AppDispatcher from '../../../dispatcher';
import AlertConstants from '../constants/AlertConstants';

export default {
	addAlert: (alert) => {
		alert.show = true;
		AppDispatcher.dispatch({
			actionType: AlertConstants.ADD_ALERT,
			alert: alert
		});
	}
}
