'use strict';

import React from 'react';
import classNames from 'classnames';
import Animation from 'react-addons-css-transition-group';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Link, browserHistory } from 'react-router';
import UserActions from '../../library/authentication/actions/UserActions';
import roleConfig from '../../../roleConfig';
import createUserStore from '../../library/authentication/stores/UserStore';
const UserStore = createUserStore(roleConfig);

export default class TopNav extends React.Component {
	constructor() {
		super();

		this.state = {
			authenticated: false,
			showMobileMenu: false
		}

		this.onUserChange = this.onUserChange.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.logout = this.logout.bind(this);
	}


	componentWillMount() {
		this.setState({
			authenticated: UserStore.checkAuthentication()
		});
		UserStore.addChangeListener(this.onUserChange);
	}

	componentWillUnmount() {
		UserStore.removeChangeListener(this.onUserChange);
	}

	onUserChange() {
		this.setState({
			authenticated: UserStore.checkAuthentication()
		});
	}

	toggleMenu() {
		this.setState({
			showMobileMenu: !this.state.showMobileMenu
		});
	}

	closeMenu() {
		this.setState({
			showMobileMenu: false
		});
	}

	logout() {
		UserActions.logout();
		this.setState({
			authenticated: false
		})
		this.showAlert('logoutSuccess')
		browserHistory.push('/');
	}

	showAlert(selector) {
		const alerts = {
			'logoutSuccess': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Logout Success',
					message: 'You have been successfully logged out.',
					type: 'success',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	render() {
		let backdropClasses = classNames({
			'menu-backdrop': true,
			'show': this.state.showMobileMenu
		})

	    return (
			<div className="nav">
				<div className="home-link">
					<Link key="home" to="/" activeClassName="active" onClick={this.closeMenu}>Sandbox Home</Link>
				</div>
				<div className="menu-toggle" onClick={this.toggleMenu}>
					<i className="fa fa-bars"></i>
				</div>
				<Animation transitionName="slide-top" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
					<div className="menu-group" key="menu" onClick={this.closeMenu}>
						<ul className="main-menu">
							<li className="">
								<Link key="providers" to="/providers" className="menu-link" activeClassName="active">Providers</Link>
							</li>
							<li className="">
								<Link key="contacts" to="/contacts" className="menu-link" activeClassName="active">Contacts</Link>
							</li>
							<li className="">
								<Link key="tabs" to="/tabs" className="menu-link" activeClassName="active">Tabs</Link>
							</li>
							<li className="">
								<a href="http://localhost:2020/api/documentation" className="menu-link" target="_blank">Api Guide</a>
							</li>
						</ul>
						<ul className="login-menu">
							{
								this.state.authenticated ?
								<li className="login-link">
									<a className="menu-link" onClick={this.logout}>Logout</a>
								</li> :
								<li className="login-link">
									<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
								</li>
							}
						</ul>
					</div>
					{
						this.state.showMobileMenu &&
						<div className="mobile-menu-group" key="mobile-menu" onClick={this.closeMenu}>
							<ul className="main-menu">
								<li className="">
									<Link key="providers" to="/providers" className="menu-link" activeClassName="active">Providers</Link>
								</li>
								<li className="">
									<Link key="contacts" to="/contacts" className="menu-link" activeClassName="active">Contacts</Link>
								</li>
								<li className="">
									<Link key="tabs" to="/tabs" className="menu-link" activeClassName="active">Tabs</Link>
								</li>
								<li className="">
									<a href="http://localhost:2020/api/documentation" className="menu-link" target="_blank">Api Guide</a>
								</li>
							</ul>
							<ul className="login-menu">
								{
									this.state.authenticated ?
									<li className="login-link">
										<a className="menu-link" onClick={this.logout}>Logout</a>
									</li> :
									<li className="login-link">
										<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
									</li>
								}
							</ul>
						</div>
					}
				</Animation>
				<div className={backdropClasses} onClick={this.closeMenu}></div>
			</div>
	    );
	}
}
