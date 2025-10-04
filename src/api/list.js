import axios from "axios";

const API = axios.create({
  baseURL: "https://rolling-api.vercel.app/19-4",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCards = async (limit = 4) => {
  const { data } = await API.get("/recipients/", {
    params: { limit: 50, offset: 0 },
  });

  const cards = data.results;

  // 인기순 정렬
  const popular = [...cards]
    .sort((a, b) => b.reactionCount - a.reactionCount)
    .slice(0, limit);

  // 최신순 정렬
  const recent = [...cards]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);

  return { popular, recent };
};

export const getReactions = async (recipientId, limit = 3, offset = 0) => {
  const res = await API.get(
    `/recipients/${recipientId}/reactions/?limit=${limit}&offset=${offset}`
  );
  return res.data.results;
};
