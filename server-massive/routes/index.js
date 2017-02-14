'use strict';

let handlers = require('./handlers');

module.exports = []
	.concat(require('./api/contacts'))
	.concat(require('./api/files'))
	.concat(require('./api/providers'))
	.concat(require('./api/users'));
