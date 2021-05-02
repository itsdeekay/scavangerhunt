import express from 'express';

import { getAlerts, getAlert, createAlert, updateAlert,getAlertsByPin } from '../controllers/alerts.js';

const router = express.Router();

router.get('/', getAlerts);
router.post('/', createAlert);
//router.get('/:id', getAlert);
router.get('/match', getAlertsByPin);
router.patch('/:id', updateAlert);

export default router;