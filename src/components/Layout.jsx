'use strict';

import React from 'react';
import {Link, browserHistory} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import TopNav from './pieces/TopNav';
import Alerts from '../library/alerts'
import {Loader, LoaderStore} from '../library/loader';
import UserActions from '../library/authentication/actions/UserActions';
import initInterceptors from '../interceptors';
import {apiRoutes} from '../constants/apiBaseRoutes'

initInterceptors(apiRoutes.dev, 300);

export default class Layout extends React.Component {
	constructor() {
        super();

        this.state = {
            showLoader: false
        }

		this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
        LoaderStore.addChangeListener(this.onChange);
		if(typeof(Storage) !== "undefined"){
			let storedUser = JSON.parse(sessionStorage.getItem('user'));
			if (storedUser) {
				UserActions.setUser(storedUser);
			}
		}
    }

	componentWillUnmount() {
        LoaderStore.removeChangeListener(this.onChange);
    }

    onChange() {
		this.setState({
            showLoader: LoaderStore.getLoader()
        });
    }

    render() {
		let path = this.props.location.pathname;

	    return (
	      <div>
	        <header>
	            <TopNav></TopNav>
	        </header>
				<Animation transitionName="view" transitionAppear={true} transitionAppearTimeout={250} transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250} component='div' className='content-container'>
					{React.cloneElement(this.props.children, { key: path })}
				</Animation>
				<Alerts></Alerts>
				<Loader loading={this.state.showLoader}></Loader>
	        <footer>This is the footer.</footer>
	      </div>
	    );
    }
}

Layout.contextTypes = {
	'test': React.PropTypes.string
}
