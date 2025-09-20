import { Request, Response } from "express";
import { getSources } from "../service/newsapi";

export const fetchSources = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, language, country } = req.query;
    const sources = await getSources({
      category: category as string,
      language: language as string,
      country: country as string,
    });
    res.json(sources);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};