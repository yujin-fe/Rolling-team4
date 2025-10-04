import "./List.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { getCards, getReactions } from "../api/list";
import Button from "../components/Button";
import Listcard from "../components/Listcard";

import list_arrow from "./../assets/imgs/list_arrow.svg";

const List = () => {
  const [popularCard, setPopularCard] = useState([]);
  const [recentCard, setRecentCard] = useState([]);
  const [profileImages, setProfileImages] = useState([]);
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    const fetchListCards = async () => {
      try {
        const { popular, recent } = await getCards();
        setPopularCard(popular);
        setRecentCard(recent);
      } catch (error) {
        console.error("카드 불러오기 실패:", error);
        setPopularCard([]);
        setRecentCard([]);
      }
    };

    fetchListCards();
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
        const results = await getReactions(recipientId);
        console.log("리액션API 응답:", recipientId, results);

        setReactions((prev) => ({
          ...prev,
          [recipientId]: results,
        }));
      } catch (error) {
        console.error("리액션 불러오기 실패:", error);
      }
    };
    //인기,최신순 해당 카드의 리액션데이터 불러오기
    [...popularCard, ...recentCard].forEach((c) => {
      if (c.id) fetchReactions(c.id);
    });
  }, [popularCard, recentCard]);

  const renderCardList = (cards) =>
    cards.map(({ id, ...rest }) => (
      <Link key={id} to={`/post/${id}`}>
        <Listcard
          {...rest}
          profileImages={profileImages}
          reactions={reactions[id]}
        />
      </Link>
    ));

  return (
    <div className="rolling_list">
      <div className="rolling_popular">
        <h3 className="txt-24-b">인기 롤링 페이퍼 🔥</h3>
        <div className="rolling_popular_card">
          {renderCardList(popularCard)}
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
          {renderCardList(recentCard)}
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
