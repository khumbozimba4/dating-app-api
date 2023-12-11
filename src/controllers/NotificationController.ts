import { Request, Response } from 'express';
import Notification, { NotificationDocument } from '../models/Notification';
import { CRUDOperations } from '../models/CRUDInterface';

class NotificationController implements CRUDOperations<NotificationDocument> {

  async create(data: Partial<NotificationDocument>): Promise<NotificationDocument> {
    const newNotification = new Notification(data);
    return await newNotification.save();
  }

  async findById(id: string): Promise<NotificationDocument | null> {
    return await Notification.findById(id).exec();
  }

  async update(id: string, data: Partial<NotificationDocument>): Promise<NotificationDocument | null> {
    const updatedNotification = await Notification.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedNotification;
  }

  async delete(id: string): Promise<boolean> {
    const result = await Notification.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async get(): Promise<NotificationDocument[]> {
    return await Notification.find();
  }
  
  // Route handler for creating a new notification
  async createNotification(req: Request, res: Response) {
    try {
      const partialData: Partial<NotificationDocument> = req.body;
      const newNotification = await this.create(partialData);
      res.status(201).json({ success: true, notification: newNotification });
    } catch (error) {
      console.error('Error creating Notification:', error);
      res.status(500).json({ success: false, error: 'An error occurred while creating Notification.' });
    }
  }

  // Route handler for finding a notification by ID
  async findByIdNotification(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const notification = await this.findById(id);
      if (notification) {
        res.json(notification);
      } else {
        res.status(404).json({ error: 'Notification not found.' });
      }
    } catch (error) {
      console.error('Error fetching Notification:', error);
      res.status(500).json({ error: 'An error occurred while fetching Notification.' });
    }
  }

  // Route handler for updating a notification
  async updateNotification(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const partialData: Partial<NotificationDocument> = req.body;
      const updatedNotification = await this.update(id, partialData);
      if (updatedNotification) {
        res.json(updatedNotification);
      } else {
        res.status(404).json({ error: 'Notification not found.' });
      }
    } catch (error) {
      console.error('Error updating Notification:', error);
      res.status(500).json({ error: 'An error occurred while updating Notification.' });
    }
  }

  // Route handler for deleting a notification
  async deleteNotification(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const success = await this.delete(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'Notification not found.' });
      }
    } catch (error) {
      console.error('Error deleting Notification:', error);
      res.status(500).json({ error: 'An error occurred while deleting Notification.' });
    }
  }

  // Route handler for fetching all notifications
  async getNotifications(req: Request, res: Response) {
    try {
      const notifications = await this.get();
      if (notifications.length === 0) {
        res.status(404).json({ message: 'Notifications not found.' });
      } else {
        res.json(notifications);
      }
    } catch (error) {
      console.error('Error fetching Notifications:', error);
      res.status(500).json({ error: 'An error occurred while fetching Notifications.' });
    }
  }
}

export default new NotificationController();
