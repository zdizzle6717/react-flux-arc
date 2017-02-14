'use strict';

let dbDirectory = __dirname + '/../sqlStatements/';

const _runSQL = (request, reply, filePath, params) => {
	let db = request.server.plugins['hapi-massive'].db;
	return db.executeSqlFileAsync({'file': dbDirectory + filePath + '.sql', 'params': params});
};

export default _runSQL;
