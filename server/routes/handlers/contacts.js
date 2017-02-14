'use strict';

import models from '../../models';
import fs from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';

// Contact Route Configs
let contacts = {
  'get': (request, reply) => {
    models.Contact.find({
      'where': {
        'id': request.params.id
      },
      'include': [{
        'model': models.File
      }]
    }).then((contact) => {
      if (contact) {
        reply(contact).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  'getAll': (request, reply) => {
    models.Contact.findAll({
      'limit': 50
    }).then((contacts) => {
      reply(contacts).code(200);
    });
  },
  'search': (request, reply) => {
    let totalResults = 0;
    let totalPages = 0;
    let offset = 0;
    models.Contact.findAndCountAll()
      .then((allResults) => {
        totalResults = allResults.count;
        let totalPagesDecimal = totalResults === 0 ? 0 : (totalResults / request.payload.pageSize);
        totalPages = Math.ceil(totalPagesDecimal);
        offset = (request.payload.pageNumber - 1) * request.payload.pageSize;

        models.Contact.findAll({
          'offset': offset,
          'limit': request.payload.pageSize
        }).then((results) => {
          reply({
            'pagination': {
              'pageNumber': request.payload.pageNumber,
              'pageSize': request.payload.pageSize,
              'totalPages': totalPages,
              'totalResults': totalResults
            },
            'results': results
          }).code(200);
        });
      });
  },
  'searchSuggestions': (request, reply) => {
    models.Contact.findAll({
      'where': {
        '$or': [{
            'firstName': {
              '$like': '%' + request.payload.searchQuery + '%'
            }
          },
          {
            'lastName': {
              '$like': '%' + request.payload.searchQuery + '%'
            }
          }
        ]
      },
      'attributes': ['id', 'firstName', 'lastName'],
      'limit': request.payload.maxResults
    }).then((results) => {
      reply({
        'config': {
          'maxResults': request.payload.maxResults
        },
        'results': results
      }).code(200);
    });
  },
  'create': (request, reply) => {
    models.Contact.create({
        'firstName': request.payload.firstName,
        'lastName': request.payload.lastName,
        'middleName': request.payload.middleName,
        'email': request.payload.email,
        'gender': request.payload.gender,
        'mobilePhone': request.payload.mobilePhone,
        'fax': request.payload.fax,
        'type': request.payload.type,
        'status': request.payload.status,
        'maritalStatus': request.payload.maritalStatus
      })
      .then((contact) => {
        if (request.payload.Files) {
          models.File.create({
            'ContactId': contact.id,
            'name': request.payload.Files[0].name,
            'size': request.payload.Files[0].size,
            'type': request.payload.Files[0].type
          }).then((file) => {
            models.Contact.find({
              'where': {
                'id': contact.id
              },
              'include': [{
                'model': models.File
              }]
            }).then((contact) => {
              reply(contact).code(200);
            });
          });
        } else {
          reply(contact).code(200);
        }
      })
      .catch(() => {
        reply().code(406);
      });
  },
  'update': (request, reply) => {
    models.Contact.find({
        where: {
          id: request.params.id
        }
      })
      .then((contact) => {
        if (contact) {
          contact.updateAttributes({
            'firstName': request.payload.firstName,
            'lastName': request.payload.lastName,
            'middleName': request.payload.middleName,
            'email': request.payload.email,
            'gender': request.payload.gender,
            'mobilePhone': request.payload.mobilePhone,
            'fax': request.payload.fax,
            'type': request.payload.type,
            'status': request.payload.status,
            'maritalStatus': request.payload.maritalStatus
          }).then((contact) => {
            if (request.payload.Files) {
              models.File.find({
                'where': {
                  'ContactId': request.params.id
                }
              }).then((file) => {
                if (file) {
                  file.updateAttributes({
                    'name': request.payload.Files[0].name,
                    'size': request.payload.Files[0].size,
                    'type': request.payload.Files[0].type
                  }).then((file) => {
                    models.Contact.find({
                      'where': {
                        'id': request.params.id
                      },
                      'include': [{
                        'model': models.File
                      }]
                    }).then((contact) => {
                      reply(contact).code(200);
                    });
                  });
                } else {
                  models.File.create({
                    'ContactId': request.params.id,
                    'name': request.payload.Files[0].name,
                    'size': request.payload.Files[0].size,
                    'type': request.payload.Files[0].type
                  }).then(() => {
                    models.Contact.find({
                      'where': {
                        'id': request.params.id
                      },
                      'include': [{
                        'model': models.File
                      }]
                    }).then((contact) => {
                      reply(contact).code(200);
                    });
                  });
                }
              });
            } else {
              models.Contact.find({
                'where': {
                  'id': request.params.id
                },
                'include': [{
                  'model': models.File
                }]
              }).then((contact) => {
                reply(contact).code(200);
              });
            }
          });
        } else {
					reply().code(404);
        }
      });
  },
  'delete': (request, reply) => {
    models.Contact.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((contact) => {
        if (contact) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = contacts;
