
import React, { useState, useEffect } from "react";
import "./videoUplod.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const VideoUplod = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoType: "",
    thumbnail: "",
    videoLink: "",
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const uplodImage = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Youtube_replica");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dhmueihph/${type}/upload`,
        data
      );
      const url = response.data.url;
      setLoader(false);

      let val = type === "image" ? "thumbnail" : "videoLink";  
      setInputField({
        ...inputField,
        [val]: url,
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleonChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      navigate('/');
    }
  }, []);

  const handlesubmitFunction = async () => {
    await axios.post("https://backend-2-sqf1.onrender.com/api/video", inputField, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        navigate('/'); // Redirect after success
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="VideoUplod">
      <div className="uplodbox">
        <div className="uploadvedio_title">
          <YouTubeIcon style={{ fontSize: "54px", color: "red" }} />
          &nbsp;Upload Video
        </div>

        <div className="formUplod">
          <input
            type="text"
            value={inputField.title}
            onChange={(e) => handleonChangeInput(e, "title")}
            placeholder="Title of the Video"
            className="Uplodforminput"
          />
          <input
            type="text"
            value={inputField.description}
            onChange={(e) => handleonChangeInput(e, "description")}
            placeholder="Description"
            className="Uplodforminput"
          />
          <input
            type="text"
            value={inputField.videoType}
            onChange={(e) => handleonChangeInput(e, "videoType")}
            placeholder="Category"
            className="Uplodforminput"
          />
          <div>
            Thumbnail{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uplodImage(e, "image")}
            />
          </div>
          <div>
            Video
            <input
              type="file"
              accept="video/mp4,video/webm,video/*"
              onChange={(e) => uplodImage(e, "video")}
            />
          </div>
        </div>

        {loader && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <div className="uplodbutton">
          <div className="uplod_buton_form" onClick={handlesubmitFunction}>Upload</div>
          <Link to={"/"} className="uplod_buton_form">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUplod;
