'use strict';

module.exports = [
	{
		'name': 'providerEdit',
		'path': '/providers/edit/',
		'accessControl': ['providerAdmin']
	},
	{
		'name': 'providerCreate',
		'path': '/providers/create',
		'accessControl': ['providerAdmin']
	},
	{
		'name': 'contactEdit',
		'path': '/contacts/edit/',
		'accessControl': ['contactAdmin']
	},
	{
		'name': 'contactCreate',
		'path': '/contacts/create',
		'accessControl': ['contactAdmin']
	},
	{
		'name': 'tabs',
		'path': '/tabs',
		'accessControl': ['contactAdmin']
	}
];
