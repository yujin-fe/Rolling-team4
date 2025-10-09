import instance from "./axios.js";

//리액션 받아오는 데이터
const getReactions = async (params) => {
  const { recipientId, ...rest } = params;
  const reactionsRes = await instance.get(
    `/19-4/recipients/${recipientId}/reactions/`,
    { params: { ...rest } }
  );
  return reactionsRes.data;
};

//id별 recipient 각각에 대한 데이터
const getRecipient = async (recipientId) => {
  const recipientRes = await instance.get(`/19-4/recipients/${recipientId}/`);
  return recipientRes.data;
};

const postReaction = async (recipientId, data) => {
  const reactionPostRes = await instance.post(
    `/19-4/recipients/${recipientId}/reactions/`,
    data
  );
  return reactionPostRes.data;
};

const getCards = async (limit = 4, offset = 0, sort = "") => {
  try {
    const res = await instance.get("19-4/recipients/", {
      params: {
        limit,
        offset,
        ...(sort && { sort }),
      },
    });
    return { results: res.data.results, count: res.data.count };
  } catch (error) {
    console.error("❌ getCards 실패:", error);
    throw error;
  }
};

// 롤링페이퍼(Recipient) 삭제
const deleteRecipient = async (recipientId) => {
  try {
    const res = await instance.delete(`/19-4/recipients/${recipientId}/`);
    return res.data;
  } catch (err) {
    console.error("❌ 롤링페이퍼 삭제 실패:", err);
    throw err;
  }
};

export { deleteRecipient, getCards, getReactions, getRecipient, postReaction };
