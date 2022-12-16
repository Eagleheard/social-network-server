import { Comment as commentsModule } from '@models/Comments/index.js';
import { Op } from 'sequelize';

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
}

export default new Comments();
