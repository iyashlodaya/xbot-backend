import { Router } from "express";
import generateTweet from "../controllers/tweet/generate.tweet";
import verifyToken from "../middleware/verify.token";
import generateTweetFromTrendingTopic from "../controllers/tweet/generate.tweet.from.news";

const router = Router();

router.post("/generate-tweet", verifyToken, generateTweet);
router.post("/generate-tweet-from-trending-topic", verifyToken, generateTweetFromTrendingTopic);

export default router;
