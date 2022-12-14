import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

export const Friendship = database.define('Friendship', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  follower_user_id: DataTypes.INTEGER,
  followed_user_id: DataTypes.INTEGER,
});
