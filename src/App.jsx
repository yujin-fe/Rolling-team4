import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import instance from "./api/axios.js";
import Layout from "./layouts/Layout";
import PostApiLayout from "./layouts/PostApiLayout";
import PostDetailLayout from "./layouts/PostDetailLayout";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PostId from "./pages/PostId";
import PostIdEdit from "./pages/PostIdEdit";
import PostIdMessage from "./pages/PostIdMessage";

export const RecipientsStateContext = createContext();

function App() {
  //recipients 데이터 관리하는 상태 데이터
  const [recipientsData, setRecipientsData] = useState([]);

  useEffect(() => {
    const getRecipientsData = async () => {
      try {
        const res = await instance.get("19-4/recipients/");
        setRecipientsData(res.data);
      } catch (e) {
        console.log(e);
        alert("오류가 발생했습니다.");
      }
    };

    getRecipientsData();
  }, []);

  return (
    <RecipientsStateContext.Provider value={recipientsData}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post" element={<Post />} />
          {/* message 데이터 api만 담당하는 레이아웃 -> post/{id}가 필요한 페이지에 사용됨*/}
          <Route path="/post/:id" element={<PostApiLayout />}>
            {/* postId와 postIdEdit의 UI를 담당하는 레이아웃 */}
            <Route element={<PostDetailLayout />}>
              <Route index element={<PostId />} />
              <Route path="edit" element={<PostIdEdit />} />
            </Route>
            <Route path="message" element={<PostIdMessage />} />
          </Route>
        </Route>
      </Routes>
    </RecipientsStateContext.Provider>
  );
}

export default App;
