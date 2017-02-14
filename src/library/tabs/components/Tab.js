'use strict';

import React from 'react';

export default class Tab extends React.Component {
	constructor() {
		super();

		this.state = {}
	}

	componentDidMount() {
		// let elem = ReactDOM.findDOMNode(this);
		// let childForm = elem.getElementsByTagName('form');
	}

	render() {
		return (
			<div className="tab-content" name="this.props.tabName">
				{this.props.children}
			</div>
		)
	}
}

Tab.propTypes = {
	title: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	errorCount: React.PropTypes.number
}
