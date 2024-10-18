// C:\projetChatGPT\backend\models\User.js

'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, // Champ requis
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // Champ requis
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Doit être unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  // Hachage du mot de passe avant la création
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Validation de l'email
  User.beforeValidate((user) => {
    if (!isEmail(user.email)) {
      throw new Error('Email invalide.');
    }
  });

  // Méthode pour comparer le mot de passe
  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
