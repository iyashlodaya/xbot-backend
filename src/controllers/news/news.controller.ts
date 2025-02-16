import { Request, Response } from "express";
import {fetchEverything } from "../../services/newsService";

export const getTrendingTopics = async (req: Request, res: Response) => {
  const category = req.query.category as string;
  let categoryToFetch = category;


  if (!category) {
    categoryToFetch = "technology";
  }

  console.log('categoryToFetch', categoryToFetch);
  const trendingTopics = await fetchEverything(categoryToFetch);
  res.json({ topics: trendingTopics });
};
