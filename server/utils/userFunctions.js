'use strict';

import Boom from 'boom';
import bcrypt from 'bcrypt';
import models from '../models';
import roleConfig from '../../roleConfig';

function verifyUniqueUser(request, reply) {
  models.User.find({
      'where': {
        '$or': [{
          'email': request.payload.email
        }, {
          'username': request.payload.username
        }]
      }
    })
    .then(function(user) {
      if (user) {
        if (user.username === request.payload.username) {
          reply(Boom.badRequest('Username taken'));
        }
        if (user.email === request.payload.email) {
          reply(Boom.badRequest('Email taken'));
        }
      }

      reply(request.payload);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function hashPassword(password, cb) {
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      return cb(error, hash);
    });
  });
}

function verifyCredentials(request, reply) {
  const password = request.payload.password;

  models.User.find({
      'where': {
        '$or': [{
          'email': request.payload.username
        }, {
          'username': request.payload.username
        }]
      }
    })
    .then(function(user) {
      if (user) {
        bcrypt.compare(password, user.password, (error, isValid) => {
          if (isValid) {
            reply(user);
          } else {
            reply(Boom.unauthorized('Incorrect password!'));
          }
        });
      } else {
        reply(Boom.unauthorized('Incorrect username or email!'));
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getUserRoleFlags(user) {
  let userRoleFlags = 0;
  roleConfig.forEach((role) => {
    if (user[role.name]) {
      userRoleFlags += role.roleFlags;
    }
  });

  return userRoleFlags;
}

export {
  verifyUniqueUser,
  verifyCredentials,
  hashPassword,
  getUserRoleFlags
};
