import { Router } from 'express';
import accountBalance from '../controllers/account.controller.js';
import transferBalance from '../controllers/transfer.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/balance').get(auth, accountBalance);
router.route('/transfer').post(auth, transferBalance);

export default router;
