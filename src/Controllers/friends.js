import appError from '@errors/appError.js';

import friendsModule from '@models/Friends/friends.js';

class Friends {
  async create(req, res, next) {
    try {
      const user = req.user;
      const comment = await friendsModule.create({
        follower: user.id,
        followed: req.params.id,
      });
      res.status(201).json(comment);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        return next(appError.badRequest('Id was not set'));
      }
      const friendship = await friendsModule.delete(req.params.id);
      if (!friendship) {
        return next(appError.notFound('Selected user does not exist'));
      }
      return res.status(200).json({ message: 'Successfully unsubscribed' });
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getAllFollowers(req, res, next) {
    try {
      const followers = await friendsModule.getAllFriends(req.user.id);
      return res.status(200).json(followers);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getAllFolloweds(req, res, next) {
    try {
      const followeds = await friendsModule.getAllFollowers(req.user.id);
      return res.status(200).json(followeds);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Friends();
