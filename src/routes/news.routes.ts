import { Router } from "express";
import { getTrendingTopics } from "../controllers/news/news.controller";

const router = Router();

router.get("/trending", getTrendingTopics);

export default router;
