'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class BreadCrumbs extends React.Component {
	// TODO: This is garbage. Find a better solution.

	constructor() {
		super();

		this.state = {
			breadCrumbs: []
		}

		this.onViewChange = this.onViewChange.bind(this);
	}

	componentWillMount() {
		let locationListener = browserHistory.listen((location) => {
			this.onViewChange(location);
		});
	}

	onViewChange(location) {
		let breadCrumbs = this.state.breadCrumbs;
		if (breadCrumbs.length < this.props.totalCrumbs) {
			breadCrumbs.push(location)
		} else {
			breadCrumbs.shift();
			breadCrumbs.push(location);
		}
		this.setState({
			breadCrumbs: breadCrumbs
		});
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		locationListener();
	}

	render() {
		return (
			<ul className="breadCrumbs">
				{ this.state.breadCrumbs.length > 1 && this.state.breadCrumbs.map((crumb) =>
					<li><Link className="crumb" key={crumb.key} to={crumb.pathname} activeClassName="active">{crumb.key}</Link></li>
				) }
			</ul>
		)
	}
}

BreadCrumbs.propTypes = {
	totalCrumbs: React.PropTypes.number.isRequired,
}
