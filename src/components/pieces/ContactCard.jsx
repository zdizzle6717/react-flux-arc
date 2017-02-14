'use strict';

import React from 'react';
import { Link } from 'react-router';
import roleConfig from '../../../roleConfig';
import createAccessControl from '../../library/authentication/components/AccessControl';
let AccessControl = createAccessControl(roleConfig);

export default class ContactCard extends React.Component {
	render() {
		return (
			<div className="small-12 medium-6 large-4 columns push-bottom-2x">
				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">Contact Name</label>
									{this.props.fullName}
								</div>
							</div>
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">Email</label>
									{this.props.email}
								</div>
							</div>
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">Mobile Phone</label>
									{this.props.mobilePhone}
								</div>
							</div>
							<div className="small-12 medium-6 columns">
								<div className="form-group form-group-narrow card-field">
									<label className="card-label">Fax</label>
									{this.props.fax}
								</div>
							</div>
						</div>
					</div>
					<div className="card-actions">
						<AccessControl access={['contactAdmin']}>
							<Link className="action-item" key="contactEdit" to={`/contacts/edit/${this.props.id}`}>
								<span className="action">
									<i className="tip-icon fa fa-pencil"></i>
								</span>
								<span className="mobile-text">Edit</span>
							</Link>
						</AccessControl>
						<Link className="action-item" key="contact" to={`/contacts/view/${this.props.id}`}>
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

ContactCard.propTypes = {
	id: React.PropTypes.number.isRequired,
	fullName: React.PropTypes.string.isRequired,
	email: React.PropTypes.string.isRequired,
	mobilePhone: React.PropTypes.string.isRequired,
	fax: React.PropTypes.string.isRequired
}
