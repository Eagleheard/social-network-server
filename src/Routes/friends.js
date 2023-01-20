import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import friendsController from '@controllers/friends.js';

const router = new express.Router();

router.get('/followers', authMiddleware, friendsController.getAllFolloweds);
router.get('/following', authMiddleware, friendsController.getAllFollowers);
router.post('/:id([0-9]+)', authMiddleware, friendsController.create);
router.delete('/:id([0-9]+)', authMiddleware, friendsController.delete);

export default router;
