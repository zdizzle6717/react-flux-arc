'use strict';

import AppDispatcher from '../../../dispatcher';
import LoaderConstants from '../constants/LoaderConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'loader:change';

let _loader = false;

function showLoader() {
	_loader = true;
}

function hideLoader() {
	_loader = false;
}

class LoaderStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

	getLoader() {
        return _loader;
    }

}

const LoaderStore = new LoaderStoreClass();

LoaderStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case LoaderConstants.SHOW_LOADER:
            showLoader();
            LoaderStore.emitChange();
            break;

		case LoaderConstants.HIDE_LOADER:
            hideLoader();
            LoaderStore.emitChange();
            break;

        default:
    }

});

export default LoaderStore;
