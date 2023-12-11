import { Request, Response } from 'express';
import Message, { MessageDocument } from '../models/Message';
import { CRUDOperations } from '../models/CRUDInterface';

class MessageController implements CRUDOperations<MessageDocument> {

  async create(data: Partial<MessageDocument>): Promise<MessageDocument> {
    const newMessage = new Message(data);
    return await newMessage.save();
  }

  async findById(id: string): Promise<MessageDocument | null> {
    return await Message.findById(id).exec();
  }

  async update(id: string, data: Partial<MessageDocument>): Promise<MessageDocument | null> {
    const updatedMessage = await Message.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedMessage;
  }

  async delete(id: string): Promise<boolean> {
    const result = await Message.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async get(): Promise<MessageDocument[]> {
    return await Message.find();
  }
  
  // Route handler for creating a new Message
  async createMessage(req: Request, res: Response) {
    try {
      const partialData: Partial<MessageDocument> = req.body;
      const newMessage = await this.create(partialData);
      res.status(201).json({ success: true, Message: newMessage });
    } catch (error) {
      console.error('Error creating Message:', error);
      res.status(500).json({ success: false, error: 'An error occurred while creating Message.' });
    }
  }

  // Route handler for finding a Message by ID
  async findByIdMessage(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const Message = await this.findById(id);
      if (Message) {
        res.json(Message);
      } else {
        res.status(404).json({ error: 'Message not found.' });
      }
    } catch (error) {
      console.error('Error fetching Message:', error);
      res.status(500).json({ error: 'An error occurred while fetching Message.' });
    }
  }

  // Route handler for updating a Message
  async updateMessage(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const partialData: Partial<MessageDocument> = req.body;
      const updatedMessage = await this.update(id, partialData);
      if (updatedMessage) {
        res.json(updatedMessage);
      } else {
        res.status(404).json({ error: 'Message not found.' });
      }
    } catch (error) {
      console.error('Error updating Message:', error);
      res.status(500).json({ error: 'An error occurred while updating Message.' });
    }
  }

  // Route handler for deleting a Message
  async deleteMessage(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const success = await this.delete(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'Message not found.' });
      }
    } catch (error) {
      console.error('Error deleting Message:', error);
      res.status(500).json({ error: 'An error occurred while deleting Message.' });
    }
  }

  // Route handler for fetching all Messages
  async getMessages(req: Request, res: Response) {
    try {
      const Messages = await this.get();
      if (Messages.length === 0) {
        res.status(404).json({ message: 'Messages not found.' });
      } else {
        res.json(Messages);
      }
    } catch (error) {
      console.error('Error fetching Messages:', error);
      res.status(500).json({ error: 'An error occurred while fetching Messages.' });
    }
  }
}

export default new MessageController();
