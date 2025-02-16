import axios from "axios";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const NEWS_API_SOURCES_URL = "https://newsapi.org/v2/sources";
const NEWS_API_EVERYTHING_URL = "https://newsapi.org/v2/everything";

export const fetchTrendingTopics = async (category: string) => {
  console.log('fetchTrendingTopics:== category', category);
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        apiKey: NEWS_API_KEY,
        sources: 'the-hindu,the-times-of-india',
        language: "en",
        pageSize: 5,
      },
    });


    return response.data.articles.map((article: any) => article.title);
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    return [];
  }
};

export const fetchEverything = async (query: string) => {
    const response = await axios.get(NEWS_API_EVERYTHING_URL, {
      params: {
        apiKey: NEWS_API_KEY,
        q: `"${query}"`, // Searches for news mentioning India
        sortBy: "publishedAt",
        language: "en",
        pageSize: 5,
      },
    });

    return response.data.articles.map((article: any) => {
      return { title: article.title, description: article.description };
    });
};

export const fetchSources = async () => {
  const response = await axios.get(NEWS_API_SOURCES_URL, {
    params: {
      apiKey: NEWS_API_KEY,
      country: "in",
      language: "en",
      pageSize: 5,
    },
  });


  return response.data.sources;
};
