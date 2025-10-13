import instance from "./axios.js";

const getBackgroundData = async (recipientId) => {
  try {
    const res = await instance.get(`19-4/recipients/${recipientId}/`);
    return {
      backgroundColor: res.data.backgroundColor ?? "#ffffff",
      backgroundImage: res.data.backgroundImageURL ?? null,
    };
  } catch (err) {
    console.error("❌ 배경 데이터 조회 실패:", err);
    throw err;
  }
};

const getProfileImages = async () => {
  try {
    const res = await instance.get("/profile-images/");
    return res.data.imageUrls.slice(1);
  } catch (err) {
    console.error("❌ 프로필 이미지 불러오기 실패:", err);
    return [];
  }
};

export { getBackgroundData, getProfileImages };
