'use strict';

export default [
	{
		'route': '/',
		'view': 'index'
	},
	{
		'route': '/login',
		'view': 'login'
	},
	{
		'route': '/register',
		'view': 'register'
	},
	{
		'route': '/contacts*',
		'view': 'contacts'
	},
	{
		'route': '/providers*',
		'view': 'providers'
	}
];
