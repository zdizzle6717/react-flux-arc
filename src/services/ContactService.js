'use strict';
let axios = require('axios');

function cleanData(data) {
	delete data.id;
	delete data.ContactId;
	delete data.createdAt;
	delete data.updatedAt;
	return data;
}

export default {
	getContact: (id) => {
		return axios.get('/contacts/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getContacts: () => {
		return axios.get('/contacts')
			.then(function(response) {
				return response.data;
			});
	},
	searchContacts: (criteria) => {
		return axios.post('/contacts/search', criteria)
			.then(function(response) {
				return response.data;
			});
	},
	searchContactSuggestions: (criteria) => {
		return axios.post('/contacts/search/suggestions', criteria)
			.then(function(response) {
				return response.data;
			});
	},
	createContact: (data) => {
		return axios.post('/contacts', data)
			.then(function(response) {
				return response.data;
			});
	},
	updateContact: (id, data) => {
		data = cleanData(data);
		data.Files[0] = cleanData(data.Files[0]);
		delete data.Provider;
		delete data.ProviderId;
		return axios.put('/contacts/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	removeContact: (id) => {
		return axios.delete('/contacts/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
