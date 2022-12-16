import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

export const Friendship = database.define('Friendship', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  follower: {
    type: DataTypes.INTEGER,
  },
  followed: {
    type: DataTypes.INTEGER,
  },
});
