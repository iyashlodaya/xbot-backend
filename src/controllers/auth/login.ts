import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as crypto from 'crypto';
import User from "../../db/models/user";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string; // Replace with an environment variable in production

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('email and password are required fields!')
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // Check if the user exists
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }

    // Hash the input password and compare with stored password
    const hash = crypto.createHash('sha256');
    const hashedPassword = hash.update(password).digest('hex');

    if (hashedPassword !== user.password) {
      res.status(401).json({ message: "Password does not match!" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      {
        user_id: user.id,
      },
      SECRET_KEY,
      { expiresIn: "1d" } // Token validity: 1 day
    );

    // Respond with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
      },
    });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
