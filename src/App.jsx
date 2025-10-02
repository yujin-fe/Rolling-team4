import { Route, Routes } from "react-router-dom";

import { ModalProvider } from "./contexts/ModalContext";
import { ToastProvider } from "./contexts/ToastContext";
import Layout from "./layouts/Layout";
import PostLayout from "./layouts/PostLayout";
import Home from "./pages/Home";
import List from "./pages/List";
import Post from "./pages/Post";
import PostId from "./pages/PostId";
import PostIdEdit from "./pages/PostIdEdit";
import PostIdMessage from "./pages/PostIdMessage";

function App() {
  return (
    <ModalProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post" element={<Post />} />
            <Route path="list" element={<List />} />
            {/* postId와 postIdEdit의 UI를 담당하는 레이아웃 */}
            <Route path="post/:id" element={<PostLayout />}>
              <Route index element={<PostId />} />
              <Route path="edit" element={<PostIdEdit />} />
            </Route>
            <Route path="message" element={<PostIdMessage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </ModalProvider>
  );
}

export default App;
