import express from 'express';
import NotificationController from '../controllers/NotificationController';
const router = express.Router();
router.post('/notifications', NotificationController.createNotification);
router.get('/', NotificationController.getNotifications);
router.get('/notifications/:id', NotificationController.getNotifications);
router.put('/notifications/:id', NotificationController.updateNotification);
router.delete('/notifications/:id', NotificationController.deleteNotification);
export default router;
