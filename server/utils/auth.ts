import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";

dotenv.config();

export interface TokenPayload extends JwtPayload {
  userId: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const AuthenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const {accesstoken} = req.cookies

  if (!accesstoken) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret not configured' });
  }

  try {
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET) as TokenPayload;
    console.log('success from auth utils')
    req.user = decoded;
    next();
  } catch (error) { 
    console.error('error from auth utils : ', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};