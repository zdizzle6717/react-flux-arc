'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class Form extends React.Component {
	constructor() {
        super();

		this.state = {
			valid: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
		if (!this.props.isParent && this.props.childForms) {
			throw new Error('Form component cannot have children without also being a parent.')
		}
		FormStore.addChangeListener(this.onChange);
	}

	componentDidMount() {
		// This component will mount before the previous form input components unmount and are cleared from the Form Store
		// This accounts for a route change with the same formName on both routes
		if (this.props.isParent) {
			if (this.props.childForms) {
				this.props.childForms.forEach((formName) => {
					FormStore.resetForm(formName);
				})
			}
			FormStore.resetForm(this.props.name);
		}
	}

	componentWillUnmount() {
		FormStore.removeChangeListener(this.onChange);
	}

	onChange() {
		this.setState({
			valid: FormStore.getValidity(this.props.name)
		});
    }

	handleSubmit(e) {
		e.preventDefault();
		this.props.handleSubmit(e);
	}

	render() {
		return (
			<div>
				{
					this.props.isParent ?
					<form className={this.props.customClass ? `form ${this.props.customClass}` : 'form'} name={this.props.name} noValidate>
						{this.props.children}
						{
							this.props.submitButton &&
							<div className="row">
								<div className="form-group small-12 columns text-right">
									<button className="button info" onClick={this.handleSubmit} disabled={this.props.validity !== undefined ? !this.props.validity : !this.state.valid}>{this.props.submitText}</button>
								</div>
							</div>
						}
					</form> :
					<div className={this.props.customClass ? `form ${this.props.customClass}` : 'form'} name={this.props.name} noValidate>
						{this.props.children}
						{
							this.props.submitButton &&
							<div className="row">
								<div className="form-group small-12 columns text-right">
									<button className="button info" onClick={this.handleSubmit} disabled={this.props.validity !== undefined ? !this.props.validity : !this.state.valid}>{this.props.submitText}</button>
								</div>
							</div>
						}
					</div>
				}
			</div>

		);
	}
}

Form.propTypes = {
	name: React.PropTypes.string.isRequired,
	handleSubmit: React.PropTypes.func,
	submitButton: React.PropTypes.bool,
	submitText: React.PropTypes.string,
	isParent: React.PropTypes.bool,
	childForms: React.PropTypes.array,
	validity: React.PropTypes.bool,
	customClass: React.PropTypes.string
}

Form.defaultProps = {
	submitButton: true,
	submitText: 'Submit',
	isParent: true
}
