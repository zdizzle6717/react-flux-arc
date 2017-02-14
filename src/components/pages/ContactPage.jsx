'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import AlertActions from '../../library/alerts/actions/AlertActions';
import NotFoundPage from '../pages/NotFoundPage';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';

export default class ContactPage extends React.Component {
    constructor() {
        super();

        this.state = {
            contact: {}
        }

        this.onChange = this.onChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentWillMount() {
        ContactStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Sandbox | View Contact";
		ContactActions.getContact(this.props.params.contactId).catch(() => {
			this.showAlert('contactNotFound');
			browserHistory.push('/contacts');
		});
    }

    componentWillUnmount() {
        ContactStore.removeChangeListener(this.onChange);
    }

    onChange() {
		this.setState({
			contact: ContactStore.getContact()
		});
    }

	showAlert(selector) {
		const alerts = {
			'contactNotFound': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Contact Not Found',
					message: 'A contact with that ID was not found.',
					type: 'error',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

    render() {
		return (
			<div className="row">
			    <h3 className="push-bottom-2x">View Contact: <strong>{this.state.contact.firstName} {this.state.contact.middleName} {this.state.contact.lastName}</strong></h3>
			    <h5>ID: {this.state.contact.id}
			    </h5>
				<div className="row">
					<div className="small-12 medium-4 columns">
						<label><u>Email</u></label>
						<p className="text-justify">
							{this.state.contact.email}
						</p>
					</div>
					<div className="small-12 medium-4 columns">
						<label><u>Mobile Phone</u></label>
						<p className="text-justify">
							{this.state.contact.mobilePhone}
						</p>
					</div>
					<div className="small-12 medium-4 columns">
						<label><u>Fax</u></label>
						<p className="text-justify">
							{this.state.contact.fax}
						</p>
					</div>
				</div>
			</div>
	    );
    }
}
