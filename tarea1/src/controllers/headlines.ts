import { Request, Response } from "express";
import { getHeadlines } from "../service/newsapi";

export const fetchHeadlines = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country,  category, q,pageSize, page} = req.query;
    const headlines = await getHeadlines({
      country: country as string,
      category: category as string,
      q: q as string,
      pageSize: pageSize as string,
      page: page as string
  
    });
    res.json(headlines);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};