import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Comment } from '@models/Comments/index';

export const Tag = database.define('tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tag: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

Tag.hasMany(Comment, { onDelete: 'restrict' });
