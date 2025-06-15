import React from "react";
import "./sideNavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Link } from "react-router-dom";
import { useColorScheme } from "@mui/material/styles";

const SideNavbar = ({ sideNavbar }) => {
  return (
    <>
      {/* side navbar  section  */}
      <div className={sideNavbar ? "home_sideNavbar" : "home_sideNavbarHide"}>
        {/* home sidenavbar Top part  */}
        <div className="homesdeNavbarTop">
          {/* home sidenavbar topoption */}

          <Link
            to={"/"}
            className="sideNavbarTopOption"
            style={{ color: "white", textDecoration: "none" }}
          >
            <HomeIcon />
            <div className="home_sideNavbarTopOptionTitle">Home</div>
          </Link>

          <div className={"sideNavbarTopOption"}>
            <VideocamIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">shorts</div>
          </div>
          <div className={"sideNavbarTopOption"}>
            <SubscriptionsIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">Subscriptions</div>
          </div>
        </div>

        {/* side navbar top portion end  */}

        {/* side navbar middle portion  */}

        {/* we use same class becasuse we use same style both the place  */}
        <div className="home_sideNavbar_middle">
          <div className={"sideNavbarTopOption"}>
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">You</div>
            <ChevronRightIcon />
          </div>

          <div className={"sideNavbarTopOption"}>
            <SubscriptionsIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
          </div>

          <div className={"sideNavbarTopOption"}>
            <RecentActorsIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">History</div>
          </div>

          <div className={"sideNavbarTopOption"}>
            <HistoryIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">PlayList</div>
          </div>

          <div className={"sideNavbarTopOption"}>
            <OndemandVideoIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">Your Video</div>
          </div>

          <div className={"sideNavbarTopOption"}>
            <WatchLaterIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">watch Later</div>
          </div>

          <div className={"sideNavbarTopOption"}>
            <ThumbUpIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">Liked Video</div>
          </div>

          <div className={"sideNavbarTopOption"}>
            <ContentCutIcon />
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarTopOptionTitle">Your Clips</div>
          </div>
        </div>
        {/* middle part is end  */}

        {/* bottom part  is start  */}
        <div className="home_sideNavbar_middle">
          <div className={"sideNavbarTopOption"}>
            {/* home sideNavbar top option title */}
            <div className="home_sideNavbarBottemHeading">Subscriptions</div>
          </div>

          <div className="sideNavbarTopOption">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aaj_Tak_logo.svg/1200px-Aaj_Tak_logo.svg.png"
              alt="Aaj Tak"
              className="home_sideNavBar_logo"
            />
            <div className="home_sideNavBarTopOptionTitle">Aaj Tak</div>
          </div>

          <div className="sideNavbarTopOption">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aaj_Tak_logo.svg/1200px-Aaj_Tak_logo.svg.png"
              alt="Aaj Tak"
              className="home_sideNavBar_logo"
            />
            <div className="home_sideNavBarTopOptionTitle">Aaj Tak</div>
          </div>

          <div className="sideNavbarTopOption">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aaj_Tak_logo.svg/1200px-Aaj_Tak_logo.svg.png"
              alt="Aaj Tak"
              className="home_sideNavBar_logo"
            />
            <div className="home_sideNavBarTopOptionTitle">Aaj Tak</div>
          </div>

          <div className="sideNavbarTopOption">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aaj_Tak_logo.svg/1200px-Aaj_Tak_logo.svg.png"
              alt="Aaj Tak"
              className="home_sideNavBar_logo"
            />
            <div className="home_sideNavBarTopOptionTitle">Aaj Tak</div>
          </div>

          <div className="sideNavbarTopOption">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aaj_Tak_logo.svg/1200px-Aaj_Tak_logo.svg.png"
              alt="Aaj Tak"
              className="home_sideNavBar_logo"
            />
            <div className="home_sideNavBarTopOptionTitle">Aaj Tak</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideNavbar;
