'use strict';

import handlers from '../handlers';
import Joi from 'joi';

module.exports = [
    // Contacts
    {
      'method': 'GET',
      'path': '/api/contacts/{id}',
      'handler': handlers.contacts.get,
      'config': {
        'tags': ['api'],
        'description': 'Get one contact by id',
        'notes': 'Get one contact by id',
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
      'path': '/api/contacts',
      'handler': handlers.contacts.getAll,
      'config': {
        'tags': ['api'],
        'description': 'Get all contacts',
        'notes': 'Get all contacts',
        'cors': {
          'origin': ['*']
        }
      }
    },
    {
      'method': 'POST',
      'path': '/api/contacts/search',
      'handler': handlers.contacts.search,
      'config': {
        'tags': ['api'],
        'description': 'Search contacts and paginate response',
        'notes': 'Search contacts and paginate response',
        'validate': {
          'payload': {
            'searchQuery': Joi.optional(),
            'pageNumber': Joi.number().required(),
            'pageSize': Joi.number().required()
          }
        },
        'cors': {
          'origin': ['*']
        }
      }
    },
    {
      'method': 'POST',
      'path': '/api/contacts/search/suggestions',
      'handler': handlers.contacts.searchSuggestions,
      'config': {
        'tags': ['api'],
        'description': 'Search for contact suggestions based on criteria',
        'notes': 'Search for contact suggestions based on criteria',
        'validate': {
          'payload': {
            'searchQuery': Joi.optional(),
            'maxResults': Joi.number().required()
          }
        },
        'cors': {
          'origin': ['*']
        }
      }
    },
    {
      'method': 'POST',
      'path': '/api/contacts',
      'handler': handlers.contacts.create,
      'config': {
        'tags': ['api'],
        'description': 'Add a new contact ',
        'notes': 'Add a new contact',
        'validate': {
          'payload': {
            'ProviderId': Joi.optional(),
            'firstName': Joi.string().required(),
            'lastName': Joi.string().required(),
            'middleName': Joi.string().required(),
            'email': Joi.string().required(),
            'gender': Joi.string().required(),
            'mobilePhone': Joi.string().required(),
            'fax': Joi.optional(),
            'type': Joi.string().required(),
            'status': Joi.boolean().required(),
            'maritalStatus': Joi.string().required(),
            'Files': Joi.array().items(
              Joi.object().keys({
                'name': Joi.string().required(),
                'size': Joi.number().required(),
                'type': Joi.string().required()
              })
            ),
						'searchSugTest': Joi.optional(),
						'datePickerTest': Joi.optional()
          }
        },
        'auth': {
          'strategy': 'jsonWebToken',
          'scope': ['contactAdmin', 'siteAdmin']
        },
        'cors': {
          'origin': ['*']
        }
      }
    },
    {
      'method': 'PUT',
      'path': '/api/contacts/{id}',
      'handler': handlers.contacts.update,
      'config': {
        'tags': ['api'],
        'description': 'Update a contact by id',
        'notes': 'Update a contact by id',
        'validate': {
          'params': {
            'id': Joi.number().required()
          },
          'payload': {
            'id': Joi.optional(),
            'createdAt': Joi.optional(),
            'updatedAt': Joi.optional(),
            'ProviderId': Joi.optional(),
            'firstName': Joi.string().required(),
            'lastName': Joi.string().required(),
            'middleName': Joi.string().required(),
            'email': Joi.string().required(),
            'gender': Joi.string().required(),
            'mobilePhone': Joi.string().required(),
            'fax': Joi.optional(),
            'type': Joi.string().required(),
            'status': Joi.boolean().required(),
            'maritalStatus': Joi.string().required(),
            'Files': Joi.array().items(
              Joi.object().keys({
                'id': Joi.optional(),
                'createdAt': Joi.optional(),
                'updatedAt': Joi.optional(),
                'ContactId': Joi.optional(),
                'name': Joi.string().required(),
                'size': Joi.number().required(),
                'type': Joi.string().required()
              })
            ),
						'searchSugTest': Joi.optional(),
						'datePickerTest': Joi.optional()
          }
        },
        'auth': {
          'strategy': 'jsonWebToken',
          'scope': ['contactAdmin', 'siteAdmin']
        },
        'cors': {
          'origin': ['*']
        }
      }
    },
    {
      'method': 'DELETE',
      'path': '/api/contacts/{id}',
      'handler': handlers.contacts.delete,
      'config': {
        'tags': ['api'],
        'description': 'Delete a contact by id',
        'notes': 'Delete a contact by id',
        'validate': {
          'params': {
            'id': Joi.number().required()
          }
        },
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
