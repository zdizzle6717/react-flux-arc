'use strict';

import handlers from '../handlers';
import Joi from 'joi';

module.exports = [
	{
		'method': 'POST',
    'path': '/api/files/{path}/{size}',
    'handler': handlers.files.create,
    'config': {
      'payload': {
        'output': 'stream',
        'maxBytes': 209715200,
        'parse': true,
        'allow': 'multipart/form-data'
      },
      'tags': ['api'],
      'description': 'Upload a new file',
      'notes': 'Upload a new file',
			'auth': {
			  'strategy': 'jsonWebToken',
			  'scope': ['contactAdmin', 'siteAdmin']
		  },
			'cors': {
	      'origin': ['*']
	    }
    }
  }
];
