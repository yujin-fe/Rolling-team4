import { useEffect, useState } from "react";

import { getReactions, postReaction } from "../api/apis.js";
import shareBtn from "../assets/icons/Union.svg";

import Button from "./Button";
import EmojiAddBtn from "./EmojiAddBtn"
import ReactionBtn from "./ReactionBtn"

const INITIAL_LIMIT = 11;
const LOAD_MORE_LIMIT = 8;

const ActionBarBtnsGropus = ({ recipientId, recipientData, getRecipientData }) => {
  const [reactionsData, setReactionsData] = useState({ results: [] });
  const [isReactionOpened, setIsReactionOpened] = useState(false);
  const [isEmojiOpened, setIsEmojiOpened] = useState(false);
  const [offset, setOffset] = useState(0);

  const getInitReactions = async () => {
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
  };

  useEffect(() => {
    getInitReactions();
  }, [recipientId]);

  const handleReactions = () => {
    setIsReactionOpened((prev) => !prev);
    if (Number(reactionsData?.results.length) > 11) {
      getInitReactions();
    }
  };

  const onClickLoadMore = async () => {
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
  };

  const onClickAddBtn = () => {
    setIsEmojiOpened(prev=>!prev)
  }

  const handleSelectEmoji = async (emoji) => {
    try{
      const data={
        emoji,
        type:"increase"
      }
      await postReaction(recipientId,data);
      setIsEmojiOpened(prev => !prev)
      getInitReactions();
      getRecipientData();
    }catch(e){
      console.error(e.message)
      alert("이모지 추가에 실패하셨습니다.")
    }
  }

  return (
    <div className="action-bar-btns-group">
      <ReactionBtn 
        recipientData={recipientData} 
        reactionsData={reactionsData} 
        handleReactions={handleReactions} 
        isOpened={isReactionOpened}
        onClickLoadMore={onClickLoadMore}/>
      <div className="btn-wrapper">
        <EmojiAddBtn 
          recipientId={recipientId} 
          handleSelectEmoji={handleSelectEmoji} 
          isOpened={isEmojiOpened}
          onClickAddBtn={onClickAddBtn}/>
        <div className="divider"></div>
        <Button icon={shareBtn} size="sm" variant="outlined" />
      </div>
    </div>
  );
};

export default ActionBarBtnsGropus;
