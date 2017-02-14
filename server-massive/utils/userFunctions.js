'use strict';

import Boom from 'boom';
import bcrypt from 'bcrypt';
import roleConfig from '../../roleConfig';

const verifyUniqueUser = (request, reply) => {
  let db = request.server.plugins['hapi-massive'].db;
  db.runAsync('SELECT * FROM "Users" WHERE "email" = $1 OR "username" = $2', [`${request.payload.email}`, `${request.payload.username}`]).then((user) => {
    if (user) {
      if (user.username === request.payload.username) {
        reply(Boom.badRequest('Username taken'));
      }
      if (user.email === request.payload.email) {
        reply(Boom.badRequest('Email taken'));
      }
    }

    reply(request.payload);
  });
};

const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      return cb(err, hash);
    });
  });
};

const verifyCredentials = (request, reply) => {
  const password = request.payload.password;
  let db = request.server.plugins['hapi-massive'].db;
  db.runAsync('SELECT * FROM "Users" WHERE "email" = $1 OR "username" = $1', [`${request.payload.username}`]).then((user) => {
    if (user[0]) {
      user = user[0];
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          reply(user);
        } else {
          reply(Boom.unauthorized('Incorrect password!'));
        }
      });
    } else {
      reply(Boom.unauthorized('Incorrect username or email!'));
    }
  });
};

const getUserRoleFlags = (user) => {
  let userRoleFlags = 0;
  roleConfig.forEach((role) => {
    if (user[role.name]) {
      userRoleFlags += role.roleFlags;
    }
  });

  return userRoleFlags;
};

export {
  verifyUniqueUser,
  verifyCredentials,
  hashPassword,
  getUserRoleFlags
};
