import express from 'express';

import user from './user.js';
import comments from './comments.js';
import friends from './friends.js';

const router = new express.Router();

router.use('/user', user);
router.use('/comments', comments);
router.use('/friends', friends);

export default router;
