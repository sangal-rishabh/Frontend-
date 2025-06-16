import React from "react";
import "./navbar.css"; // import css file
import MenuIcon from "@mui/icons-material/Menu"; // import menu icon
import YouTubeIcon from "@mui/icons-material/YouTube"; // import youtube icon
import SearchIcon from "@mui/icons-material/Search"; // import seach icon
import MicIcon from "@mui/icons-material/Mic"; // import mic icon
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import SideNavbar from "../SideNavbar/sideNavbar";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/login";
import axios from "axios";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  // when user come the the profile img login here
  const [userPick, setUserPick] = useState(
    "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
  );

  // handle login logout
  const [navbarmodel, setNavbarModel] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const navigate = useNavigate();

  const handleClickModel = () => {
    setNavbarModel((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };
  const handleProfile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModel(false);
  };

  const setLoginModel = (val) => {
    setLogin(false);
  };
  // login logout Function
  const onclickOfPopUpOption = (button) => {
    setNavbarModel(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
  };
  const getLogoutFun = async () => {
    axios
      .post("https://backend-service-1j0i.onrender.com/auth/logout", {}, { withCredentials: true })
      .then((response) => {
        console.log("Logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLogedIn(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPick(userProfilePic);
    }
  }, []);
  return (
    <>
      {/* The main navbar class */}
      <div className="navbar">
        {/* Left side of the navbar  */}
        <div className="navbar_left">
          {/* Menu icon  class */}
          <div className="navbar_hamberger" onClick={sideNavbarFunc}>
            <MenuIcon sx={{ color: "white" }} />
          </div>

          {/* youtube left icon class */}
          <Link to={"/"} className="navbar_youtubeimg">
            <YouTubeIcon
              sx={{ fontSize: "34px" }}
              className="navbar_youtubeImage"
            />
            <div className="youtube_title">YouTube</div>
          </Link>
        </div>

        {/* Middle part of the navbar */}
        <div className="navbar_middle">
          <div className="navbar_searchbox">
            <input
              type="text"
              placeholder="Search"
              className="navbar_searchbox_input"
            />
            <div className="navbar_search_icon">
              <SearchIcon sx={{ color: "white" }} />
            </div>
          </div>

          {/* mic icon section  */}
          <div className="navbar_mic">
            <MicIcon sx={{ color: "white" }} />
          </div>
        </div>

        {/*  middle part is end  */}

        {/* Right part  */}

        <div className="navbar_right">
          <Link to={"/7667/uplod"}>
            <VideoCallIcon
              sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
            />
          </Link>
          <NotificationsIcon
            sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
          />

          <img
            onClick={handleClickModel}
            src={userPick}
            className="navbar_right_logo"
            alt="logo"
          />

          {/* when the navbarmodel value is true then it show */}
          {navbarmodel && (
            <div className="navbar_modle">
              {isLogedIn && (
                <div className="navbar_modle_option" onClick={handleProfile}>
                  Profile
                </div>
              )}

              {isLogedIn && (
                <div
                  className="navbar_modle_option"
                  onClick={() => onclickOfPopUpOption("logout")}
                >
                  Logout
                </div>
              )}

              {!isLogedIn && (
                <div
                  className="navbar_modle_option"
                  onClick={() => onclickOfPopUpOption("login")}
                >
                  Login
                </div>
              )}
            </div>
          )}
        </div>

        {/* LOgin  Logout  section side navebar section  */}

        {login && <Login setLoginModel={setLoginModel} />}
      </div>
    </>
  );
};

export default Navbar;
