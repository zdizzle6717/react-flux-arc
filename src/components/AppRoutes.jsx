'use strict';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import AlertActions from '../library/alerts/actions/AlertActions';
import routes from '../routes';
import authorizedRoutesConfig from '../constants/authorizedRoutesConfig';
import scrollTo from '../library/utilities/scrollTo';
import roleConfig from '../../roleConfig';
import createUserStore from '../library/authentication/stores/UserStore';
const UserStore = createUserStore(roleConfig);

export default class AppRoutes extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			authenticated: false,
			currentUser: {}
		}

		this.onUserChange = this.onUserChange.bind(this);
		this.onViewChange = this.onViewChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
	}


	componentWillMount() {
		UserStore.addChangeListener(this.onUserChange);
		setTimeout(() => {
			let viewListener = browserHistory.listen((location) => {
				this.onViewChange(location);
			});
		});
	}

	onViewChange(location) {
		if (!this.state.authenticated) {
			authorizedRoutesConfig.forEach((route) => {
				if (location.pathname.indexOf(route.path) !== -1) {
					this.showAlert('notAuthenticated');
					UserStore.setRedirectRoute(location.pathname);
					browserHistory.push('/login');
				}
			})
		} else {
			let homeState = UserStore.getUser().roleConfig ? UserStore.getUser().roleConfig.homeState : '/';
			UserStore.setRedirectRoute(homeState);

			authorizedRoutesConfig.forEach((route) => {
				if (location.pathname.indexOf(route.path) !== -1) {
					let accessGranted = UserStore.checkAuthorization(route.accessControl);
					if (accessGranted) {
						return;
					} else {
						this.showAlert('notAuthorized');
						browserHistory.push('/');
					}
				}
			})
		}
	}

	onUserChange() {
		this.setState({
			authenticated: UserStore.checkAuthentication(),
			currentUser: UserStore.getUser()
		})
	}

	componentWillUnmount() {
		viewListener();
		UserStore.removeChangeListener(this.onUserChange);
	}

	showAlert(selector) {
		const alerts = {
			'notAuthenticated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Not Authenticated',
					message: 'Please login or register to continue.',
					type: 'info',
					delay: 3000
				});
			},
			'notAuthorized': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Not Authorized',
					message: 'Redirected: You do not have authorization to view this content.',
					type: 'error',
					delay: 3000
				});
			},
		}

		return alerts[selector]();
	}

	render() {
	    return (
			<Router history={browserHistory} routes={routes} onUpdate={() => scrollTo(0, 150)}/>
	    );
	}
}

AppRoutes.childContextTypes = {
	'test': React.PropTypes.string
}
