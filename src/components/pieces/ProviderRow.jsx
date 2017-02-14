'use strict';

import React from 'react';
import { Link } from 'react-router';
import roleConfig from '../../../roleConfig';
import createAccessControl from '../../library/authentication/components/AccessControl';
let AccessControl = createAccessControl(roleConfig);

export default class ProviderRow extends React.Component {
	render() {
		return (
			<tr className="animate">
				<td>{this.props.name}</td>
				<td>{this.props.email}</td>
				<td>{this.props.providerNumber}</td>
				<td>{this.props.phone}</td>
				<td className="text-center">
					<div className="action-buttons">
						<Link key="provider" to={`/providers/view/${this.props.id}`} className="action"><i className="fa fa-search"></i></Link>
						<AccessControl access={['providerAdmin']}>
							<Link key="providerEdit" to={`/providers/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						</AccessControl>
						<AccessControl access={['providerAdmin']}>
							<a className="action" onClick={this.props.removeProvider}><i className="fa fa-times"></i></a>
						</AccessControl>
					</div>
				</td>
			</tr>
		)
	}
}

ProviderRow.propTypes = {
	id: React.PropTypes.number.isRequired,
	name: React.PropTypes.string.isRequired,
	email: React.PropTypes.string.isRequired,
	providerNumber: React.PropTypes.string.isRequired,
	phone: React.PropTypes.string.isRequired,
	removeProvider: React.PropTypes.func.isRequired,
}
