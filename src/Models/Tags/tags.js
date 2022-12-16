import { Tag as tagsModule } from '@models/Tags/index.js';

class Tags {
  create(data) {
    return tagsModule.findOrCreate({
      where: {
        tag: data,
      },
      defaults: {
        tag: data,
      },
    });
  }
}

export default new Tags();
