import { Request, Response } from 'express';
import Subscription, { SubscriptionDocument } from '../models/Subscription';

class SubscriptionController {
  async createSubscription(req: Request, res: Response) {
    try {
      const { userId, plan, startDate, endDate } = req.body;
      const newSubscription = await Subscription.create({
        userId,
        plan,
        startDate,
        endDate,
      });
      res.status(201).json(newSubscription);
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ error: 'An error occurred while creating subscription.' });
    }
  }

  async getSubscriptions(req: Request, res: Response) {
    try {
      const subscriptions = await Subscription.find();
      if (subscriptions.length === 0) {
        res.status(404).json({ message: 'No subscriptions found.' });
      } else {
        res.json(subscriptions);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'An error occurred while fetching subscriptions.' });
    }
  }

  async getSubscriptionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const subscription = await Subscription.findById(id);
      if (subscription) {
        res.json(subscription);
      } else {
        res.status(404).json({ message: 'Subscription not found.' });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ error: 'An error occurred while fetching subscription.' });
    }
  }

  async updateSubscription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedSubscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedSubscription) {
        res.json(updatedSubscription);
      } else {
        res.status(404).json({ message: 'Subscription not found.' });
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      res.status(500).json({ error: 'An error occurred while updating subscription.' });
    }
  }

  async deleteSubscription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await Subscription.findByIdAndDelete(id);
      if (result) {
        res.json({ message: 'Subscription deleted successfully.' });
      } else {
        res.status(404).json({ message: 'Subscription not found.' });
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      res.status(500).json({ error: 'An error occurred while deleting subscription.' });
    }
  }

  async isSubscriptionActive(req: Request, res: Response) {
    try {
      const subscription = await Subscription.findOne({ user: req.body.userId });
      if (subscription && subscription.endDate > new Date()) {
        res.json({ active: true });
    }
    res.json({ active: false });
} catch (error) {
      console.error('Error checking subscription:', error);
      res.json({ active: false,"message": 'Error checking subscription:' +error});
    }
  }
}

export default new SubscriptionController();
