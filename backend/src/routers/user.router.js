import { Router } from 'express';
import register from '../controllers/register.controller.js';
import login from '../controllers/login.controller.js';
import updateUserDetails from '../controllers/updateUserDetails.controller.js';
import allUsers from '../controllers/allUsers.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/').put(auth, updateUserDetails);
router.route('/bulk').get(auth, allUsers);

export default router;
