import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";
import axios from "axios";
const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-3-858w.onrender.com/api/allvideo")
      .then((res) => {
        console.log(res.data.videos);
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // array for options
  const options = [
    "All",
    "Music",
    "Sports",
    "Song",
    "NEWS",
    "Coding",
    "Lofi",
    "Music",
    "Sports",
    "Song",
    "NEWS",
    "Coding",
    "Lofi",
    "Music",
    "Sports",
    "Song",
    "NEWS",
    "Coding",
    "Lofi",
    "NEWS",
    "Coding",
    "Lofi",
    "Music",
    "Sports",
    "Song",
    "NEWS",
    "Coding",
    "Lofi",
  ];
  return (
    <>
      {/* main home page section  */}
      <div className={sideNavbar ? "homePage" : "fullhomePage"}>
        {/* home page option section  */}
        <div className="homePage_Options">
          {options.map((item, index) => {
            return <div className="homePage_Option">{item}</div>;
          })}
        </div>

        {/* Home Main Page  */}

        <div
          className={sideNavbar ? "home_mainPage" : "home_mainpage_withoutlink"}
        >
          {data?.map((item, ind) => {
            return (
              <Link to={`/watch/${item._id}`} className="youtube_video">
                <div className="youtube_thumbnail_box">
                  <img
                    src={item.thumbnail}
                    alt="thumbnail"
                    className="youtube_thumbnailPic"
                  />
                  <div className="youtube_video_thumnail_time">28:44</div>
                </div>

                <div className="youtube_title_box">
                  <div className="youtubetitle_profileimg">
                    <img
                      src={item?.user?.profilePic}
                      alt="profile img"
                      className="youtube_thumnail_profile"
                    />
                  </div>

                  <div className="youtubetitle_title">
                    <diV className="youtube_videotitle">{item.title}</diV>
                    <diV className="youtube_channel">
                      {item?.user?.channelName}
                    </diV>
                    <diV className="youtube_view">156k</diV>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
