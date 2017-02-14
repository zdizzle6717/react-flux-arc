'use strict';

import models from '../../models';
import fs from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';

// Provider Route Configs
let providers = {
  'create': (request, reply) => {
    models.Provider.create({
        'name': request.payload.name,
        'dba': request.payload.dba,
        'email': request.payload.email,
        'identifier': request.payload.identifier,
        'identifierType': request.payload.identifierType,
        'legalName': request.payload.legalName,
        'phone': request.payload.phone,
        'providerNumber': request.payload.providerNumber,
        'state': request.payload.state
      })
      .then((provider) => {
        reply(provider).code(200);
      });
  },
  'update': (request, reply) => {
    models.Provider.find({
        where: {
          id: request.params.id
        }
      })
      .then((provider) => {
        if (provider) {
          provider.updateAttributes({
            'name': request.payload.name,
            'dba': request.payload.dba,
            'email': request.payload.email,
            'identifier': request.payload.identifier,
            'identifierType': request.payload.identifierType,
            'legalName': request.payload.legalName,
            'phone': request.payload.phone,
            'providerNumber': request.payload.providerNumber,
            'state': request.payload.state
          }).then((provider) => {
            reply(provider).code(200);
          });
        } else {
          reply().code(404);
        }
      });
  },
  'get': (request, reply) => {
    models.Provider.find({
        'where': {
          'id': request.params.id
        },
        'include': [models.Contact]
      })
      .then((provider) => {
        if (provider) {
          reply(provider).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  'getAll': (request, reply) => {
    models.Provider.findAll({
        'limit': 50,
        'order': '"updatedAt" DESC'
      })
      .then((providers) => {
        reply(providers).code(200);
      });
  },
  'delete': (request, reply) => {
    models.Provider.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((provider) => {
        if (provider) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = providers;
