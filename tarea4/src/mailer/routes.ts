import { Router } from 'express';
import { sendEmail } from './controler';

const router = Router();

router.get('/email', sendEmail);

export default router;