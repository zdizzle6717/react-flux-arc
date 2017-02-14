'use strict';

import handlers from '../handlers';
import Joi from 'joi';

module.exports = [
  // Providers
  {
    'method': 'GET',
    'path': '/api/providers/{id}',
    'handler': handlers.providers.get,
    'config': {
      'tags': ['api'],
      'description': 'Get one provider by id',
      'notes': 'Get one provider by id',
      'validate': {
        'params': {
          'id': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'GET',
    'path': '/api/providers',
    'handler': handlers.providers.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all providers',
      'notes': 'Get all providers',
      'cors': {
        'origin': ['*']
      }
    },
  },
  {
    'method': 'POST',
    'path': '/api/providers',
    'handler': handlers.providers.create,
    'config': {
      'tags': ['api'],
      'description': 'Add a new provider',
      'notes': 'Add a new provider',
      'validate': {
        'payload': {
          'name': Joi.string().required(),
          'dba': Joi.string().required(),
          'email': Joi.string().required(),
          'identifier': Joi.string().required(),
          'identifierType': Joi.string().required(),
          'legalName': Joi.string().required(),
          'phone': Joi.string().required(),
          'providerNumber': Joi.string().required(),
          'state': Joi.string().required()
        }
      },
      'auth': {
        'strategy': 'jsonWebToken',
        'scope': ['providerAdmin', 'siteAdmin']
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/providers/{id}',
    'handler': handlers.providers.update,
    'config': {
      'tags': ['api'],
      'description': 'Update a provider by id',
      'notes': 'Update a provider by id',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
          'id': Joi.optional(),
          'name': Joi.string().required(),
          'dba': Joi.string().required(),
          'email': Joi.string().required(),
          'identifier': Joi.string().required(),
          'identifierType': Joi.string().required(),
          'legalName': Joi.string().required(),
          'phone': Joi.string().required(),
          'providerNumber': Joi.string().required(),
          'state': Joi.string().required(),
          'createdAt': Joi.optional(),
          'updatedAt': Joi.optional(),
          'Contacts': Joi.optional()
        }
      },
      'auth': {
        'strategy': 'jsonWebToken',
        'scope': ['providerAdmin', 'siteAdmin']
      },
      'cors': {
        'origin': ['*']
      }
    },
  },
  {
    'method': 'DELETE',
    'path': '/api/providers/{id}',
    'handler': handlers.providers.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete a provider by id',
      'notes': 'Delete a provider by id',
      'validate': {
        'params': {
          'id': Joi.number().required()
        }
      },
      'auth': {
        'strategy': 'jsonWebToken',
        'scope': ['providerAdmin', 'siteAdmin']
      },
      'cors': {
        'origin': ['*']
      }
    }
  }
];
