'use strict';

import React from 'react';
import { Link } from 'react-router';
import roleConfig from '../../../roleConfig';
import createAccessControl from '../../library/authentication/components/AccessControl';
let AccessControl = createAccessControl(roleConfig);

export default class ProviderCard extends React.Component {
	render() {
		return (
			<div className="small-12 medium-6 large-4 columns push-bottom-2x">
				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">Provider Name</label>
									{this.props.name}
								</div>
							</div>
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">Legal Name</label>
									{this.props.legalName}
								</div>
							</div>
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">Provider Number</label>
									{this.props.providerNumber}
								</div>
							</div>
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">State</label>
									{this.props.state}
								</div>
							</div>
						</div>
					</div>
					<div className="card-actions">
						<AccessControl access={['providerAdmin']}>
							<Link className="action-item" key="providerEdit" to={`/providers/edit/${this.props.id}`}>
								<span className="action">
									<i className="tip-icon fa fa-pencil"></i>
								</span>
								<span className="mobile-text">Edit</span>
							</Link>
						</AccessControl>
						<Link className="action-item" key="provider" to={`/providers/view/${this.props.id}`}>
							<span className="action">
								<i className="tip-icon fa fa-search"></i>
							</span>
							<span className="mobile-text">View</span>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

ProviderCard.propTypes = {
	id: React.PropTypes.number.isRequired,
	name: React.PropTypes.string.isRequired,
	legalName: React.PropTypes.string.isRequired,
	providerNumber: React.PropTypes.string.isRequired,
	state: React.PropTypes.string.isRequired
}
