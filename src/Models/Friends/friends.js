import { Friendship as friendsModule } from '@models/Friends/index.js';

class Friends {
  create(data) {
    return friendsModule.create({ ...data });
  }
  async delete(id) {
    const friendship = await friendsModule.findOne({
      where: {
        followedUserId: id,
      },
    });
    await friendship.destroy();
    return friendship;
  }
  getOne(id) {
    return friendsModule.findOne({
      where: {
        followedUserId: id,
      },
    });
  }
}

export default new Friends();
