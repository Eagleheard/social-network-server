import { Op } from 'sequelize';

import { Comment as commentsModule } from '@models/Comments/index.js';
import userModule from '@models/User/index.js';

class Comments {
  getAll({ id, dataLimit, currentPage }) {
    const offset = (currentPage - 1) * dataLimit;
    return commentsModule.findAndCountAll({
      limit: dataLimit,
      offset,
      order: [['id', 'DESC']],
      where: {
        userId: {
          [Op.in]: id.map((user) => user.followed),
        },
      },
      include: [{ model: userModule, as: 'user' }],
    });
  }
  getOne(id) {
    return commentsModule.findOne({
      where: {
        userId: id,
      },
    });
  }
  create(data) {
    return commentsModule.create({ ...data });
  }
  getAllByUser({ id, dataLimit, currentPage }) {
    const offset = (currentPage - 1) * dataLimit;
    return commentsModule.findAndCountAll({
      limit: dataLimit,
      offset,
      order: [['id', 'DESC']],
      where: {
        userId: id,
      },
      include: [{ model: userModule, as: 'user' }],
    });
  }
}

export default new Comments();
