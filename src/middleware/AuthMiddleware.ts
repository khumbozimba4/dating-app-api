import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'EfricaA9IK3Y';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req['user'] = decodedToken; 
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}
