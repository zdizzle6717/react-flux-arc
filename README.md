# react-flux-arc
This is a universal javascript (server-side rendering) app architecture built with react/flux

## Installation
* `sudo npm install`

> install mysql, create a database and add username, password, database, host to /server/config/config.json
> alternatively, install postgres and use the server configuration in /server-massive for a Hapi.js and massive.js API
> NOTE: Any server API can be plugged in rather than using the supplied APIs

> create an envVariables.js file in the root directory (example below)

<pre>
'use strict';

module.exports = {
	'clientPort': 3000,
	'port': 3030,
  'postgresConnectionString': "postgres://username:password@localhost/database",
	'uploadPath': '/var/www/html/react/dist/uploads/',
	'secret': 'SECRETS_SECRETS_ARE_NO_FUN'
}
</pre>

* `sudo npm install forever -g`

* `sudo npm run build-prod`

* `sudo npm run start-server OR sudo npm run start-massive`

* `sudo npm run start-client`

> navigate to localhost:3000
