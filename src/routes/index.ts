import { Router } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { HTTP_STATUS } from '../constants/httpStatus';

const router = Router();

router.get('/health', (req, res) => {
  sendSuccess(res, HTTP_STATUS.OK, 'Server is healthy', {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export { router as apiRouter };