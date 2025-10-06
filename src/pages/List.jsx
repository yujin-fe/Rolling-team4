import "./List.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Listcard from "../components/Listcard";

import list_arrow from "./../assets/imgs/list_arrow.svg";

const List = () => {
  const [card, setCard] = useState([]);
  const [profileImages, setProfileImages] = useState([]);
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    const fetchPopularCard = async () => {
      try {
        const res = await axios.get(
          "https://rolling-api.vercel.app/19-4/recipients/?limit=4&offset=0"
        );
        console.log("카드API 응답:", res.data);
        if (res.data && Array.isArray(res.data.results)) {
          res.data.results.sort((a, b) => b.reactionCount - a.reactionCount);
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
          "https://rolling-api.vercel.app/19-4/recipients/?limit=4&offset=1"
        );
        console.log("카드API 응답:", res.data);
        if (res.data && Array.isArray(res.data.results)) {
          res.data.results.sort((a, b) => b.reactionCount - a.reactionCount);
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

  useEffect(() => {
    const fetchReactions = async (recipientId) => {
      try {
        const res = await axios.get(
          `https://rolling-api.vercel.app/19-4/recipients/${recipientId}/reactions/?limit=3&offset=0`
        );
        console.log("리액션API 응답:", res.data);
        if (res.data && Array.isArray(res.data.results)) {
          setReactions((prev) => ({
            ...prev,
            [recipientId]: res.data.results,
          }));
        }
      } catch (error) {
        console.error("리액션 불러오기 실패:", error);
      }
    };

    if (card.length > 0) {
      card.forEach((c) => fetchReactions(c.id));
    } // 물어보기
  }, [card]);

  return (
    <div className="rolling_list">
      <div className="rolling_popular">
        <h3 className="txt-24-b">인기 롤링 페이퍼 🔥</h3>
        <div className="rolling_popular_card">
          {card.map((c) => (
            <Link key={c.id} to={`/post/${c.id}`}>
              <Listcard
                name={c.name}
                messageCount={c.messageCount}
                backgroundColor={c.backgroundColor}
                backgroundImageURL={c.backgroundImageURL}
                reactionCount={c.reactionCount}
                profileImages={profileImages}
                createdAt={c.createdAt}
                reaction={c.reaction}
              />
            </Link>
          ))}
          <Button className="next_icon icon">
            <img src={list_arrow} alt="리스트 다음 버튼" />
          </Button>
          <Button className="prev_icon icon">
            <img src={list_arrow} alt="리스트 이전 버튼" />
          </Button>
        </div>
      </div>
      <div className="rolling_recent">
        <h3 className="txt-24-b">최근에 만든 롤링 페이퍼 ✨</h3>
        <div className="rolling_recent_card">
          {card.map((c) => (
            <Link key={c.id} to={`/post/${c.id}`}>
              <Listcard
                name={c.name}
                messageCount={c.messageCount}
                backgroundColor={c.backgroundColor}
                backgroundImageURL={c.backgroundImageURL}
                reactionCount={c.reactionCount}
                profileImages={profileImages}
                reactions={reactions[c.id]}
              />
            </Link>
          ))}
          <Button className="next_icon icon">
            <img src={list_arrow} alt="리스트 다음 버튼" />
          </Button>
          <Button className="prev_icon icon">
            <img src={list_arrow} alt="리스트 이전 버튼" />
          </Button>
        </div>
      </div>
      <div className="listpage_btn_area">
        <Link to="/post">
          <Button className="list_btn btn primary lg txt-18-b">
            나도 만들어보기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default List;
