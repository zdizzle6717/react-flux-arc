'use strict';

module.exports = function(sequelize, DataTypes) {
    let File = sequelize.define(
			'File',
			{
        'name': DataTypes.STRING,
        'size': DataTypes.INTEGER,
        'type': DataTypes.STRING
	    },
			{
        'classMethods': {
          'associate': function(models) {
              File.belongsTo(models.Contact);
          }
        }
    	}
		);
    return File;
};
