'use strict';

import React from 'react';
import { Link } from 'react-router';
import roleConfig from '../../../roleConfig';
import createAccessControl from '../../library/authentication/components/AccessControl';
let AccessControl = createAccessControl(roleConfig);

export default class ContactRow extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.fullName}</td>
				<td>{this.props.email}</td>
				<td>{this.props.mobilePhone}</td>
				<td>{this.props.type}</td>
				<td className="text-center">
					<div className="action-buttons">
						<Link key="contact" to={`/contacts/view/${this.props.id}`} className="action"><i className="fa fa-search"></i></Link>
						<AccessControl access={['contactAdmin']}>
							<Link key="contactEdit" to={`/contacts/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						</AccessControl>
						<AccessControl access={['contactAdmin']}>
							<a className="action" onClick={this.props.removeContact}><i className="fa fa-times"></i></a>
						</AccessControl>
					</div>
				</td>
			</tr>
		)
	}
}

ContactRow.propTypes = {
	id: React.PropTypes.number.isRequired,
	fullName: React.PropTypes.string.isRequired,
	email: React.PropTypes.string.isRequired,
	mobilePhone: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	removeContact: React.PropTypes.func.isRequired
}
