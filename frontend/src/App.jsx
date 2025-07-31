import React from "react";
import { Route, Routes } from "react-router-dom";
import FilesUpload from "./pages/FilesUpload";
import ViewFiles from "./pages/ViewFiles";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Documents from "./pages/Documents";
import Dashboard from "./pages/Dashboard";
import Music from "./pages/Music"
import Photos from "./pages/Photos";
import Sidebar from "./pages/Sidebar";
import Videos from "./pages/Videos";

function App() {
  return (
    <Routes>
      <Route path="*" element={<h1>Page Not Found</h1>} />

      <Route path="/upload" element={<FilesUpload />} />
      <Route path="/files" element={<ViewFiles />} />
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="photos" element={<Photos />} />
        <Route path="documents" element={<Documents />} />
        <Route path="music" element={<Music />} />
        <Route path="videos" element={<Videos />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
