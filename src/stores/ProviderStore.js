import AppDispatcher from '../dispatcher';
import ProviderConstants from '../constants/ProviderConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'provider:change';

let _providers = [];
let _provider = {};

function setProviders(providers) {
	if (providers) {
		_providers = providers;
	}
}

function setProvider(provider) {
	if (provider) {
		_provider = provider;
	}
}

function removeProvider(id) {
	let index = _providers.findIndex((provider) => provider.id === id);

	if (index !== -1) {
		_providers.splice(index, 1);
	}
	return _providers;
}

class ProviderStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getProviders() {
        return _providers;
    }

    getProvider() {
        return _provider;
    }

}

const ProviderStore = new ProviderStoreClass();

ProviderStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case ProviderConstants.GET_PROVIDER:
            setProvider(action.provider);
            ProviderStore.emitChange();
            break;

        case ProviderConstants.GET_PROVIDERS:
            setProviders(action.providers);
            ProviderStore.emitChange();
            break;

		case ProviderConstants.CREATE_PROVIDER:
            setProvider(action.provider);
            ProviderStore.emitChange();
            break;

		case ProviderConstants.UPDATE_PROVIDER:
            setProvider(action.provider);
            ProviderStore.emitChange();
            break;

		case ProviderConstants.REMOVE_PROVIDER:
            removeProvider(action.id);
            ProviderStore.emitChange();
            break;

        default:
    }

});

export default ProviderStore;
