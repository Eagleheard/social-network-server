import appError from '@errors/appError.js';

import commentsModule from '@models/Comments/comments.js';
import friendsModule from '@models/Friends/friends.js';
import tagsModule from '@models/Tags/tags.js';

class Comments {
  async create(req, res, next) {
    try {
      const user = req.user;
      const reg = /\B(#[a-z0-9]+)(\s|$)/gi;
      const tag = req.body.comment.match(reg);
      const newTag = await tagsModule.create(tag.join(''));
      console.log(newTag.map((tag) => tag.id));
      const comment = await commentsModule.create({
        userId: user.id,
        comment: req.body.comment,
        tagId: newTag.map((tag) => tag.id),
      });
      res.status(201).json(comment);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getAllByFriends({ user, query: { limit, page } }, res, next) {
    try {
      const dataLimit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : null;
      const currentPage = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
      const subscribedUsers = await friendsModule.getAllFriends(user.id);
      const subscribedUsersPost = await commentsModule.getAll({
        id: [...subscribedUsers, { followed: user.id }],
        dataLimit,
        currentPage,
      });
      //const comments = await commentsModule.getAll({ gameId: params.id, dataLimit, currentPage });
      res.status(200).json(subscribedUsersPost);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Comments();
