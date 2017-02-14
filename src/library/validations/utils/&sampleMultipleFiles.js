// This file is meant for read-only.  Add similar methods to the component saving data with a file array attached

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
		promises.push(axios.post('http://localhost:8080/api/files/contacts/' + file.size, data, config));
	});

	return axios.all(promises);
}

handleSubmit(e) {
	let contact = this.state.contact;
	if (this.state.newContact) {
		ContactActions.createContact(contact).then(() => {
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
