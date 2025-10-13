import "./Post.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundSelect from "../components/BackgroundSelect";
import Button from "../components/Button";
import InputPost from "../components/InputPost";
import { useToast } from "../contexts/ToastContext";

import axios from "@/api/axios";

const Post = () => {
  const [receiver, setReceiver] = useState("");
  const [background, setBackground] = useState("");
  const [tab, setTab] = useState("color");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isDisabled =
    !receiver.trim() ||
    (tab === "color" && !background) ||
    (tab === "image" && !background);

  const handleGenerate = async () => {
    const payload = {
      team: "4",
      name: receiver,
      backgroundColor: tab === "color" ? background : "beige",
      backgroundImageURL: tab === "image" ? background : null,
    };
    try {
      const res = await axios.post("/19-4/recipients/", payload);
      showToast("생성 되었습니다.");
      navigate(`/post/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-wrap">
      <div className="post-container">
        <InputPost title="To." value={receiver} onChange={setReceiver} />
        <BackgroundSelect
          tab={tab}
          setTab={setTab}
          background={background}
          setBackground={setBackground}
        />
      </div>

      <Button size="full" onClick={handleGenerate} disabled={isDisabled}>
        생성하기
      </Button>
    </div>
  );
};

export default Post;
