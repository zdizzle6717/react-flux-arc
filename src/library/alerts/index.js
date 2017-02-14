'use strict';

import React from 'react';
import classNames from 'classnames';
import Animation from 'react-addons-css-transition-group';
import AlertStore from './stores/AlertStore';
import AlertBox from './components/AlertBox'

export default class Alerts extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			alerts: []
		}

		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
        AlertStore.addChangeListener(this.onChange);
    }

	componentWillUnmount() {
        AlertStore.removeChangeListener(this.onChange);
    }

	closeAlert(alert) {
		AlertStore.closeAlert(alert);
	}

	onChange() {
        this.setState({
            alerts: AlertStore.getAlerts()
        });
    }

    render() {
	    return (
			<div className="alert-container">
				<Animation transitionName="slide-bottom" transitionAppear={false} transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
					{this.state.alerts.map((alert, i) => {
						return <AlertBox key={i} {...alert} closeAlert={this.closeAlert.bind(this, alert)}></AlertBox>
					})}
				</Animation>
			</div>
	    );
    }
}
