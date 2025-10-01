import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Post from "./pages/Post";
import List from "./pages/List";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<Post />} />
        <Route path="list" element={<List />} />
      </Route>
    </Routes>
  );
}

export default App;
