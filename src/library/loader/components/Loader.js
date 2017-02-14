'use strict';

import React from 'react';
import classNames from 'classnames';

export default class Loader extends React.Component {
	constructor(props, context) {
		super(props, context);

	}

    render() {
		let loaderClasses = classNames({
			'loader-container': true,
			'show': this.props.loading
		});

	    return (
			<div className={loaderClasses}>
				{
					this.props.type === 'standard' &&
					<div className="loader">
						<div></div>
					</div>
				}
				{
					this.props.type === 'bars' &&
					<div className="loader">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				}
				{
					this.props.type === 'custom' &&
					<div>
						{this.props.children}
					</div>
				}
			</div>
	    );
    }
}

Loader.propTypes = {
	'type': React.PropTypes.string
}

Loader.defaultProps = {
	'type': 'bars'
}
