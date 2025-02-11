import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

interface JwtPayload {
  user_id: number;
}

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = { id: decoded.user_id };
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export default verifyToken;
