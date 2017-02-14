'use strict';

import fs from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';
import _runSQL from '../../utils/runSQL.js'

// Contact Route Configs
let contacts = {
  'get': (request, reply) => {
    _runSQL(request, reply, 'contacts/get', [request.params.id]).then((contacts) => {
      let contact = contacts[0];
      if (contact) {
        _runSQL(request, reply, 'contacts/getFiles', [contact.id]).then((files) => {
          contact.Files = files;
          reply(contact).code(200);
        });
      } else {
        reply().code(404);
      }
    });
  },
  'getAll': (request, reply) => {
    _runSQL(request, reply, 'contacts/getAll').then((contacts) => {
      reply(contacts).code(200);
    });
  },
  'search': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    let totalResults = 0;
    let totalPages = 0;
    let offset = (request.payload.pageNumber - 1) * request.payload.pageSize;
    // Change empty objects to accomodate searchQuery
    db.Contacts.countAsync({}).then((totalResults) => {
      db.Contacts.findAsync({}, {
        'offset': offset,
        'limit': request.payload.pageSize
      }).then((results) => {
        let totalPagesDecimal = totalResults === 0 ? 0 : (totalResults / request.payload.pageSize);
        totalPages = Math.ceil(totalPagesDecimal);
        reply({
          'pagination': {
            pageNumber: request.payload.pageNumber,
            pageSize: request.payload.pageSize,
            totalPages: totalPages,
            totalResults: parseFloat(totalResults)
          },
          'results': results
        })
      });
    });
  },
  'searchSuggestions': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    _runSQL(request, reply, 'contacts/getSuggestions', [`%${request.payload.searchQuery}%`]).then((contacts) => {
      reply({
        'config': {
          'maxResults': request.payload.maxResults
        },
        'results': contacts
      })
    });
  },
  'create': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Contacts.insertAsync({
      'ProviderId': request.payload.ProviderId,
      'firstName': request.payload.firstName,
      'lastName': request.payload.lastName,
      'middleName': request.payload.middleName,
      'email': request.payload.email,
      'gender': request.payload.gender,
      'mobilePhone': request.payload.mobilePhone,
      'fax': request.payload.fax,
      'type': request.payload.type,
      'status': request.payload.status,
      'maritalStatus': request.payload.maritalStatus,
      'createdAt': (new Date()).toISOString(),
      'updatedAt': (new Date()).toISOString()
    }).then((contact) => {
			if (request.payload.Files) {
				db.Files.insertAsync({
	        'ContactId': contact.id,
	        'name': request.payload.Files[0].name,
	        'size': request.payload.Files[0].size,
	        'type': request.payload.Files[0].type,
	        'createdAt': (new Date()).toISOString(),
	        'updatedAt': (new Date()).toISOString()
	      }).then((file) => {
	        db.Contacts.findAsync(contact.id).then((contact) => {
	          db.Files.findAsync({
	            'ContactId': contact.id
	          }).then((files) => {
	            contact.Files = files;
	            reply(contact).code(200);
	          })
	        });
	      });
			} else {
				reply(contact).code(200);
			}
    });
  },
  'update': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Contacts.updateAsync({
      'id': request.params.id,
      'firstName': request.payload.firstName,
      'lastName': request.payload.lastName,
      'middleName': request.payload.middleName,
      'email': request.payload.email,
      'gender': request.payload.gender,
      'mobilePhone': request.payload.mobilePhone,
      'fax': request.payload.fax,
      'type': request.payload.type,
      'status': request.payload.status,
      'maritalStatus': request.payload.maritalStatus,
      'updatedAt': (new Date()).toISOString()
    }).then((contact) => {
			if (request.payload.Files) {
				db.Files.findAsync({
	        'ContactId': contact.id
	      }).then((files) => {
	        db.Files.saveAsync({
	          'id': files[0].id,
	          'name': request.payload.Files[0].name,
	          'size': request.payload.Files[0].size,
	          'type': request.payload.Files[0].type,
	          'createdAt': (new Date()).toISOString(),
	          'updatedAt': (new Date()).toISOString()
	        }).then((file) => {
	          db.Contacts.findAsync(contact.id).then((contact) => {
	            db.Files.findAsync({
	              'ContactId': contact.id
	            }).then((files) => {
	              contact.Files = files;
	              reply(contact).code(200);
	            })
	          });
	        });
	      });
			} else {
				reply(contact).code(200);
			}
    });
  },
  'delete': (request, reply) => {
    _runSQL(request, reply, 'contacts/get', [request.params.id]).then((contacts) => {
      if (contacts[0]) {
        _runSQL(request, reply, 'contacts/delete', [request.params.id]).then(() => {
          reply().code(200);
        });
      } else {
        reply().code(404);
      }
    })
  }
};

module.exports = contacts;
