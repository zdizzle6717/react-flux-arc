'use strict';

import React from 'react';
import createUserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

export default function(roleConfig) {
	let UserStore = createUserStore(roleConfig);

	class AccessControl extends React.Component {

		constructor() {
			super();

			this.state = {
				authorized: false
			}

			this.onUserChange = this.onUserChange.bind(this);
		}

		componentWillMount() {
			this.setState({
				authorized: UserStore.checkAuthorization(this.props.access)
			});
			UserStore.addChangeListener(this.onUserChange);
		}

		componentWillUnmount() {
			UserStore.removeChangeListener(this.onUserChange);
		}

		onUserChange() {
			this.setState({
				authorized: UserStore.checkAuthorization(this.props.access)
			});
		}

		render() {
			return (
				<span className={this.props.customClasses ? `access-control ${this.props.customClasses}` : 'access-control'}>
					{ this.state.authorized && !this.props.publicOnly && this.props.children }
					{ !this.state.authorized && this.props.publicOnly && this.props.children }
				</span>
			)
		}
	}

	AccessControl.propTypes = {
		'access': React.PropTypes.array,
		'customClasses': React.PropTypes.string,
		'publicOnly': React.PropTypes.bool
	}

	AccessControl.defaultProps = {
		'access': [],
		'publicOnly': false
	}

	return AccessControl;
}
