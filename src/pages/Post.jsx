import { useState } from "react";
import InputPost from "../components/InputPost";
import BackgroundSelect from "../components/BackgroundSelect";
import axios from "@/api/axios";
import "./Post.scss";

const Post = () => {
  const [receiver, setReceiver] = useState("");
  const [background, setBackground] = useState("");
  const [tab, setTab] = useState("color");

  const handleGenerate = async () => {
    const payload = {
      team: "4",
      name: receiver,
      backgroundColor: tab === background || "beige",
      backgroundImageURL:
        tab === "image" ? background : "https://dummy.image/img.jpg",
    };
    try {
      const res = await axios.post("/4/recipients/", payload);
      console.log("등록성공", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-wrap">
      <InputPost title="To." receiver={receiver} setReceiver={setReceiver} />
      <BackgroundSelect
        tab={tab}
        setTab={setTab}
        background={background}
        setBackground={setBackground}
      />
      <button type="button" className="btn-generate" onClick={handleGenerate}>
        생성하기
      </button>
    </div>
  );
};

export default Post;
