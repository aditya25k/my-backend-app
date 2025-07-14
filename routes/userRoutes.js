import express from 'express';
const router = express.Router();

import { createUser, searchUsers } from '../controllers/userController.js'; // ✅ import functions

router.get('/search', searchUsers);             // ✅ use controller
router.post('/createuser', createUser);         // ✅ use controller

export default router;