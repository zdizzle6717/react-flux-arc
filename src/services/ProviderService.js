'use strict';
let axios = require('axios');

function cleanData(data) {
	delete data.ProviderId;
	delete data.id;
	delete data.createdAt;
	delete data.updatedAt;
	return data;
}

export default {
	getProvider: (id) => {
		return axios.get('/providers/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getProviders: () => {
		return axios.get('/providers')
			.then(function(response) {
				return response.data;
			});
	},
	createProvider: (data) => {
		return axios.post('/providers', data)
			.then(function(response) {
				return response.data;
			});
	},
	updateProvider: (id, data) => {
		data = cleanData(data);
		delete data.Contacts;
		return axios.put('/providers/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	removeProvider: (id) => {
		return axios.delete('/providers/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
