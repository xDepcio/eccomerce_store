'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [4, 30],
    //     isNotEmail(value) {
    //       if(Validator.isEmail(value)) {
    //         throw new Error('Cannot be an email')
    //       }
    //     }
    //   }
    // },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    defaultAddressId: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail(value) {
          if(!Validator.isEmail(value)) {
            throw new Error('Must be an email')
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'lastName', 'createdAt', 'updatedAt']
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Review, {
      through: models.UserVoteReview
    })
    User.hasMany(models.Address, {foreignKey: 'userId'})
    User.hasMany(models.Order, {foreignKey: 'userId'})
  };
  User.prototype.toSafeObject = function() {
    // const {id, username, email} = this
    // return {id, username, email}
    const {id, email, firstName} = this
    return {id, email, firstName}
  }

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function({credential, password}) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          // username: credential,
          email: credential
        }
      }
    })

    if(user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id)
    }
  }

  // User.signup = async function({username, email, password}) {
  //   const hashedPassword = bcrypt.hashSync(password)
  //   const user = await User.create({
  //     username,
  //     email,
  //     hashedPassword
  //   })

  //   return await User.scope('currentUser').findByPk(user.id)
  // }
  User.signup = async function({firstName, lastName, email, password}) {
    const hashedPassword = bcrypt.hashSync(password)
    const user = await User.create({
      firstName,
      lastName,
      email,
      hashedPassword
    })

    return await User.scope('currentUser').findByPk(user.id)
  }

  return User;
};
