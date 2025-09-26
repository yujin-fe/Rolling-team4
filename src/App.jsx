import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Post from "./pages/Post";
import Home from "./pages/Home";

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
