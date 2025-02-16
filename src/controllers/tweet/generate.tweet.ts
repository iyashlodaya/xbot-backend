import { Request, Response } from "express";
import openai from "../../utils/openAIClient";
import UserPreferences from "../../db/models/userPreferences";

const generateTweet = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { topic, options } = req.body;

  const preferences = await UserPreferences.findOne({
    where: { user_id: userId },
  });

  /* *
  options: this would have the following options:
   hashtags: this would be true or false meaning if it should include hashtags or not
   length: this would be the length of the tweet
   language: this would be the language of the tweet,
   emoji: this would be true or false, meaning if it should include emojis or not
   tone: this would be the tone of the tweet,
   */
  if (!topic) {
    res.status(400).json({ error: "Topic is required" });
    return;
  }

  // Use user preferences if available, otherwise use options from request body
  const {
    hashtags = preferences?.hashtags ?? false,
    length = preferences?.length ?? "short",
    language = preferences?.language ?? "English",
    emoji = preferences?.emojis ?? false,
    tone = preferences?.tone ?? "casual",
  } = options as {
    hashtags?: boolean;
    length?: "short" | "medium" | "long";
    language?: string;
    emoji?: boolean;
    tone?:
      | "funny"
      | "motivational"
      | "casual"
      | "formal"
      | "sarcastic"
      | "professional";
  };

  // Validate length if provided
  if (length && !["short", "medium", "long"].includes(length)) {
    res.status(400).json({
      error: "Invalid length option. Must be 'short', 'medium', or 'long'",
    });
    return;
  }

  // Validate language if provided
  if (language && typeof language !== "string") {
    res.status(400).json({ error: "Language must be a string" });
    return;
  }

  // Validate hashtags if provided
  if (hashtags !== undefined && typeof hashtags !== "boolean") {
    res.status(400).json({ error: "Hashtags must be a boolean" });
    return;
  }

  // Validate emoji if provided
  if (emoji !== undefined && typeof emoji !== "boolean") {
    res.status(400).json({ error: "Emoji must be a boolean" });
    return;
  }

  // Validate tone if provided
  if (
    tone &&
    ![
      "funny",
      "motivational",
      "casual",
      "formal",
      "sarcastic",
      "professional",
    ].includes(tone)
  ) {
    res.status(400).json({
      error:
        "Invalid tone option. Must be 'funny', 'motivational', 'casual', 'formal', 'sarcastic', or 'professional'",
    });
    return;
  }

  const lengthMap = {
    short: "under 100 characters",
    medium: "between 100-200 characters",
    long: "between 200-280 characters",
  };

  const tweetPrompt = `Generate a tweet in ${language || "English"} with ${
    tone || "casual"
  } about ${topic}. Keeping it ${
    lengthMap[length as keyof typeof lengthMap] || lengthMap["short"]
  }.
  ${hashtags ? `Include relevant hashtags.` : `Do not include hashtags.`}
  ${emoji ? `Use engaging emojis where appropriate.` : `Avoid using emojis.`}`;

  const max_tokens = length === "short" ? 50 : length === "medium" ? 100 : 200;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates engaging tweets based on user preferences.",
        },
        { role: "user", content: tweetPrompt },
      ],
      max_tokens: max_tokens,
      temperature: 0.7,
    });

    res.json({ tweet: completion.choices[0].message.content });
    return;
  } catch (error) {
    console.error("Error generating tweet:", error);
    res.status(500).json({ error: "Failed to generate tweet" });
    return;
  }
};

export default generateTweet;
