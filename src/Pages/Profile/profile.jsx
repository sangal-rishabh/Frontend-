import React, { useState, useEffect } from "react";
import "./profile.css";
import SideNavbar from "../../Components/SideNavbar/sideNavbar.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = ({ sideNavbar }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const fetchProfileData = async () => {
    axios
      .get(`https://backend-service-1j0i.onrender.com/api/${id}/channel`)
      .then((response) => {
        console.log(response.data.videos);
        setData(response.data.videos);
        setUser(response.data.videos[0]?.user);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <div className="profile">
      {/* import side navebar in the left side of the profile page */}
      <SideNavbar sideNavbar={sideNavbar} />

      {/* sidenavbar profile page */}
      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        {/* prfile top section  */}
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              src={user?.profilePic}
              alt="profile"
              className="profile_image"
            />
          </div>
          <div className="profile_top_section_about">
            <div className="profile_top_section_about_name">
              {user?.channelName}
            </div>
            <div className="profile_top_section_info">
              {user?.userName} . {data.length} videos
            </div>
            <div className="profile_top_section_info">{user?.about}</div>
          </div>
        </div>
        {/* profile top section end */}

        <div className="profile_video">
          <div className="profile_video_title">
            {" "}
            Video &nbsp; <PlayArrowIcon />{" "}
          </div>

          <div className="profileVideo">
            {/* div for video post  */}

            {data.map((item, key) => {
              return (
                <Link to={`/watch/${item._id}`} className="profileVideo_block">
                  <div className="profileVideo_block_thumbnail">
                    <img
                      src={item?.thumbnail}
                      alt="Thumbnail"
                      className="profilevideo_block_thumbnail_img"
                    />
                  </div>
                  <div className="proflile_detail_block">
                    <div className="profile_video_detail_name">
                      {item.title}
                    </div>
                    <div className="profile_video_detail_about">
                      Created At{item?.createdAt.slice(0, 10)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
