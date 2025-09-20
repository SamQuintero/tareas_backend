import { Request, Response } from "express";
import { getEverything } from "../service/newsapi";

export const fetchNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, from, to, language, sortBy } = req.query;
    const news = await getEverything({
      q: q as string,
      from: from as string,
      to: to as string,
      language: language as string,
      sortBy: sortBy as string,
    });
    res.json(news);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};