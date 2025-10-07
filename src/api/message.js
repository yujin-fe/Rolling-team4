import instance from "./axios";

/**
 * 메시지 조회 (특정 recipientId)
 */
export const getMessages = async (recipientId) => {
  try {
    const res = await instance.get(`19-4/recipients/${recipientId}/messages/`);
    return res.data?.results ?? [];
  } catch (err) {
    console.error("❌ 메시지 조회 실패:", err);
    throw err;
  }
};
/**
 * 메시지 작성
 */
export const createMessage = async (recipientId, data) => {
  try {
    const res = await instance.post(
      `19-4/recipients/${recipientId}/messages/`,
      data
    );
    return res.data;
  } catch (err) {
    console.error("❌ 메시지 작성 실패:", err);
    throw err;
  }
};

/**
 * 메시지 수정 (선택 사항)
 * PATCH /messages/{id}/
 */
// export const updateMessage = async (id, data) => {
//   try {
//     const res = await instance.patch(`19-4/messages/${id}/`, data);
//     return res.data;
//   } catch (err) {
//     console.error("❌ 메시지 수정 실패:", err);
//     throw err;
//   }
// };

/**
 * 메시지 삭제
 * DELETE /messages/{messageId}/
 */
export const deleteMessage = async (messageId) => {
  try {
    const res = await instance.delete(`19-4/messages/${messageId}/`);
    return res.data;
  } catch (err) {
    console.error("❌ 메시지 삭제 실패:", err);
    throw err;
  }
};

/**
 * 롤링페이퍼 배경 조회 (특정 recipientId)
 */
