'use strict';

import models from '../../models';
import fs from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';
import createToken from '../../utils/createToken';
import {hashPassword, getUserRoleFlags} from '../../utils/userFunctions';

// App users
let users = {
  'create': (request, reply) => {
    hashPassword(request.payload.password, (err, hash) => {
      models.User.create({
          'email': request.payload.email,
          'username': request.payload.username,
          'password': hash,
          [request.payload.role]: true
        })
        .then((user) => {
          reply({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'roleFlags': getUserRoleFlags(user),
            'id_token': createToken(user)
          }).code(201);
        })
        .catch((response) => {
          throw Boom.badRequest(response);
        });
    });
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
    models.User.findAll({
        'attributes': ['username', 'email', 'createdAt'],
        'limit': 50,
        'order': '"updatedAt" DESC'
      })
      .then((users) => {
        reply(users).code(200);
      });
  }
}

module.exports = users;
