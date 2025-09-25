import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Post from "./pages/Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="post" element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;
