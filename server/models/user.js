'use strict';

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define(
      'User',
			{
        'email': {
          'type': DataTypes.STRING,
          'unique': true
        },
        'username': {
          'type': DataTypes.STRING,
          'unique': true
        },
        'password': DataTypes.STRING,
        'firstName': DataTypes.STRING,
        'lastName': DataTypes.STRING,
        'siteAdmin': {
          'type': DataTypes.BOOLEAN,
          'defaultValue': false
        },
        'providerAdmin': {
          'type': DataTypes.BOOLEAN,
          'defaultValue': false
        },
        'contactAdmin': {
          'type': DataTypes.BOOLEAN,
          'defaultValue': false
        }
      },
			{
        'classMethods': {}
      }
		);
    return User;
};
