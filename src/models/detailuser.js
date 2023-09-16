'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DetailUser.belongsTo(models.User, { foreignKey: 'userId' });
        }
    };
    DetailUser.init({
        userId: DataTypes.STRING,
        university: DataTypes.STRING,
        major: DataTypes.STRING,
        maritalStatus: DataTypes.STRING,
        imageLover: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'DetailUser',
    });
    return DetailUser;
};