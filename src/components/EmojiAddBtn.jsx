import emojiAdd from "../assets/icons/emoji-add.png";

import Button from "./Button"

const EmojiAddBtn = () => {

  return(
    <Button icon={emojiAdd} size="sm" variant="outlined">
      추가
    </Button>
  )
}

export default EmojiAddBtn;