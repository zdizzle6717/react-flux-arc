'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';
import { addErrorMessage, removeErrorMessage } from '../utils/updateErrorMessages';

export default class Input extends React.Component {
	constructor(props, context) {
        super(props, context);

        this.state = {
			'name': null,
			'value': null,
			'formName': null,
			'errors': [],
			'valid': true,
			'initial': true,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.updateErrorMessages = this.updateErrorMessages.bind(this);
    }

	componentDidMount() {
		this.validateInit(this.props);
	}

	// Accounts for initial data returned from a service after componentDidMount and
	// re-validates when conditionally required inputs change
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

	// propsHaveLoaded is a check for the parent component state change after a service call is complete
	validateInit(props, propsHaveLoaded = false) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('.form').getAttribute('name');
		let existingInput = propsHaveLoaded ? false : FormStore.getInput(formName, props.name);
		if (existingInput) {
			this.setState(existingInput);
			return;
		}
		let value = props.value;
		let empty = props.required ? (value ? false : true) : false;
		let input = {
			'name': props.name,
			'value': value,
			'formName': formName
		};
		if (props.min || props.max || props.min === 0) {
			this.updateErrorMessages(input, (parseFloat(value) >= parseFloat(props.min)), 'minValue', `Min value is ${props.min}`);
			this.updateErrorMessages(input, (parseFloat(value) <= parseFloat(props.max)), 'maxValue', `Max value is ${props.max}`);
		}
		if (props.inputMatch) {
			this.updateErrorMessages(input, (value === props.inputMatch), 'inputMatch', 'Fields do not match');
		}
		if (props.validate) {
			this.updateErrorMessages(input, (defaultValidations[props.validate].regex.test(value)), props.validate);
		}
		this.updateErrorMessages(input, !empty, 'requiredField', 'Required field');
		if (propsHaveLoaded) {
			input.initial = false;
		}
		input = Object.assign(this.state, input);
		this.setState(input);
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	validateInput(e) {
		e.preventDefault();
		let value = e.target.value;
		let empty = this.props.required ? (value ? false : true) : false;
		let input = {
			'name': e.target.name,
			'value': value,
			'initial': false,
			'pristine': false
		}
		if (this.props.min || this.props.max || this.props.min === 0) {
			this.updateErrorMessages(input, (parseFloat(value) >= parseFloat(this.props.min)), 'minValue', `Min value is ${this.props.min}`);
			this.updateErrorMessages(input, (parseFloat(value) <= parseFloat(this.props.max)), 'maxValue', `Max value is ${this.props.max}`);
		}
		if (this.props.inputMatch) {
			this.updateErrorMessages(input, (value === this.props.inputMatch), 'inputMatch', 'Fields do not match');
		}
		if (this.props.validate) {
			this.updateErrorMessages(input, (defaultValidations[this.props.validate].regex.test(value)), this.props.validate);
		}
		this.updateErrorMessages(input, !empty, 'requiredField', 'Required field');
		input = Object.assign(this.state, input);
		this.setState(input);
		FormActions.addInput(input);
		this.props.handleInputChange(e);
	}

	updateErrorMessages(input, condition, key, text) {
		let newErrorMessages;
		if (!condition) {
			let errorText = text || defaultValidations[this.props.validate].message;
			newErrorMessages = addErrorMessage(this.state.errors, key, errorText);
		} else {
			newErrorMessages = removeErrorMessage(this.state.errors, key);
		}
		input.errors = newErrorMessages;
		input.valid = newErrorMessages.length === 0;
		input = Object.assign(this.state, input);
		this.setState(input);
		setTimeout(() => {
			FormActions.addInput(input);
		});
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
			<div className="validate-error-element">
				<input className={validationClasses} type={this.props.type} name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} min={this.props.min} max={this.props.max} onChange={this.validateInput} onMouseDown={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} autoComplete={this.props.autoComplete} disabled={this.props.disabled}/>
				<div className="validate-errors">
					{
						this.state.errors.map((error, i) =>
							<div key={i} className="validate-error">{error.message}</div>
						)
					}
				</div>
			</div>
		)
	}
}

Input.propTypes = {
	'autoComplete': React.PropTypes.string,
	'type': React.PropTypes.string.isRequired,
	'name': React.PropTypes.string.isRequired,
	'value': React.PropTypes.string,
	'placeholder': React.PropTypes.string,
	'min': React.PropTypes.number,
	'max': React.PropTypes.number,
	'validate': React.PropTypes.string,
	'handleInputChange': React.PropTypes.func.isRequired,
	'preserveState': React.PropTypes.bool,
	'required': React.PropTypes.bool,
	'disabled': React.PropTypes.bool,
	'inputMatch': React.PropTypes.string
}

Input.defaultProps = {
	'autoComplete': 'on',
	'preserveState': false
};
