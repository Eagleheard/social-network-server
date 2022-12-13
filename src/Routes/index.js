import express from 'express';

import user from './user.js';
import comments from './comments.js';

const router = new express.Router();

router.use('/user', user);
router.use('/comments', comments);

export default router;
