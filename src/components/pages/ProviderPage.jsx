'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import AlertActions from '../../library/alerts/actions/AlertActions';
import NotFoundPage from '../pages/NotFoundPage';
import ProviderActions from '../../actions/ProviderActions';
import ProviderStore from '../../stores/ProviderStore';

export default class ProviderPage extends React.Component {
    constructor() {
        super();

        this.state = {
            provider: {}
        }

        this.onChange = this.onChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentWillMount() {
        ProviderStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Sandbox | Provider";
		ProviderActions.getProvider(this.props.params.providerId).catch(() => {
			this.showAlert('providerNotFound');
			browserHistory.push('/providers');
		});
    }

    componentWillUnmount() {
        ProviderStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            provider: ProviderStore.getProvider()
        });
    }

	showAlert(selector) {
		const alerts = {
			'providerNotFound': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Provider Not Found',
					message: 'A provider with that ID was not found.',
					type: 'error',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

    render() {
		let provider = this.state.provider;
		return (
			<div className="row">
				<h1 className="push-bottom-2x">Provider: <strong>{provider.name}</strong></h1>
				<h5>ID: {provider.id}</h5>
				<div className="row">
					<div className="small-12 medium-4 columns">
						<label><u>{provider.identifierType}</u></label>
						<p className="text-justify">
							{provider.identifier}
						</p>
					</div>
					<div className="small-12 medium-4 columns">
						<label><u>Provider Number</u></label>
						<p className="text-justify">
							{provider.providerNumber}
						</p>
					</div>
					<div className="small-12 medium-4 columns">
						<label><u>DBA</u></label>
						<p className="text-justify">
							{provider.dba}
						</p>
					</div>
				</div>
			</div>
		);
	}
}
