'use strict';

import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Form, Input, Select, CheckBox, RadioGroup, DatePicker, FileUpload } from '../../library/validations';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';
import searchSuggestions from '../../library/searchSuggestions';
import { updateCheckBox, updateInput, updateRadioButton, updateSearchSuggestion } from '../../library/utilities/handlers';
import ContactService from '../../services/ContactService';
let SearchSuggestions = searchSuggestions(ContactService, 'searchContactSuggestions');

export default class ContactPage extends React.Component {
    constructor() {
        super();

        this.state = {
            contact: {},
			files: [],
            newContact: false
        }

		this.onChange = this.onChange.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleSearchSuggestion = this.handleSearchSuggestion.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

	componentWillMount() {
        ContactStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Sandbox | Edit Contact";
		if (this.props.params.contactId) {
			ContactActions.getContact(this.props.params.contactId).catch(() => {
				this.showAlert('contactNotFound');
				browserHistory.push('/contacts');
			});
		} else {
			this.setState({
				newContact: true
			});
		}
    }

	componentWillUnmount() {
        ContactStore.removeChangeListener(this.onChange);
    }

    onChange() {
		this.setState({
            contact: ContactStore.getContact(this.props.params.contactId)
        });
    }

	handleInputChange(e) {
		this.setState({
			contact: updateInput(e, this.state.contact)
		});
	}

	handleSearchSuggestion(e) {
		this.setState({
			contact: updateSearchSuggestion(e, 'id', this.state.contact)
		});
	}

	handleRadioChange(name, e) {
		this.setState({
			contact: updateRadioButton(e, name, this.state.contact)
		});
	}

	handleCheckBoxChange(e) {
		this.setState({
			contact: updateCheckBox(e, this.state.contact)
		});
	}

	handleFileUpload(files) {
		let contact = this.state.contact;
		this.uploadFiles(files).then((responses) => {
			responses = responses.map((response, i) => {
				response = {
					name: response.data.file.name,
					size: response.data.file.size,
					type: response.data.file.type
				};
				return response;
			})
			contact.Files = responses;
			this.setState({
				contact: contact
			});
		});
	}

	uploadFiles(files) {
		let promises = [];
		files.forEach((file) => {
			let data = new FormData();
			let config = {
					onUploadProgress: function(progressEvent) {
						let percentCompleted = progressEvent.loaded / progressEvent.total;
					}
				}
			data.append('file', file);
			promises.push(axios.post('/files/contacts/' + file.size, data, config));
		});

		return axios.all(promises);
	}

	handleSubmit(e) {
		let contact = this.state.contact;
		if (this.state.newContact) {
			ContactActions.createContact(contact).then((response) => {
				this.showAlert('contactCreated');
				browserHistory.push('/contacts');
			});
		} else {
			ContactActions.updateContact(contact.id, contact).then(() => {
				this.showAlert('contactUpdated');
				browserHistory.push('/contacts');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'contactNotFound': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Contact Not Found',
					message: 'A contact with that ID was not found.',
					type: 'error',
					delay: 3000
				});
			},
			'contactCreated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Contact Created',
					message: 'A new contact was successfully created.',
					type: 'success',
					delay: 3000
				});
			},
			'contactUpdated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Contact Updated',
					message: `${this.state.contact.firstName} ${this.state.contact.lastName} was updated successfully.`,
					type: 'success',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

    render() {
        return (
			<div className="row">
				{
					this.state.newContact ?
					<h1 className="push-bottom-2x">Add New Contact</h1> :
					<h1 className="push-bottom-2x">Edit Contact: <strong>{this.state.contact.firstName} {this.state.contact.lastName}</strong></h1>
				}
				<hr />
				<Form name="contactForm" submitText={this.state.newContact ? 'Save Contact' : 'Update Contact'} handleSubmit={this.handleSubmit}>
					<div className="row">
						<div className="form-group small-12 medium-3 columns">
							<label className="required">First Name</label>
							<Input type="text" name="firstName" value={this.state.contact.firstName} handleInputChange={this.handleInputChange} validate="name" required={true} />
						</div>
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Middle Name</label>
							<Input type="text" name="middleName" value={this.state.contact.middleName} handleInputChange={this.handleInputChange} validate="name" required={true} />
						</div>
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Last Name</label>
							<Input type="text" name="lastName" value={this.state.contact.lastName} handleInputChange={this.handleInputChange} validate="name" required={true} />
						</div>
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Gender</label>
							<Select name="gender" value={this.state.contact.gender} handleInputChange={this.handleInputChange} required={true}>
								<option value="">--Select--</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</Select>
						</div>
					</div>
					<div className="row">
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Email</label>
							<Input type="text" name="email" value={this.state.contact.email} handleInputChange={this.handleInputChange} validate="email" required={true} />
						</div>
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Mobile Phone</label>
							<Input type="text" name="mobilePhone" value={this.state.contact.mobilePhone} handleInputChange={this.handleInputChange} validate="domesticPhone" required={true} />
						</div>
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Fax</label>
							<Input type="text" name="fax" value={this.state.contact.fax} handleInputChange={this.handleInputChange} validate="domesticPhone" required={true} />
						</div>
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Type</label>
							<Select name="type" value={this.state.contact.type} handleInputChange={this.handleInputChange} required={true}>
								<option value="">--Select--</option>
								<option value="contact">Contact</option>
								<option value="user">User</option>
							</Select>
						</div>
					</div>
					<div className="row">
						<div className="form-group small-12 medium-6 columns">
							<label className="required">Profile Picture</label>
							<FileUpload name="profilePicture" value={this.state.contact.Files} handleFileUpload={this.handleFileUpload} maxFiles={1} required={1}/>
						</div>
					</div>
					<div className="row">
						<div className="form-group small-12 medium-3 columns">
							<CheckBox name="status" value={this.state.contact.status} handleInputChange={this.handleCheckBoxChange} label="Active Contact?" required={true}/>
						</div>
						<div className="form-group small-12 medium-3 columns">
							<RadioGroup name="maritalStatus" value={this.state.contact.maritalStatus} handleInputChange={this.handleRadioChange.bind(this, 'maritalStatus')} label="Marital Status" options={['single', 'married', 'other']}/>
						</div>
					</div>
					<div className="row">
						<div className="form-group small-12 medium-4 columns">
							<label>Search Suggestion Test</label>
							<SearchSuggestions rowCount={4} name="searchSugTest" displayKeys={['id', 'lastName', 'firstName']} handleInputChange={this.handleSearchSuggestion}/>
						</div>
						<div className="form-group small-12 medium-3 columns">
							<label className="required">Date Picker Test</label>
							<DatePicker name="datePickerTest" value={this.state.contact.datePickerTest} handleInputChange={this.handleInputChange} minYear={1950}/>
						</div>
					</div>
				</Form>
			</div>
		);
    }
}
