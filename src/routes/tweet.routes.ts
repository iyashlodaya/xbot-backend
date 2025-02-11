import { Router } from "express";
import generateTweet from "../controllers/tweet/generate.tweet";
import verifyToken from "../middleware/verify.token";

const router = Router();

router.post("/generate-tweet", verifyToken, generateTweet);

export default router;
