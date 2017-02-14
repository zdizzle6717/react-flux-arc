'use strict';

import fs from 'fs-extra';
import env from '../../../envVariables.js';
import Boom from 'boom';


// File Upload Route Configs
let files = {
  'create': (request, reply) => {
    let data = request.payload;
    if (data.file) {
      let name = Date.now() + '-' + data.file.hapi.filename;
      let path = __dirname + '/../../../uploads/' + request.params.path + '/' + name;
      let file = fs.createWriteStream(path);

      file.on('error', (err) => {
        console.error(err);
      });

      data.file.pipe(file);

      data.file.on('end', (err) => {
        let response = {
          file: {
            name: name,
            size: request.params.size,
            type: data.file.hapi.headers['content-type']
          },
          headers: data.file.hapi.headers,
          status: 200,
          statusText: 'File uploaded successfully!'
        };
        reply(JSON.stringify(response));
      });
    } else {
      let response = {
        filename: data.file.hapi.filename,
        headers: data.file.hapi.headers,
        status: 400,
        statusText: 'There was an error uploading your file. Max sure the dimensions are 800px by 530px.'
      };
      reply(JSON.stringify(response));
    }
  },
  'delete': (request, reply) => {
    let db = request.server.plugins['hapi-massive'].db;
    db.Files.destroyAsync({
      'id': request.params.id
    }).then((contact) => {
      reply(contact).code(200);
    })
  },
};

module.exports = files;