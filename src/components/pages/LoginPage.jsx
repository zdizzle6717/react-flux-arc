'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Form, Input, Select, FileUpload } from '../../library/validations'
import UserActions from '../../library/authentication/actions/UserActions';
import roleConfig from '../../../roleConfig';
import createUserStore from '../../library/authentication/stores/UserStore';
const UserStore = createUserStore(roleConfig);

export default class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            credentials: {}
        }

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }


    componentDidMount() {
        document.title = "Sandbox | Login";
    }

	handleInputChange(e) {
		let credentials = this.state.credentials;
		credentials[e.target.name] = e.target.value;
		this.setState({
			credentials: credentials
		})
	}

	handleSubmit(e) {
		UserActions.authenticate(this.state.credentials).then((response) => {
			let homeState = UserStore.getUser().roleConfig.homeState;
			this.showAlert('loginSuccess');
			if (UserStore.getRedirectRoute()) {
				browserHistory.push(UserStore.getRedirectRoute());
			} else {
				browserHistory.push(homeState);
			}
		}).catch((error) => {
			if (error.message === 'Incorrect password!') {
				this.showAlert('incorrectPassword');
			}
			if (error.message === 'Incorrect username or email!') {
				this.showAlert('incorrectUsername');
			}
		});
	}

	showAlert(selector) {
		const alerts = {
			'loginSuccess': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Login Success',
					message: 'You have been successfully authenticated.',
					type: 'success',
					delay: 3000
				});
			},
			'incorrectPassword': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Incorrect Password',
					message: 'The password you entered is incorrect.',
					type: 'error',
					delay: 3000
				});
			},
			'incorrectUsername': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Incorrect Email/Username',
					message: 'No user was found with that email or username.',
					type: 'error',
					delay: 3000
				});
			},
		}

		return alerts[selector]();
	}

    render() {
        return (
			<div className="row">
				<h1 className="push-bottom-2x">Login</h1>
				<hr />
				<div className="small-12 medium-6 medium-offset-3 large-4 large-offset-4 columns">
					<Form name="loginForm" submitText="Login" handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 columns">
								<label className="required">Username/Email</label>
								<Input type="text" name="username" value={this.state.credentials.username || ''} handleInputChange={this.handleInputChange} validate="username" required={true} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 columns">
								<label className="required">Password</label>
								<Input type="password" name="password" value={this.state.credentials.password || ''} handleInputChange={this.handleInputChange} validate="password" required={true} />
							</div>
						</div>
					</Form>
					<div className="form-group small-12">
						Don't have an account? <Link key="register" to="/register" activeClassName="active" onClick={this.closeMenu}>Register/Sign Up</Link>
					</div>
				</div>
			</div>
		);
    }
}
