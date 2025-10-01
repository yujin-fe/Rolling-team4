import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import "./List.scss";

const List = () => {
  const isActive = true;
  const [card, setCard] = useState([]);
  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    const fetchPopularCard = async () => {
      try {
        const res = await axios.get(
          "https://rolling-api.vercel.app/19-4/recipients/?limit=4&offset=0"
        );
        console.log("카드API 응답:", res.data);
        if (res.data && Array.isArray(res.data.results)) {
          const reactionSort = res.data.results.sort(
            (a, b) => b.reactionCount - a.reactionCount
          );
          setCard(res.data.results);
        } else {
          setCard([]);
        }
      } catch (error) {
        console.error("카드 불러오기 실패:", error);
        setCard([]);
      }
    };

    fetchPopularCard();
  }, []);

  useEffect(() => {
    const fetchRecentCard = async () => {
      try {
        const res = await axios.get(
          "https://rolling-api.vercel.app/4/recipients/?limit=4&offset=0"
        );
        console.log("카드API 응답:", res.data);
        if (res.data && Array.isArray(res.data.results)) {
          const reactionSort = res.data.results.sort(
            (a, b) => b.reactionCount - a.reactionCount
          );
          setCard(res.data.results);
        } else {
          setCard([]);
        }
      } catch (error) {
        console.error("카드 불러오기 실패:", error);
        setCard([]);
      }
    };

    fetchRecentCard();
  }, []);

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const res = await axios.get(
          "https://rolling-api.vercel.app/profile-images/"
        );
        console.log("프로필API 응답:", res.data);

        if (res.data && Array.isArray(res.data.imageUrls)) {
          setProfileImages(res.data.imageUrls);
        } else {
          setProfileImages([]);
        }
      } catch (error) {
        console.error("프로필 이미지 불러오기 실패:", error);
        setProfileImages([]);
      }
    };

    fetchProfileImages();
  }, []);

  return (
    <div className="list">
      <div className="rolling_popular">
        <h3 className={`txt-24-b ${isActive ? "active" : ""}`}>
          인기 롤링 페이퍼 🔥
        </h3>
        <div className="rolling_popular_card">
          {card.map((c) => (
            <Card
              key={c.id}
              name={c.name}
              messageCount={c.messageCount}
              backgroundColor={c.backgroundColor}
              backgroundImageURL={c.backgroundImageURL}
              reactionCount={c.reactionCount}
              profileImages={profileImages}
              createdAt={c.createdAt}
            />
          ))}
        </div>
      </div>
      <div className="rolling_recent">
        <h3 className={`txt-24-b ${isActive ? "active" : ""}`}>
          최근에 만든 롤링 페이퍼 ✨
        </h3>
        <div className="rolling_recent_card">
          {card.map((c) => (
            <Card
              key={c.id}
              name={c.name}
              messageCount={c.messageCount}
              backgroundColor={c.backgroundColor}
              backgroundImageURL={c.backgroundImageURL}
              reactionCount={c.reactionCount}
              profileImages={profileImages}
              createdAt={c.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
