'use strict';

import AppDispatcher from '../../../dispatcher';
import AlertConstants from '../constants/AlertConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'alert:change';

let _alerts = [];
let _alertTimeout = 5000;

function setAlerts(alert) {
	alert.index = _alerts.push(alert) - 1;
	if (alert.delay !== -1) {
		removeAlert(alert);
	}
}

function removeAlert(alert, skipTimeout = false) {
	if (!skipTimeout) {
		let delay = alert.delay || _alertTimeout;
		setTimeout(() => {
			removeFromAlerts(alert)
		}, delay);
	} else {
		removeFromAlerts(alert);
	}

	function removeFromAlerts(alert) {
		_alerts.filter((currentAlert, index) => {
			if (currentAlert.index === alert.index) {
				_alerts.splice(index, 1)
				AlertStore.emit(CHANGE_EVENT);
			}
		});
	}
}

class AlertStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getAlerts() {
        return _alerts;
    }

	closeAlert(alert) {
		removeAlert(alert, true);
	}

}

const AlertStore = new AlertStoreClass();

AlertStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case AlertConstants.ADD_ALERT:
            setAlerts(action.alert);
            AlertStore.emitChange();
            break;

        default:
    }

});

export default AlertStore;
