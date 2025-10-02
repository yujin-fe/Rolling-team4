import "./ActionBar.scss";
import { useEffect, useState } from "react";

import instance from "../api/axios";
import emojiAdd from "../assets/icons/emoji-add.png";
import shareBtn from "../assets/icons/Union.svg";
import arrowBtn from "../assets/imgs/btn_arrow.svg";

import Button from "./Button";
import Emoji from "./Emoji";
import Profile from "./Profile";
import ReactionWindow from "./ReactionWindow";

const ActionBar = ({ recipientId, messagesData }) => {
  const [recipientData, setRecipientData] = useState({});
  const [reactionsData, setReactionsData] = useState({});
  const [isOpened, setIsOpened] = useState(false);
  const [offset, setOffset] = useState(0);
  const INITIAL_LIMIT = 11;
  const LOAD_MORE_LIMIT = 8;

  const images =
    messagesData?.results?.map((message) => message.profileImageURL) ?? [];

  useEffect(() => {
    const getRecipientData = async () => {
      const recipientRes = await instance.get(
        `/19-4/recipients/${recipientId}/`
      );
      setRecipientData(recipientRes.data);
    };
    const getReactionsData = async () => {
      const reactionsRes = await instance.get(
        `/19-4/recipients/${recipientId}/reactions/?limit=${INITIAL_LIMIT}&offset=0`
      );
      setReactionsData(reactionsRes.data);
      setOffset(INITIAL_LIMIT);
    };

    getRecipientData();
    getReactionsData();
  }, [recipientId]);

  const onClickReactions = () => {
    setIsOpened(!isOpened);
  };

  const onClickLoadMore = async () => {
    const loadMoreRes = await instance.get(
      `/19-4/recipients/${recipientId}/reactions/?limit=${LOAD_MORE_LIMIT}&offset=${offset}`
    );
    setOffset(prev => prev+LOAD_MORE_LIMIT)
    setReactionsData({...reactionsData, results:[...reactionsData.results,...loadMoreRes.data.results]})
    console.log(loadMoreRes.data)
  };

  return (
    <div className="ActionBar">
      <h2 className="recipient-name txt-28-b">To. {recipientData.name}</h2>
      <div className="menu-wrapper">
        <div className="profile-wrapper">
          <Profile images={images} />
          <div className="txt-18">
            <span className="txt-18-b">{messagesData.count}</span>명이
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
          <button className="reaction-window-btn" onClick={onClickReactions}>
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
