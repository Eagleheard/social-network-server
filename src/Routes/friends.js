import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import friendsController from '@controllers/friends.js';

const router = new express.Router();

router.post('/:id([0-9]+)', authMiddleware, friendsController.create);
router.delete('/:id([0-9]+)', authMiddleware, friendsController.delete);

export default router;
