
import axios from "axios";

export const getSources = async (params: Record<string, string | undefined>) => {
 const respose = axios.get("https://newsapi.org/v2/top-headlines/sources", {
      params: { ...params },
      headers: {
        "X-Api-Key": process.env.API_KEY as string
      }
    });
  return (await respose).data;
};

export const getEverything = async (params: Record<string, string | undefined>) => {
  const respose = axios.get("https://newsapi.org/v2/everything", {
      params: { ...params },
      headers: {
        "X-Api-Key": process.env.API_KEY as string
      }
    });
  return (await respose).data;
};

export const getHeadlines = async (params: Record<string, string | undefined>) => {
  const respose = axios.get("https://newsapi.org/v2/top-headlines", {
      params: { ...params },
      headers: {
        "X-Api-Key": process.env.API_KEY as string
      }
    });
  return (await respose).data;
};