import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Comment } from '@models/Comments/index';
import { Friendship } from '@models/Friends/index';

const User = database.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'USER',
  },
  photo: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
  },
});

User.hasMany(Comment, { onDelete: 'restrict' });

User.belongsToMany(User, {
  as: 'Following',
  through: Friendship,
  foreignKey: 'follower_user_id',
  onDelete: 'CASCADE',
});

User.belongsToMany(User, {
  as: 'Followed',
  through: Friendship,
  foreignKey: 'followed_user_id',
  onDelete: 'CASCADE',
});

export default User;
