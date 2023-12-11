import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User';
import { CRUDOperations } from '../models/CRUDInterface';

class UserController implements CRUDOperations<UserDocument> {

  /**
   * Constructor to bind methods
   */
  constructor() {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.getUsers = this.getUsers.bind(this);
    // Bind other methods here...
  }

  // CRUDOperations methods
  async findById(id: string): Promise<UserDocument | null> {
    return await User.findById(id).exec();
  }

  async update(id: string, data: Partial<UserDocument>): Promise<UserDocument | null> {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id).exec();
    return result !== null;
  }

  // Your create method
  async create(data: Partial<UserDocument>): Promise<UserDocument> {
    const newUser = new User(data);
    return await newUser.save();
  }

  // Other methods...

  // Your getUsers method
  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.get();
      if (users.length === 0) {
        res.status(404).json({ message: 'No users found.' });
      } else {
        res.json(users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching users.' + error });
    }
  }

  // Other methods...

  // Your get method
  async get(): Promise<UserDocument[]> {
    return await User.find();
  }

  // Your deleteUser method
  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const success = await this.delete(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting User.' });
    }
  }

  
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedUser = await this.update(id, req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating user.' });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const newUser = new User(req.body);
       await newUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred while creating user.'+error });
    }
  }

}



 
export default new UserController();
  
