'use strict';

require('babel-core/register');

import Hapi from 'hapi';
import Boom from 'boom';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import HapiAuthJwt from 'hapi-auth-jwt';
import models from './models';
import env from '../envVariables';

// Create Server
const server = new Hapi.Server();
server.connection({
    port: env.port
});

const options = {
    info: {
        'title': 'UI Sandbox 2 API Documentation',
        'version': '0.0.1',
    },
    basePath: '/api/',
    pathPrefixSize: 2,
    tags: [{
        'name': 'movies'
    }, {
        'name': 'directors'
    }],
};

// Register Swagger Plugin ( Use for documentation and testing purpose )
server.register([
    Inert,
    Vision, {
        register: HapiSwagger,
        options: options
    }],
	{
	    routes: {
	        prefix: '/api'
	    }
	},
	function(err) {
	    if (err) {
	        server.log(['error'], 'hapi-swagger load error: ' + err);
	    } else {
	        server.log(['start'], 'hapi-swagger interface loaded');
	    }
	}
);

// Register hapi-auth-jwt Plugin
server.register(HapiAuthJwt, (err) => {
	server.auth.strategy('jsonWebToken', 'jwt', {
		key: env.secret,
		verifyOptions: {
			algorithms: ['HS256']
		}
	});
});

// Routes
server.route(require('./routes'));

models.sequelize.sync().then(function() {
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
