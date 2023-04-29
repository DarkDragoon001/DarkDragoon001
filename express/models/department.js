'use strict';

// Define a model for department table
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('department', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'department'
  });
  // Adding a class level method.
  Model.associate = function (models) {
    this.employee = this.hasMany(models.employee);
  };
  return Model;
};