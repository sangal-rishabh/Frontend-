import React, { useState } from "react";
import "./signUp.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [uplodimageurl, setUplodImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&s"
  );

  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uplodimageurl,
  });

  const navigate = useNavigate();
  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const uplodImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Youtube_replica");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhmueihph/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setUplodImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://backend-2-sqf1.onrender.com/auth/signup",
        signUpField
      );
      console.log(response.data);
      toast.success("Sign up successful!");

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please check your inputs.");
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup_card">
          <div className="signup_title">
            <YouTubeIcon style={{ fontSize: "54px", color: "red" }} />
            &nbsp;SignUp
          </div>

          <div className="signup_input">
            <input
              type="text"
              className="signup_input_input"
              value={signUpField.channelName}
              onChange={(e) => handleInputField(e, "channelName")}
              placeholder="Channel name"
            />
            <input
              type="text"
              className="signup_input_input"
              value={signUpField.userName}
              onChange={(e) => handleInputField(e, "userName")}
              placeholder="User Name"
            />
            <input
              type="password"
              className="signup_input_input"
              value={signUpField.password}
              onChange={(e) => handleInputField(e, "password")}
              placeholder="Password"
            />
            <input
              type="text"
              className="signup_input_input"
              value={signUpField.about}
              onChange={(e) => handleInputField(e, "about")}
              placeholder="About the Channel"
            />

            <div className="image_uplod_signup">
              <input type="file" onChange={uplodImage} />
              <div className="image_sinup_image">
                <img
                  src={uplodimageurl}
                  alt="profile"
                  className="image_default_img"
                />
              </div>
            </div>

            <div className="signup_buttons">
              <div className="signupbtn" onClick={handleSignup}>
                SignUp
              </div>
              <Link to="/" className="signupbtn">
                Home Page
              </Link>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
