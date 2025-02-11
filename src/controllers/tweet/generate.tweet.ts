import { Request, Response } from "express";
import openai from "../../utils/openAIClient";

const generateTweet = async (req: Request, res: Response): Promise<void>  => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    const completion = await openai.completions.create({
      model: "davinci-002",
      prompt: `Write a witty tweet about ${prompt}`,
      max_tokens: 50,
    });

    res.json({ tweet: completion.choices[0].text?.trim() });
    return;
  } catch (error) {
    console.error("Error generating tweet:", error);
    res.status(500).json({ error: "Failed to generate tweet" });
    return;
  }
};

export default generateTweet;
