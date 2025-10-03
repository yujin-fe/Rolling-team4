import axios from "axios";

const API = axios.create({
  baseURL: "https://rolling-api.vercel.app/19-4",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 메시지 조회 (특정 recipientId)
 */
export const getMessages = async (recipientId) => {
  const res = await API.get(`/recipients/${recipientId}/messages/`);
  return res.data.results; // 메시지 배열만 반환
};
/**
 * 메시지 작성
 */
export const createMessage = async (recipientId, data) => {
  const res = await API.post(`/recipients/${recipientId}/messages/`, data);
  return res.data;
};

/**
 * 메시지 수정 (선택 사항)
 * PATCH /messages/{id}/
 */
// export const updateMessage = async (id, data) => {
//   const res = await API.patch(`/messages/${id}/`, data);
//   return res.data;
// };

/**
 * 메시지 삭제
 * DELETE /messages/{messageId}/
 */
export const deleteMessage = async (messageId) => {
  const res = await API.delete(`/messages/${messageId}/`);
  return res.data;
};
