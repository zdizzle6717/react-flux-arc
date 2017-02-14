'use strict'

import { browserHistory } from 'react-router';
import axios from 'axios';
import AlertActions from './library/alerts/actions/AlertActions';
import { LoaderActions } from './library/loader';
import roleConfig from '../roleConfig';
import UserActions from './library/authentication/actions/UserActions';
import createUserStore from './library/authentication/stores/UserStore';
let UserStore = createUserStore(roleConfig);

let timer;
let numLoadings = 0;
let _timeout = 350;

const initInterceptors = (baseUrl = 'http://localhost:8000/api/', timeout = _timeout) => {
	// Global axios config
	axios.defaults.baseURL = baseUrl;

	// Global axios interceptor
	axios.interceptors.request.use((config) => {

		let token = UserStore.getUser().id_token;

		if (token) {
		    config.headers.authorization = 'Bearer ' + token;
		}

		numLoadings++;

		if (numLoadings < 2) {
			timer = setTimeout(() => {
				LoaderActions.showLoader();
			}, timeout);
		}

	    return config;
	});
	axios.interceptors.response.use((response) => {
		if (numLoadings === 0) { return response; }

		if (numLoadings < 2) {
			clearTimeout(timer);
			LoaderActions.hideLoader();
		}
		numLoadings--;

	    return response;
	}, (error) => {
		if (error.response) {
			if (error.response.status == 401 || error.response.data.statusCode == 401) {
				UserActions.logout();
				AlertActions.addAlert({
					show: true,
					title: 'Not Authorized',
					message: 'Redirected: You do not have authorization to view this content or your session has expired. Please login to continue.',
					type: 'error',
					delay: 3000
				});
				browserHistory.push('/login');
			}
		}

		if (numLoadings === 0) {
			Promise.reject(error.response.data);
		}

		if (numLoadings < 2) {
			clearTimeout(timer);
			LoaderActions.hideLoader();
		}
		numLoadings--;

		return Promise.reject(error.response.data);
	});
}

export default initInterceptors;
