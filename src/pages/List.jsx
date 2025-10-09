import "./List.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import { getProfileImages } from "../api/images";
import { getBackgroundData } from "../api/images";
import { getMessages } from "../api/message";
import { getReactions } from "../api/recipients";
import { getCards } from "../api/recipients";
import Button from "../components/Button";
import Listcard from "../components/Listcard";

import list_arrow from "./../assets/imgs/list_arrow.svg";

const List = () => {
  const [allCards, setAllCards] = useState([]);
  const [popularCard, setPopularCard] = useState([]);
  const [recentCard, setRecentCard] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const [reactions, setReactions] = useState({});
  const [popularOffset, setPopularOffset] = useState(0);
  const [recentOffset, setRecentOffset] = useState(0);
  const [backgrounds, setBackgrounds] = useState({});

  const limit = 4;

  useEffect(() => {
    const fetchPopularCards = async () => {
      try {
        const cards = await getCards(limit, popularOffset); //api로 받아온 getcards 를 4개씩 초기값0번째 부터 가져오는걸 cards에 저장
        const sorted = [...cards].sort(
          (a, b) => b.reactionCount - a.reactionCount
        ); // 스프레드로  새배열을 만들고 리액션 높은순으로 정렬
        setAllCards(sorted); // setAllCards에 정렬된거 저장
        setPopularCard(sorted.slice(popularOffset, popularOffset + limit)); // 정렬 된 새 배열을 setPopularCard에 0부터 4까지 잘라서 화면상태에 저장
      } catch (error) {
        console.error("인기 카드 불러오기 실패:", error);
      }
    };

    fetchPopularCards();
  }, [popularOffset]);

  useEffect(() => {
    const fetchRecentCards = async () => {
      try {
        const cards = await getCards(limit, recentOffset); // 같은 함수 재활용
        const sorted = [...cards].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllCards(sorted);
        setRecentCard(sorted.slice(recentOffset, recentOffset + limit));
      } catch (error) {
        console.error("최신 카드 불러오기 실패:", error);
      }
    };

    fetchRecentCards();
  }, [recentOffset]);

  const onClickNextPopular = () => {
    setPopularOffset((prev) => prev + limit);
  };

  const onClickPrevPopular = () => {
    setPopularOffset((prev) => Math.max(prev - limit, 0));
  };

  const onClickNextRecent = () => {
    setRecentOffset((prev) => prev + limit);
  };

  const onClickPrevRecnet = () => {
    setRecentOffset((prev) => Math.max(prev - limit, 0));
  };

  // 프로필 이미지 불러오기
  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const targetCards = [...popularCard, ...recentCard];
        for (const card of targetCards) {
          const messages = await getMessages(card.id);
          const images = messages.map((msg) => msg.profileImageURL) ?? [];
          setProfileImages((prev) => ({
            ...prev,
            [card.id]: images,
          }));
        }
      } catch (error) {
        console.error("프로필 이미지 불러오기 실패:", error);
      }
    };

    if (popularCard.length > 0 || recentCard.length > 0) {
      fetchProfileImages();
    }
  }, [popularCard, recentCard]);

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

  useEffect(() => {
    const fetchProfileAndBackground = async () => {
      try {
        const targetCards = [...popularCard, ...recentCard];

        for (const card of targetCards) {
          // ✅ 프로필 이미지 불러오기
          const messages = await getMessages(card.id);
          const images = messages.map((msg) => msg.profileImageURL) ?? [];
          setProfileImages((prev) => ({
            ...prev,
            [card.id]: images,
          }));

          // ✅ 배경 불러오기
          const backgroundData = await getBackgroundData(card.id);

          setBackgrounds((prev) => ({
            ...prev,
            [card.id]: backgroundData, // { backgroundColor, backgroundImage }
          }));
        }
      } catch (error) {
        console.error("프로필 또는 배경 불러오기 실패:", error);
      }
    };

    if (popularCard.length > 0 || recentCard.length > 0) {
      fetchProfileAndBackground();
    }
  }, [popularCard, recentCard]);

  // 카드 리스트 렌더링 함수
  const renderCardList = (cards) =>
    cards.map(({ id, ...rest }) => (
      <Link key={id} to={`/post/${id}`}>
        <Listcard
          {...rest}
          profileImages={profileImages[id] ?? []}
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
          {popularOffset + limit < allCards.length && (
            <Button className="next_icon icon" onClick={onClickNextPopular}>
              <img src={list_arrow} alt="리스트 다음 버튼" />
            </Button>
          )}

          {popularOffset > 0 && (
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
          {recentOffset + limit < allCards.length && (
            <Button className="next_icon icon" onClick={onClickNextRecent}>
              <img src={list_arrow} alt="리스트 다음 버튼" />
            </Button>
          )}
          {recentOffset > 0 && (
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
