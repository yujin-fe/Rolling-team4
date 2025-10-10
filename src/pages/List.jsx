import "./List.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBackgroundData } from "../api/images";
import { getMessages } from "../api/message";
import { getCards, getReactions } from "../api/recipients";
import Button from "../components/Button";
import Listcard from "../components/Listcard";

import list_arrow from "./../assets/imgs/list_arrow.svg";

const List = () => {
  const [popularCard, setPopularCard] = useState([]);
  const [recentCard, setRecentCard] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const [backgrounds, setBackgrounds] = useState({});
  const [reactions, setReactions] = useState({});
  const [popularOffset, setPopularOffset] = useState(0);
  const [recentOffset, setRecentOffset] = useState(0);
  const [popularTotal, setPopularTotal] = useState(0);
  const [recentTotal, setRecentTotal] = useState(0);

  const limit = 4;

  /**  인기 카드 */
  useEffect(() => {
    (async () => {
      try {
        const { results, count } = await getCards(limit, popularOffset, "like");
        setPopularCard(results);
        setPopularTotal(count);
      } catch (error) {
        console.error("🔥 인기 카드 불러오기 실패:", error);
      }
    })();
  }, [popularOffset]);

  /**  최신 카드 */
  useEffect(() => {
    (async () => {
      try {
        const { results, count } = await getCards(limit, recentOffset);
        setRecentCard(results);
        setRecentTotal(count);
      } catch (error) {
        console.error("🔥 최신 카드 불러오기 실패:", error);
      }
    })();
  }, [recentOffset]);

  /**  중복 없는 카드만 추출 */
  const getUniqueCards = () => {
    const combined = [...popularCard, ...recentCard];
    return combined.filter(
      (card, index, self) => index === self.findIndex((c) => c.id === card.id)
    );
  };

  /**  카드별 프로필 + 배경 + 리액션 */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const cards = getUniqueCards();
        const cardsToFetch = cards.filter(
          (c) => !profileImages[c.id] || !backgrounds[c.id] || !reactions[c.id]
        );

        await Promise.all(
          cardsToFetch.map(async (card) => {
            try {
              const messages = await getMessages(card.id);
              const messageArray = messages?.results ?? messages;
              const images = Array.isArray(messageArray)
                ? messageArray.map((msg) => msg.profileImageURL).filter(Boolean)
                : [];
              setProfileImages((prev) => ({ ...prev, [card.id]: images }));

              const bg = await getBackgroundData(card.id);
              setBackgrounds((prev) => ({ ...prev, [card.id]: bg }));

              const res = await getReactions({
                recipientId: card.id,
                limit: 3,
                offset: 0,
              });
              setReactions((prev) => ({
                ...prev,
                [card.id]: res?.results ?? [],
              }));
            } catch (err) {
              console.warn(`⚠️ 카드(${card.id}) 데이터 실패:`, err.message);
            }
          })
        );
      } catch (error) {
        console.error("❌ 카드 세부 데이터 불러오기 실패:", error);
      }
    };

    fetchDetails();
  }, [popularCard, recentCard]);

  /** 페이지네이션 */
  const onClickNextPopular = () => setPopularOffset((p) => p + limit);
  const onClickPrevPopular = () =>
    setPopularOffset((p) => Math.max(p - limit, 0));
  const onClickNextRecent = () => setRecentOffset((p) => p + limit);
  const onClickPrevRecent = () =>
    setRecentOffset((p) => Math.max(p - limit, 0));

  /** 카드 리스트 렌더링 */
  const renderCardList = (cards) =>
    cards.map(({ id, ...rest }) => (
      <Link key={id} to={`/post/${id}`}>
        <Listcard
          {...rest}
          profileImages={profileImages[id] ?? []}
          reactions={reactions[id]}
          backgroundColor={backgrounds[id]?.backgroundColor}
          backgroundImageURL={backgrounds[id]?.backgroundImage}
        />
      </Link>
    ));

  /** 🎡 가로 스크롤 (1200px 이상일 때만) */
  useEffect(() => {
    if (window.innerWidth < 1200) return;

    const popular = document.querySelector(".rolling_popular_card");
    const recent = document.querySelector(".rolling_recent_card");

    const handleWheel = (e, el) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY; // 세로 스크롤 → 가로로 이동
    };

    const onPopularWheel = (e) => handleWheel(e, popular);
    const onRecentWheel = (e) => handleWheel(e, recent);

    if (popular)
      popular.addEventListener("wheel", onPopularWheel, { passive: false });
    if (recent)
      recent.addEventListener("wheel", onRecentWheel, { passive: false });

    return () => {
      if (popular) popular.removeEventListener("wheel", onPopularWheel);
      if (recent) recent.removeEventListener("wheel", onRecentWheel);
    };
  }, []);

  return (
    <div className="rolling_list">
      {/*  인기 롤링페이퍼 */}
      <div className="rolling_popular">
        <h3 className="txt-24-b">인기 롤링 페이퍼 🔥</h3>
        <div className="rolling_popular_card">
          {renderCardList(popularCard)}
          {popularOffset + limit < popularTotal && (
            <Button className="next_icon icon" onClick={onClickNextPopular}>
              <img src={list_arrow} alt="다음" />
            </Button>
          )}
          {popularOffset > 0 && (
            <Button className="prev_icon icon" onClick={onClickPrevPopular}>
              <img src={list_arrow} alt="이전" />
            </Button>
          )}
        </div>
      </div>

      {/* 최신 롤링페이퍼 */}
      <div className="rolling_recent">
        <h3 className="txt-24-b">최근에 만든 롤링 페이퍼 ✨</h3>
        <div className="rolling_recent_card">
          {renderCardList(recentCard)}
          {recentOffset + limit < recentTotal && (
            <Button className="next_icon icon" onClick={onClickNextRecent}>
              <img src={list_arrow} alt="다음" />
            </Button>
          )}
          {recentOffset > 0 && (
            <Button className="prev_icon icon" onClick={onClickPrevRecent}>
              <img src={list_arrow} alt="이전" />
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
