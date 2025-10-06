import "./List.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { getReactions } from "../api/apis";
import { getCards } from "../api/list";
import Button from "../components/Button";
import Listcard from "../components/Listcard";

import list_arrow from "./../assets/imgs/list_arrow.svg";

const List = () => {
  const [allCards, setAllCards] = useState([]);
  const [popularCard, setPopularCard] = useState([]);
  const [recentCard, setRecentCard] = useState([]);
  const [profileImages, setProfileImages] = useState([]);
  const [reactions, setReactions] = useState({});
  const [offset, setOffset] = useState(0);
  const limit = 4;

  // 인기, 최신 카드 불러오기
  // useEffect(() => {
  //   const fetchListCards = async () => {
  //     try {
  //       const { popular, recent } = await getCards();
  //       setPopularCard(popular);
  //       setRecentCard(recent);
  //     } catch (error) {
  //       console.error("카드 불러오기 실패:", error);
  //       setPopularCard([]);
  //       setRecentCard([]);
  //     }
  //   };

  //   fetchListCards();
  // }, [visiblePopular]);

  useEffect(() => {
    const fetchPopularCards = async () => {
      try {
        const cards = await getCards(limit, offset); // ✅ 이제 cards는 배열
        const sorted = [...cards].sort(
          (a, b) => b.reactionCount - a.reactionCount
        );
        setAllCards(sorted);
        setPopularCard(sorted.slice(offset, offset + limit));
      } catch (error) {
        console.error("인기 카드 불러오기 실패:", error);
      }
    };

    fetchPopularCards();
  }, [offset]);

  useEffect(() => {
    const fetchRecentCards = async () => {
      try {
        const cards = await getCards(limit, offset); // 같은 함수 재활용
        const sorted = [...cards].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllCards(sorted);
        setRecentCard(sorted.slice(offset, offset + limit));
      } catch (error) {
        console.error("최신 카드 불러오기 실패:", error);
      }
    };

    fetchRecentCards();
  }, [offset]);

  const onClickNextPopular = () => {
    setOffset((prev) => prev + limit);
  };

  const onClickPrevPopular = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const onClickNextRecent = () => {
    setOffset((prev) => prev + limit);
  };

  const onClickPrevRecnet = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  // 프로필 이미지 불러오기
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

  // 각 카드별 리액션 데이터 불러오기
  useEffect(() => {
    const fetchReactions = async (recipientId) => {
      try {
        const res = await getReactions({
          recipientId,
          limit: 3,
          offset: 0,
        });

        console.log("리액션API 응답:", recipientId, res);

        const results = res.results;

        setReactions((prev) => ({
          ...prev,
          [recipientId]: results,
        }));
      } catch (error) {
        console.error("리액션 불러오기 실패:", error);
      }
    };

    // ✅ 인기 + 최신 카드 합쳐서 리액션 요청
    [...popularCard, ...recentCard].forEach((c) => {
      fetchReactions(c.id);
    });
  }, [popularCard, recentCard]);

  // 카드 리스트 렌더링 함수
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
          {offset + limit < allCards.length && (
            <Button className="next_icon icon" onClick={onClickNextPopular}>
              <img src={list_arrow} alt="리스트 다음 버튼" />
            </Button>
          )}

          {offset > 0 && (
            <Button className="prev_icon icon" onClick={onClickPrevPopular}>
              <img src={list_arrow} alt="리스트 이전 버튼" />
            </Button>
          )}
        </div>
      </div>

      <div className="rolling_recent">
        <h3 className="txt-24-b">최근에 만든 롤링 페이퍼 ✨</h3>
        <div className="rolling_recent_card">
          {renderCardList(recentCard)}
          {offset + limit < allCards.length && (
            <Button className="next_icon icon" onClick={onClickNextRecent}>
              <img src={list_arrow} alt="리스트 다음 버튼" />
            </Button>
          )}
          {offset < 0 && (
            <Button className="prev_icon icon" onClick={onClickPrevRecnet}>
              <img src={list_arrow} alt="리스트 이전 버튼" />
            </Button>
          )}
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
