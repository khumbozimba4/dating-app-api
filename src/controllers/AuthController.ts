import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { UserDocument } from '../models/User'; // Import your User model

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'EfricaA9IK3Y';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('jwt'); // Clear the JWT cookie
    res.status(200).json({ message: 'Logout successful' });
  };

  export const Register = async (req: Request, res: Response) => {
    try {
      const newUser: UserDocument = req.body;
      const user = new User(newUser);
      await user.save(); // Corrected usage of the save method
  
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred while creating user.' });
    }
  };