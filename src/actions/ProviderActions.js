'use strict';

import AppDispatcher from '../dispatcher';
import ProviderConstants from '../constants/ProviderConstants';
import ProviderService from '../services/ProviderService';

export default {
    getProviders: () => {
        return ProviderService
            .getProviders()
            .then(providers => {
                AppDispatcher.dispatch({
                    actionType: ProviderConstants.GET_PROVIDERS,
                    providers: providers
                });
				return providers;
            });
    },

    getProvider: (id) => {
        return ProviderService
            .getProvider(id)
            .then(provider => {
                AppDispatcher.dispatch({
                    actionType: ProviderConstants.GET_PROVIDER,
                    provider: provider
                });
				return provider;
            });
    },

	createProvider: (data) => {
        return ProviderService
            .createProvider(data)
            .then(provider => {
                AppDispatcher.dispatch({
                    actionType: ProviderConstants.CREATE_PROVIDER,
                    provider: provider
                });
				return provider;
            });
    },

	updateProvider: (id, data) => {
        return ProviderService
            .updateProvider(id, data)
            .then(provider => {
                AppDispatcher.dispatch({
                    actionType: ProviderConstants.UPDATE_PROVIDER,
                    provider: provider
                });
				return provider;
            });
    },

	removeProvider: (id) => {
        return ProviderService
            .removeProvider(id)
            .then(provider => {
                AppDispatcher.dispatch({
                    actionType: ProviderConstants.REMOVE_PROVIDER,
                    id: id
                });
				return provider;
            });
    }
};
