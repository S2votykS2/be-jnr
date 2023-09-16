'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.DetailUser, { foreignKey: 'userId' });
            User.belongsTo(models.Group, { foreignKey: 'groupId' });
            User.belongsTo(models.Class, { foreignKey: 'classId' });
            User.belongsToMany(models.Project, { through: 'Project-User' });
        }
    };
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        avatar: DataTypes.BLOB('long'),
        groupId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};