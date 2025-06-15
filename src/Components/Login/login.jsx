import React, { useState } from "react";
import "./login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setLoginModel }) => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });

  const handleonChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  const handleLoginFun = async () => {
    console.log("Sending login data:", loginField); // Debug log
    try {
      const response = await axios.post(
        "https://backend-3-858w.onrender.com/auth/login",
        loginField,
        { withCredentials: true }
      );
      console.log("Login Success:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userProfilePic", response.data.user.profilePic);
      window.location.reload();

      // Optionally close login modal or redirect after login
      // setLoginModel(false);
    } catch (err) {
      toast.error("Invalid Credential");
      console.log("Login Failed:", err);
    }
  };

  return (
    <>
      <div className="Login">
        <div className="Login_card">
          <div className="Title_card_login">
            <YouTubeIcon style={{ fontSize: "54px", color: "red" }} />
            &nbsp;Login
          </div>

          <div className="logincredintial">
            <div className="usernameLogin">
              <input
                type="text"
                className="usernameloginusername"
                value={loginField.userName}
                onChange={(e) => handleonChangeInput(e, "userName")}
                placeholder="UserName"
              />
            </div>

            <div className="usernameLogin">
              <input
                type="password"
                className="usernameloginusername"
                value={loginField.password}
                onChange={(e) => handleonChangeInput(e, "password")}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="login_button">
            <div className="login_btn" onClick={handleLoginFun}>
              Login
            </div>
            <Link
              to="/signup"
              className="login_btn"
              onClick={() => setLoginModel()}
            >
              Signup
            </Link>
            <div className="login_btn" onClick={() => setLoginModel()}>
              Cancel
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
