import { useCallback, useEffect, useState } from "react";

import { getReactions, postReaction } from "../api/recipients.js";

import EmojiAddBtn from "./EmojiAddBtn";
import ReactionBtn from "./ReactionBtn";
import ShareBtn from "./ShareBtn.jsx";

const INITIAL_LIMIT = 11;
const LOAD_MORE_LIMIT = 8;

const ActionBarBtnsGropus = ({
  recipientId,
  recipientData,
  getRecipientData,
}) => {
  const [reactionsData, setReactionsData] = useState({ results: [] });
  const [openMenu, setOpenMenu] = useState(null);
  const [offset, setOffset] = useState(0);

  const getInitReactions = useCallback(async () => {
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
    }
  }, [recipientId]);

  useEffect(() => {
    getInitReactions();
  }, [getInitReactions]);

  const onClickLoadMore = async () => {
    try {
      const loadMoreRes = await getReactions({
        recipientId,
        limit: LOAD_MORE_LIMIT,
        offset,
      });
      setOffset((prev) => prev + LOAD_MORE_LIMIT);
      setReactionsData((prev) => ({
        ...prev,
        results: [...prev.results, ...loadMoreRes.results],
      }));
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSelectEmoji = async (emoji) => {
    try {
      const data = {
        emoji,
        type: "increase",
      };
      await postReaction(recipientId, data);
      setOpenMenu((prev) => (prev === "emoji" ? null : "emoji"));
      await Promise.all([getInitReactions(), getRecipientData()]);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleButtons = (menu) => {
    const validMenus = ["reaction", "emoji", "share"];
    if (!validMenus.includes(menu)) return;

    setOpenMenu((prev) => (prev === menu ? null : menu));
    if (menu === "reaction" && Number(reactionsData?.results.length) > 11) {
      getInitReactions();
    }
  };
  return (
    <div className="action-bar-btns-group">
      <ReactionBtn
        recipientData={recipientData}
        reactionsData={reactionsData}
        handleReactions={() => handleButtons("reaction")}
        isOpened={openMenu === "reaction"}
        onClickLoadMore={onClickLoadMore}
      />
      <div className="btn-wrapper">
        <EmojiAddBtn
          recipientId={recipientId}
          handleSelectEmoji={handleSelectEmoji}
          isOpened={openMenu === "emoji"}
          onClickAddBtn={() => handleButtons("emoji")}
        />
        <div className="divider"></div>
        <ShareBtn
          recipientData={recipientData}
          isOpened={openMenu === "share"}
          onClickShareBtn={() => handleButtons("share")}
        />
      </div>
    </div>
  );
};

export default ActionBarBtnsGropus;
