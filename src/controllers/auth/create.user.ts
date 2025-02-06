import { Request, Response } from "express";
import * as crypto from "crypto";

import { User } from "../../db/models/user";

// Create a user (Register API)
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validate the input
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(409).json({ message: "Email already registered." });
      return;
    }

    // Hash the password before saving
    const hash = crypto.createHash("sha256");
    const hashedPassword = hash.update(password).digest("hex");

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        username: newUser.name,
        email: newUser.email,
      },
    });
    return;
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
