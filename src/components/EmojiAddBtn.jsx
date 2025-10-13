import "./EmojiAddBtn.scss";
import { EmojiPicker } from "frimousse";

import emojiAdd from "../assets/icons/emoji-add.png";

import Button from "./Button";

const EmojiAddBtn = ({onClickAddBtn, handleSelectEmoji, isOpened}) => {
  
  return (
    <div className="EmojiAddBtn">
      <Button icon={emojiAdd} size="sm" variant="outlined" onClick={(e)=>{
        onClickAddBtn();
        e.currentTarget.blur();
      }}>
        <span>추가</span>
      </Button>
      {isOpened &&
      (<EmojiPicker.Root locale="ko" columns={8} onEmojiSelect={({ emoji }) => handleSelectEmoji(emoji)}>
        <EmojiPicker.Search />
        <EmojiPicker.Viewport>
          <EmojiPicker.List />
        </EmojiPicker.Viewport>
      </EmojiPicker.Root>)
      }
    </div>
  );
};

export default EmojiAddBtn;

