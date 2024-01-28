import React from "react";
import "./LeftSideBar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import { useTheme } from "../../components/ThemeContext/ThemeContext";
import { useSelector } from "react-redux";
export default function LeftSideBar() {
  const { theme, isDayTime } = useTheme();
  var slide = useSelector((state) => state.leftBarSlideReducer);
  return (
    <div
      className={`${!slide ? "left-sidebar-in" : "left-sidebar-out"}`}
      style={{ background: theme.backgroundColor, color: theme.textColor }}
    >
      <nav className="side-nav">
        <NavLink
          to="/"
          className="side-nav-links"
          activeClassName="active"
          style={{
            background: theme.backgroundColor,
            color: theme.textColor,
          }}
        >
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to="/Questions"
            className="side-nav-links"
            activeClassName="active"
            style={{
              background: theme.backgroundColor,
              color: theme.textColor,
            }}
          >
            <img
              src={Globe}
              alt="Globe"
              className={`${!isDayTime ? "dark-mode-icon" : ""}`}
              style={{ color: "inherit", textDecoration: "none" }}
            />
            <p style={{ paddingLeft: "10px" }}> Questions </p>
          </NavLink>
          <NavLink
            to="/Tags"
            className="side-nav-links"
            activeClassName="active"
            style={{
              background: theme.backgroundColor,
              color: theme.textColor,
              paddingLeft: "40px",
            }}
          >
            <p>Tags</p>
          </NavLink>
          <NavLink
            to="/Users"
            className="side-nav-links"
            activeClassName="active"
            style={{
              background: theme.backgroundColor,
              color: theme.textColor,
              paddingLeft: "40px",
            }}
          >
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
