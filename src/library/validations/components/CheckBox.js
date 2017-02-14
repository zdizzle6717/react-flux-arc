'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class CheckBox extends React.Component {
	constructor() {
        super();

		this.state = {
			'name': null,
			'value': false,
			'formName': null,
			'valid': true,
			'initial': true,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
		}

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInputChange = this.validateInputChange.bind(this);
    }

	componentDidMount() {
		this.validateInit(this.props);
	}

	// Accounts for initial data check and conditionally required inputs
	componentWillReceiveProps(nextProps) {
		if (this.state.initial && this.state.pristine && nextProps.value || this.props.required !== nextProps.required) {
			this.validateInit(nextProps, true);
		}
	}

	// This will update validation in the case that an input is conditionally visible
	componentWillUnmount() {
		if (!this.props.preserveState) {
			let input = {
				'name': this.props.name,
				'formName': this.state.formName
			}
			setTimeout(() => {
				FormActions.removeInput(input);
			});
		}
	}

	validateInit(props, propsHaveLoaded = false) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('.form').getAttribute('name');
		let existingInput = propsHaveLoaded ? false : FormStore.getInput(formName, props.name);
		if (existingInput) {
			this.setState(existingInput);
			return;
		}
		let validity = props.required ? (props.value ? true : false) : true;
		let input = {
			'name': props.name,
			'value': props.value || false,
			'formName': formName,
			'valid': validity,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
		};
		this.setState(input);
		if (propsHaveLoaded) {
			input.intial = false;
			this.setState({
				'initial': false
			});
		}
		input = Object.assign(this.state, input);
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	validateInputChange(e) {
		// We are validating for the new value, so some booleans may seem to be reversed (They are not)
		let validity = this.props.required ? (!this.state.value ? true : false) : true;
		let input = {
			'name': this.props.name,
			'value': !this.state.value,
			'valid': validity,
			'initial': false,
			'pristine': false
		}
		input = Object.assign(this.state, input);
		this.setState(input);
		FormActions.addInput(input);
		this.props.handleInputChange(e);
	}

	handleMouseDown() {
		let input = Object.assign(this.state, {'touched': true});
		this.setState(input);
		FormActions.addInput(input);
	}

	handleFocus() {
		let input = Object.assign(this.state, {'focused': true, 'blurred': false});
		this.setState(input);
		FormActions.addInput(input);
	}

	handleBlur() {
		let input = Object.assign(this.state, {'focused': false, 'blurred': true});
		this.setState(input);
		FormActions.addInput(input);
	}

	render() {
		let validationClasses = classNames({
			'validate-error-element': true,
			'check-box': true,
			'valid': this.state.valid,
			'invalid': !this.state.valid,
			'touched': this.state.touched,
			'untouched': !this.state.touched,
			'pristine': this.state.pristine,
			'focused': this.state.focused,
			'blurred': this.state.blurred,
			'dirty': !this.state.pristine
		});

		return (
			<div className={validationClasses}>
				<input className="" name={this.props.name} id={this.props.name} type="checkbox" checked={this.state.value} onClick={this.handleMouseDown} onChange={this.validateInputChange} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled}/>
				<label className={this.props.required ? 'required' : ''} htmlFor={this.props.name}>{this.props.label}</label>
			</div>
		)
	}
}

CheckBox.propTypes = {
	'name': React.PropTypes.string.isRequired,
	'value': React.PropTypes.bool,
	'label': React.PropTypes.string.isRequired,
	'handleInputChange': React.PropTypes.func.isRequired,
	'preserveState': React.PropTypes.bool,
	'required': React.PropTypes.bool,
	'disabled': React.PropTypes.bool
}

CheckBox.defaultProps = {
	'preserveState': false
};
