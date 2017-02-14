'use strict';

import fs from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';

// Provider Route Configs
let providers = {
  'get': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Providers.findAsync(request.params.id).then((provider) => {
      if (provider) {
        reply(provider).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  'getAll': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Providers.findAsync().then((providers) => {
      reply(providers).code(200);
    })
  },
  'create': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Providers.insertAsync({
      'name': request.payload.name,
      'dba': request.payload.dba,
      'email': request.payload.email,
      'identifier': request.payload.identifier,
      'identifierType': request.payload.identifierType,
      'legalName': request.payload.legalName,
      'phone': request.payload.phone,
      'providerNumber': request.payload.providerNumber,
      'state': request.payload.state,
      'createdAt': (new Date()).toISOString(),
      'updatedAt': (new Date()).toISOString()
    }).then((provider) => {
      reply(provider).code(200);
    })
  },
  'update': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Providers.updateAsync({
      'id': parseFloat(request.params.id),
      'name': request.payload.name,
      'dba': request.payload.dba,
      'email': request.payload.email,
      'identifier': request.payload.identifier,
      'identifierType': request.payload.identifierType,
      'legalName': request.payload.legalName,
      'phone': request.payload.phone,
      'providerNumber': request.payload.providerNumber,
      'state': request.payload.state,
      'updatedAt': (new Date()).toISOString()
    }).then((provider) => {
      reply(provider).code(200);
    });
  },
  'delete': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Providers.destroyAsync({
      'id': request.params.id
    }).then((provider) => {
      reply(provider).code(200);
    })
  }
};

module.exports = providers;
