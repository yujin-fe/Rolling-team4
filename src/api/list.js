import instance from "./axios.js";

export const getCards = async (offset = 0) => {
  const { data } = await instance.get("19-4/recipients/", {
    params: { limit: 50, offset },
  });

  return data.results;
};
