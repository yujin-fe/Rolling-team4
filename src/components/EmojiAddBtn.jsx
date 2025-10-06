import "./EmojiAddBtn.scss";
import { EmojiPicker } from "frimousse";

import emojiAdd from "../assets/icons/emoji-add.png";

import Button from "./Button";

const EmojiAddBtn = () => {
  return (
    <div className="EmojiAddBtn">
      <Button icon={emojiAdd} size="sm" variant="outlined">
        추가
      </Button>
      <EmojiPicker.Root locale="ko" columns={8} onEmojiSelect={({ emoji }) => console.log(emoji)}>
        <EmojiPicker.Search />
        <EmojiPicker.Viewport>
          <EmojiPicker.List />
        </EmojiPicker.Viewport>
      </EmojiPicker.Root>
    </div>
  );
};

export default EmojiAddBtn;
