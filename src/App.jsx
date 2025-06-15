import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/Home/home";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video/video";
import Profile from "./Pages/Profile/profile";
import VideoUplod from "./Pages/VideoUplod/videoUplod";
import SignUp from "./Pages/SignUp/signUp";
import axios from "axios";

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };
  return (
    <>
      <div className="app">
        <Navbar
          setSideNavbarFunc={setSideNavbarFunc}
          sideNavbar={sideNavbar}
        ></Navbar>
        <Routes>
          <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
          <Route path="/watch/:id" element={<Video />} />
          <Route
            path="/user/:id"
            element={<Profile sideNavbar={sideNavbar} />}
          />
          <Route path="/:id/uplod" element={<VideoUplod />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
