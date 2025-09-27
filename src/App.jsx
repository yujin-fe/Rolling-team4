import React from "react";
import { Route,Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;
