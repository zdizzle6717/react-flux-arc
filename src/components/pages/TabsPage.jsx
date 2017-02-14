'use strict';

import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { TabGroup, Tab } from '../../library/tabs';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Form, Input, Select, TextArea, CheckBox, RadioGroup, FileUpload } from '../../library/validations';
import FormStore from '../../library/validations/stores/FormStore';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';

export default class TabsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            'contact': {
				'Files': []
			},
			'forms': {
				'contactForm': {
					'errorCount': 0,
					'validity': true
				},
				'firstTabForm': {
					'errorCount': 0,
					'validity': true
				},
				'secondTabForm': {
					'errorCount': 0,
					'validity': true
				},
				'thirdTabForm': {
					'errorCount': 0,
					'validity': true
				}
			},
			'files': [],
            'newContact': false
        }

		this.onChange = this.onChange.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

	componentWillMount() {
		FormStore.addChangeListener(this.onChange);
        ContactStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Sandbox | Tabs Page";
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
        FormStore.removeChangeListener(this.onChange);
        ContactStore.removeChangeListener(this.onChange);
    }

    onChange() {
		let parentFormErrorCount = FormStore.getErrorCount('firstTabForm') + FormStore.getErrorCount('secondTabForm') + FormStore.getErrorCount('thirdTabForm');
		let parentFormValidity = FormStore.getErrorCount('contactForm') + parentFormErrorCount === 0;
		this.setState({
			'forms': {
				'contactForm': {
					'errorCount': parentFormErrorCount,
					'validity': parentFormValidity
				},
				'firstTabForm': {
					'errorCount': FormStore.getErrorCount('firstTabForm'),
					'validity': FormStore.getValidity('firstTabForm')
				},
				'secondTabForm': {
					'errorCount': FormStore.getErrorCount('secondTabForm'),
					'validity': FormStore.getValidity('secondTabForm')
				},
				'thirdTabForm': {
					'errorCount': FormStore.getErrorCount('thirdTabForm'),
					'validity': FormStore.getValidity('thirdTabForm')
				}
			}
        });
    }

	handleInputChange(e) {
		let contact = this.state.contact;
		contact[e.target.name] = e.target.value;
		this.setState({
			contact: contact
		});
	}

	handleRadioChange(name, e) {
		let contact = this.state.contact;
		let value = e.target.value;
		contact[name] = value;
		this.setState({
			contact: contact
		});
	}

	handleCheckBoxChange(e) {
		let contact = this.state.contact;
		let name = e.target.name;
		let value = contact[name] || false;
		contact[name] = !value;
		this.setState({
			contact: contact
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
			return responses;
		}).then((files) => {
			contact.Files = files;
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
				<h1 className="push-bottom-2x">Tabs</h1>
				<hr />
				<div className="small-12 columns">
					<Form name="contactForm" submitText={this.state.newContact ? 'Save Contact' : 'Update Contact'} handleSubmit={this.handleSubmit} childForms={['firstTabForm', 'secondTabForm', 'thirdTabForm']} validity={this.state.forms.contactForm.validity}>
						<TabGroup>
							<Tab name="firstTab" title="First Tab" errorCount={this.state.forms.firstTabForm.errorCount}>
								<div>Tab 1 Content</div>
								<Form name="firstTabForm" submitButton={false} isParent={false}>
									<div className="row">
										<div className="form-group small-12 medium-3 columns">
											<label className="required">First Name</label>
											<Input type="text" name="firstName" value={this.state.contact.firstName} handleInputChange={this.handleInputChange} validate="name" required={true} preserveState={true}/>
										</div>
										<div className="form-group small-12 medium-3 columns">
											<label className="required">Middle Name</label>
											<Input type="text" name="middleName" value={this.state.contact.middleName} handleInputChange={this.handleInputChange} validate="name" required={true} preserveState={true}/>
										</div>
										<div className="form-group small-12 medium-3 columns">
											<label className="required">Last Name</label>
											<Input type="text" name="lastName" value={this.state.contact.lastName} handleInputChange={this.handleInputChange} validate="name" required={true} preserveState={true}/>
										</div>
										<div className="form-group small-12 medium-3 columns">
											<label className="required">Gender</label>
											<Select name="gender" value={this.state.contact.gender} handleInputChange={this.handleInputChange} required={true} preserveState={true}>
												<option value="">--Select--</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</Select>
										</div>
									</div>
								</Form>
							</Tab>
							<Tab name="secondTab" title="Second Tab" errorCount={this.state.forms.secondTabForm.errorCount}>
								<div>Tab 2 Content</div>
								<Form name="secondTabForm" submitButton={false} isParent={false}>
									<div className="row">
										<div className="form-group small-12 medium-3 columns">
											<label className="required">Email</label>
											<Input type="text" name="email" value={this.state.contact.email} handleInputChange={this.handleInputChange} validate="email" required={true} preserveState={true}/>
										</div>
										<div className="form-group small-12 medium-3 columns">
											<label className="required">Mobile Phone</label>
											<Input type="text" name="mobilePhone" value={this.state.contact.mobilePhone} handleInputChange={this.handleInputChange} validate="domesticPhone" required={true} preserveState={true}/>
										</div>
										<div className="form-group small-12 medium-3 columns">
											<label className="required">Fax</label>
											<Input type="text" name="fax" value={this.state.contact.fax} handleInputChange={this.handleInputChange} validate="domesticPhone" required={true} preserveState={true}/>
										</div>
										<div className="form-group small-12 medium-3 columns">
											<label className="required">Type</label>
											<Select name="type" value={this.state.contact.type} handleInputChange={this.handleInputChange} required={true} preserveState={true}>
												<option value="">--Select--</option>
												<option value="contact">Contact</option>
												<option value="user">User</option>
											</Select>
										</div>
									</div>
								</Form>
							</Tab>
							<Tab name="thirdTab" title="Third Tab" errorCount={this.state.forms.thirdTabForm.errorCount}>
								<div>Tab 3 Content</div>
								<Form name="thirdTabForm" submitButton={false} isParent={false}>
									<div className="row">
										<div className="form-group small-12 medium-6 columns">
											<label className="required">Profile Picture</label>
											<FileUpload name="profilePicture" value={this.state.contact.Files} handleFileUpload={this.handleFileUpload} typeOfModel="array" maxFiles={2} required={1} preserveState={true}/>
										</div>
									</div>
									<div className="row">
										<div className="form-group small-12 medium-3 columns">
											<CheckBox name="status" value={this.state.contact.status} handleInputChange={this.handleCheckBoxChange} label="Active Contact?" required={true} preserveState={true}/>
										</div>
										<div className="form-group small-12 medium-3 columns">
											<RadioGroup name="maritalStatus" value={this.state.contact.maritalStatus} handleInputChange={this.handleRadioChange.bind(this, 'maritalStatus')} label="Marital Status" options={['single', 'married', 'other']} preserveState={true}/>
										</div>
									</div>
								</Form>
							</Tab>
						</TabGroup>
						<div className="small-12 columns push-top-2x">
						</div>
					</Form>
				</div>
			</div>
		);
    }
}
