'use strict';

import React from 'react';
import classNames from 'classnames';

export default function AlertBox(props) {
	let alertClasses = classNames({
		'alert-box': true,
		'show': props.show,
		'error': props.type === 'error',
		'info': props.type === 'info',
		'success': props.type === 'success'
	});

	return (
		<div className={alertClasses} name={props.name}>
			<div className="header">
				<div className="title">{props.title}</div>
				<div className="close" onClick={props.closeAlert}><span className="fa fa-times"></span></div>
			</div>
			<div className="content">
				{props.message}
			</div>
		</div>
	)
}
