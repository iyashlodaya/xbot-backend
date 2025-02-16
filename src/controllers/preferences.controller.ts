import { Request, Response } from "express";
import UserPreferences from "../db/models/userPreferences";

export const getUserPreferences = async (req: Request, res: Response):Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let preferences = await UserPreferences.findOne({
      where: { user_id: userId },
    });

    if (!preferences) {
      res.status(404).json({ message: "Preferences not found" });
    }

    res.json({ preferences });
  } catch (error) {
    res.status(500).json({ message: "Error fetching preferences" });
  }
};

export const updateUserPreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { tone, length, language, hashtags, emojis } = req.body;

    let preferences = await UserPreferences.findOne({
      where: { user_id: userId },
    });

    if (!preferences) {
      preferences = await UserPreferences.create({
        user_id: userId,
        tone,
        length,
        language,
        hashtags,
        emojis,
      });
    } else {
      await preferences.update({ tone, length, language, hashtags, emojis });
    }

    res.json({ preferences });
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences" });
  }
};
