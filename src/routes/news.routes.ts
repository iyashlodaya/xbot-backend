import { Router } from "express";
import { getTrendingTopics } from "../controllers/news/news.controller";
import verifyToken from "../middleware/verify.token";

const router = Router();

router.get("/trending", verifyToken, getTrendingTopics);

export default router;
