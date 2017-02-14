'use strict';

import fs from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';
import createToken from '../../utils/createToken';
import {hashPassword, getUserRoleFlags} from '../../utils/userFunctions';

// App users
let users = {
	'create': (request, reply) => {
		let db = request.server.plugins['hapi-massive'].db;
		hashPassword(request.payload.password, (err, hash) => {
			let siteAdmin = request.payload.role === 'siteAdmin' ? true : false;
			let providerAdmin = request.payload.role === 'providerAdmin' ? true : false;
			let contactAdmin = request.payload.role === 'contactAdmin' ? true : false;
			db.Users.insertAsync({
				'email': request.payload.email,
				'username': request.payload.username,
				'password': hash,
				'siteAdmin': siteAdmin,
				'providerAdmin': providerAdmin,
				'contactAdmin': contactAdmin,
				'createdAt': (new Date()).toISOString(),
				'updatedAt': (new Date()).toISOString()
			}).then((user) => {
				reply({
					'id': user.id,
					'email': user.email,
					'username': user.username,
					'roleFlags': getUserRoleFlags(user),
					'id_token': createToken(user)
				}).code(201);
			});
		})
	},
	'authenticate': (request, reply) => {
		reply({
			'id': request.pre.user.id,
			'email': request.pre.user.email,
			'username': request.pre.user.username,
			'roleFlags': getUserRoleFlags(request.pre.user),
			'id_token': createToken(request.pre.user)
		}).code(201);
	},
	'getAll': (request, reply) => {
		let db = request.server.plugins['hapi-massive'].db;
		db.Users.findAsync().then((users) => {
			reply(users).code(200);
		})
	}
}

module.exports = users;
