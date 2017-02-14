'use strict';

module.exports = function(sequelize, DataTypes) {
    let Contact = sequelize.define(
			'Contact',
			{
	      'firstName': DataTypes.STRING,
	      'lastName': DataTypes.STRING,
	      'middleName': DataTypes.STRING,
	      'email': DataTypes.STRING,
	      'gender': DataTypes.STRING,
	      'mobilePhone': DataTypes.STRING,
	      'fax': DataTypes.STRING,
	      'type': {
	          'type': DataTypes.STRING,
	          'defaultValue': 'contact'
	      },
	      'status': {
	          'type': DataTypes.BOOLEAN,
	          'defaultValue': true
	      },
	      'maritalStatus': {
	          'type': DataTypes.STRING,
	          'defaultValue': 'married'
	      },
	    },
			{
        'classMethods': {
          'associate': function(models) {
            Contact.hasMany(models.File);
            Contact.belongsTo(models.Provider);
          }
        }
	    }
		);
    return Contact;
};
