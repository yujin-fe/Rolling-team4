import "./ActionBar.scss";
import { useEffect, useState } from "react";

<<<<<<< HEAD
<<<<<<< HEAD
import { getReactions, getRecipient } from "../api/apis.js";
=======
import {getReactions, getRecipient} from "../api/apis.js";
>>>>>>> 8433c69 (fix:api 함수  파일 분리)
=======
import { getReactions, getRecipient } from "../api/apis.js";
>>>>>>> 2207fd0 (fix:try/catch-에러처리)
import arrowBtn from "../assets/icons/btn_arrow.svg";
import emojiAdd from "../assets/icons/emoji-add.png";
import shareBtn from "../assets/icons/Union.svg";

import Button from "./Button";
import Emoji from "./Emoji";
import Profile from "./Profile";
import ReactionWindow from "./ReactionWindow";

const INITIAL_LIMIT = 11;
const LOAD_MORE_LIMIT = 8;

const ActionBar = ({ recipientId, messagesData }) => {
  const [recipientData, setRecipientData] = useState({});
<<<<<<< HEAD
<<<<<<< HEAD
  const [reactionsData, setReactionsData] = useState({ results: [] });
=======
  const [reactionsData, setReactionsData] = useState({results:[]});
>>>>>>> 8433c69 (fix:api 함수  파일 분리)
=======
  const [reactionsData, setReactionsData] = useState({ results: [] });
>>>>>>> 2207fd0 (fix:try/catch-에러처리)
  const [isOpened, setIsOpened] = useState(false);
  const [offset, setOffset] = useState(0);

  const images =
    messagesData?.results?.map((message) => message?.profileImageURL) ?? [];

  const getInitReactions = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2207fd0 (fix:try/catch-에러처리)
    try {
      const reactionsResData = await getReactions({
        recipientId,
        limit: INITIAL_LIMIT,
        offset: 0,
      });
      setReactionsData(reactionsResData);
      setOffset(INITIAL_LIMIT);
    } catch (e) {
      console.log(e.message);
      alert("오류가 발생했습니다.");
    }
<<<<<<< HEAD
  };

  const getRecipientData = async () => {
    try {
      const recipientResData = await getRecipient(recipientId);
      setRecipientData(recipientResData);
    } catch (e) {
      console.log(e.message);
      alert("오류가 발생했습니다.");
    }
=======
    const reactionsResData = await getReactions({
      recipientId,
      limit: INITIAL_LIMIT,
      offset:0,
    });
    setReactionsData(reactionsResData);
    setOffset(INITIAL_LIMIT);
>>>>>>> 8433c69 (fix:api 함수  파일 분리)
=======
>>>>>>> 2207fd0 (fix:try/catch-에러처리)
  };

  const getRecipientData = async () => {
    try {
      const recipientResData = await getRecipient(recipientId);
      setRecipientData(recipientResData);
    } catch (e) {
      console.log(e.message);
      alert("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getRecipientData();
    getInitReactions();
  }, [recipientId]);

  const onClickGetReactions = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    setIsOpened((prev) => !prev);
=======
    setIsOpened(prev => !prev);
>>>>>>> 8433c69 (fix:api 함수  파일 분리)
=======
    setIsOpened((prev) => !prev);
>>>>>>> 2207fd0 (fix:try/catch-에러처리)
    if (Number(reactionsData?.results.length) > 11) {
      getInitReactions();
    }
  };

  const onClickLoadMore = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2207fd0 (fix:try/catch-에러처리)
    try {
      const loadMoreRes = await getReactions({
        recipientId,
        limit: LOAD_MORE_LIMIT,
        offset,
      });
      setOffset((prev) => prev + LOAD_MORE_LIMIT);
      setReactionsData({
        ...reactionsData,
        results: [...reactionsData.results, ...loadMoreRes.results],
      });
    } catch (e) {
      console.log(e.message);
      alert("오류가 발생했습니다.");
    }
<<<<<<< HEAD
=======
    const loadMoreRes = await getReactions({
      recipientId,
      limit:LOAD_MORE_LIMIT,
      offset
    })
    setOffset((prev) => prev + LOAD_MORE_LIMIT);
    setReactionsData({
      ...reactionsData,
      results: [...reactionsData.results, ...loadMoreRes.results],
    });
    console.log(loadMoreRes);
>>>>>>> 8433c69 (fix:api 함수  파일 분리)
=======
>>>>>>> 2207fd0 (fix:try/catch-에러처리)
  };

  return (
    <div className="ActionBar">
      <h2 className="recipient-name txt-28-b">To. {recipientData?.name}</h2>
      <div className="menu-wrapper">
        <div className="profile-wrapper">
          <Profile images={images} />
          <div className="txt-18">
            <span className="txt-18-b">{messagesData?.count}</span>명이
            작성했어요!
          </div>
        </div>
        <div className="divider"></div>
        <div className="reaction-wrapper">
          <div className="badges">
            {recipientData?.topReactions?.map((emoji) => (
              <Emoji key={emoji.id} emoji={emoji.emoji} count={emoji.count} />
            ))}
          </div>
          <button className="reaction-window-btn" onClick={onClickGetReactions}>
            <img
              src={arrowBtn}
              style={{
                transform: isOpened ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </button>
          {isOpened && (
            <ReactionWindow
              data={reactionsData}
              onClickLoadMore={onClickLoadMore}
              onClickGetReactions={onClickGetReactions}
            />
          )}
        </div>
        <div className="btn-wrapper">
          <Button icon={emojiAdd} size="sm" variant="outlined">
            추가
          </Button>
          <div className="divider"></div>
          <Button icon={shareBtn} size="sm" variant="outlined" />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
