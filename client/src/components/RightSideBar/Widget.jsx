import React from "react";
import "./RightSideBar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";
import { useTheme } from "../../components/ThemeContext/ThemeContext";

const Widget = () => {
  const { theme, isDayTime } = useTheme();

  return (
    <div
      className="widget"
      style={{ background: theme.backgroundColor, color: theme.textColor }}
    >
      <h4 style={{ background: theme.backgroundColor, color: theme.textColor }}>
        The Overflow Blog
      </h4>
      <div
        className="right-sidebar-div-1"
        style={{ background: theme.backgroundColor, color: theme.textColor }}
      >
        <div className="right-sidebar-div-2">
          <img
            src={pen}
            alt="pen"
            width="18"
            className={`${!isDayTime ? "dark-mode-icon" : ""}`}
            style={{ color: "inherit", textDecoration: "none" }}
          />
          <p>
            Observability is key to the future of software (and your DevOps
            career)
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img
            src={pen}
            alt="pen"
            width="18"
            className={`${!isDayTime ? "dark-mode-icon" : ""}`}
            style={{ color: "inherit", textDecoration: "none" }}
          />
          <p>Podcast 374: How valuable is your screen name?</p>
        </div>
      </div>
      <h4 style={{ background: theme.backgroundColor, color: theme.textColor }}>
        Featured on Meta
      </h4>
      <div
        className="right-sidebar-div-1"
        style={{ background: theme.backgroundColor, color: theme.textColor }}
      >
        <div className="right-sidebar-div-2">
          <img
            src={comment}
            alt="pen"
            width="18"
            className={`${!isDayTime ? "dark-mode-icon" : ""}`}
            style={{ color: "inherit", textDecoration: "none" }}
          />
          <p>Review queue workflows - Final release....</p>
        </div>
        <div className="right-sidebar-div-2">
          <img
            src={comment}
            alt="pen"
            width="18"
            className={`${!isDayTime ? "dark-mode-icon" : ""}`}
            style={{ color: "inherit", textDecoration: "none" }}
          />
          <p>
            Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img
            src={blackLogo}
            alt="pen"
            width="18"
            className={`${!isDayTime ? "dark-mode-icon" : ""}`}
            style={{ color: "inherit", textDecoration: "none" }}
          />
          <p>
            Outdated Answers: accepted answer is now unpinned on Stack Overflow
          </p>
        </div>
      </div>
      <h4 style={{ background: theme.backgroundColor, color: theme.textColor }}>
        Hot Meta Posts
      </h4>
      <div
        className="right-sidebar-div-1"
        style={{ background: theme.backgroundColor, color: theme.textColor }}
      >
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>
            Why was this spam flag declined, yet the question marked as spam?
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>
            What is the best course of action when a user has high enough rep
            to...
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>Is a link to the "How to ask" help page a useful comment?</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
