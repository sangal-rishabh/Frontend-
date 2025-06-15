import React, { useState, useEffect } from "react";
import "./video.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Main component for the video page
const Video = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState([]);

  const fetchVideobyid = async () => {
    try {
      const response = await axios.get(
        `https://backend-2-sqf1.onrender.com/api/getVideoById/${id}`
      );
      setData(response.data.videos);
      setVideoUrl(response.data.videos?.videoLink);
    } catch (err) {
      console.log(err);
    }
  };

  // Helper function to fetch user details by ID
  const fetchUserDetails = async (userId) => {
    try {
      const res = await axios.get(`https://backend-2-sqf1.onrender.com/api/user/${userId}`);
      return res.data.user; // Adjust based on your API response
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const getCommentbyid = async () => {
    try {
      const response = await axios.get(
        `https://backend-2-sqf1.onrender.com/commentApi/comment/${id}`
      );
      const rawComments = response.data.comments;

      const enrichedComments = await Promise.all(
        rawComments.map(async (comment) => {
          if (!comment.user?.channelName) {
            const userDetails = await fetchUserDetails(comment.user);
            return {
              ...comment,
              user: userDetails ? userDetails : { _id: comment.user },
            };
          }
          return comment;
        })
      );

      setComments(enrichedComments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideobyid();
    getCommentbyid();
  }, []);

  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
    await axios
      .post("https://backend-2-sqf1.onrender.com/commentApi/comment", body, {
        withCredentials: true,
      })
      .then(async (response) => {
        const newComment = response.data.comment;

        const userDetails = await fetchUserDetails(newComment.user);
        newComment.user = userDetails ? userDetails : { _id: newComment.user };

        setComments([newComment, ...comments]);
        setMessage("");
      })
      .catch((err) => {
        toast.error("Please Login First to comment");
      });
  };

  return (
    <div className="video">
      <div className="vedioPostSection">
        <div className="video_youtube">
          {data && (
            <video
              width="400"
              controls
              autoPlay
              className="video_youtube_video"
              src={videoUrl}
            />
          )}
        </div>

        <div className="video_youtubeAbout">
          <div className="video_youtubeTitle">{data?.title}</div>

          <div className="youtube_video_profileBlock">
            <div className="youtube_video_profile_left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_profile_image"
              >
                <img
                  src={data?.user?.profilePic}
                  alt="profile"
                  className="youtube_video_profileblock_left_image"
                />
              </Link>

              <div className="youtube_subview">
                <div className="youtubepostProfileName">
                  {data?.user?.channelName}
                </div>
                <div className="youtubepostProfileSubs">
                  {data?.user?.createdAt.slice(0, 10)}
                </div>
              </div>

              <div className="youtubeSubscribeButton">subscribe</div>
            </div>

            <div className="youtube_video_profile_right">
              <div className="youtubeVideoLikeBlock">
                <div className="youtubeLikeBlock_Like">
                  <ThumbUpOffAltIcon />
                  <div className="youtubeVideoLikeBlock_NumberLike">
                    123k
                  </div>
                </div>
                <div className="youtube_vedioDivedr"></div>
                <div className="youtubeLikeBlock_Like">
                  <ThumbDownOffAltIcon />
                  <div className="youtubeVideoLikeBlock_NumberLike">
                    1200
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="youtube_video_About">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>

          <div className="youtube_CommentSection">
            <div className="youtube_CommentSectionTittle">
              {comments.length} comments
            </div>

            <div className="youtube_youtubeselfComment">
              <img
                className="Video_youtubeProfileImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3e2mwgX75RHamsoA4CapiDMbAuGoeArvQzOVbbnHMGC81V1TpaF8kkNy7L04lxCjiYyc&usqp=CAU"
                alt=""
              />

              <div className="addAComment">
                <input
                  type="text"
                  className="AaddACommentInput"
                  placeholder="Add A Comment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="youtube_CancleSubmitCommnet">
                  <div className="cancleComment">Cancel</div>
                  <div className="cancleComment" onClick={handleComment}>
                    Comment
                  </div>
                </div>
              </div>
            </div>

            {comments.map((item, index) => (
              <div className="youtube_youtubeselfComment" key={index}>
                <img
                  className="Video_youtubeProfileImage"
                  src={item?.user?.profilePic}
                  alt="profile"
                />
                <div>
                  <div className="otherCommmnetSectionHeader">
                    <div className="channelName">{item?.user?.channelName}</div>
                    <div className="commentTimingOther">
                      {item?.createdAt?.slice(0, 10)}
                    </div>
                  </div>
                  <div className="otherCommnetSectionComment">
                    {item?.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You can replace below with dynamic suggestions if needed */}
      <div className="videoSuggestions">
        {/* Static suggestion examples */}
        {[...Array(8)].map((_, i) => (
          <div className="videoSuggesionBlock" key={i}>
            <div className="youtube_suggestion_thumbnail">
              <img
                className="youtube_suggestion_thumbnailImage"
                src="https://i.ytimg.com/vi/nsGGMAYnLbs/maxresdefault.jpg"
                alt="video"
              />
            </div>
            <div className="video_suggestion_about">
              <div className="video_suggestion_aboutTitle">
                Lorem ipsum dolor sit amet consectetur...
                <div className="video_suggestion_profileAbout">cricket 320</div>
                <div className="video_suggestion_profileAbout">
                  136k views · 1 day ago
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Video;
