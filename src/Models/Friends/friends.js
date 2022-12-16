import { Friendship as friendsModule } from '@models/Friends/index.js';

class Friends {
  create(data) {
    return friendsModule.create({ ...data });
  }
  async delete(id) {
    const friendship = await friendsModule.findOne({
      where: {
        followed: id,
      },
    });
    await friendship.destroy();
    return friendship;
  }
  getOne(id) {
    return friendsModule.findOne({
      where: {
        followed: id,
      },
    });
  }
  getAllFriends(id) {
    return friendsModule.findAll({
      where: {
        follower: id,
      },
      attributes: { exclude: ['id', 'follower'] },
    });
  }
}

export default new Friends();
