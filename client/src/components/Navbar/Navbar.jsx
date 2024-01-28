import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import { setCurrentUser } from "../../actions/currentUser";

import { ReactComponent as Sun } from "../../assets/Sun.svg";
import { ReactComponent as Moon } from "../../assets/Moon.svg";

import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import { useTheme } from "../../components/ThemeContext/ThemeContext";
import bars from "../../assets/bars-solid.svg";
import close from "../../assets/close.png";
import "./Navbar.css";

const Navbar = ({ handleSlideIn, slideIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme, isDayTime } = useTheme();
  var User = useSelector((state) => state.currentUserReducer);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  const [isWideScreen, setIsWideScreen] = useState(() => {
    const storedValue = localStorage.getItem("isWideScreen");
    return storedValue ? JSON.parse(storedValue) : window.innerWidth <= 400;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth <= 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("isWideScreen", JSON.stringify(isWideScreen));
  }, [isWideScreen]);

  return (
    <nav
      className="main-nav"
      style={{ background: theme.backgroundColor, color: theme.textColor }}
    >
      <div className="navbar">
        <button
          className={`${
            !isDayTime ? "dark-mode-icon-bar-close" : "slide-in-icon"
          }`}
          onClick={handleSlideIn}
          style={{ color: "inherit" }}
        >
          {slideIn ? (
            <img src={close} alt="close" width="14" />
          ) : (
            <img src={bars} alt="bars" width="15" />
          )}
        </button>
        <div className="navbar-1">
          <Link
            to="/"
            className={`nav-logo ${!isDayTime ? "dark-mode-logo" : ""}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Link
            to="/"
            className="nav-item nav-btn res-nav"
            style={{
              color: theme.textColor,
            }}
          >
            About
          </Link>
          <Link
            to="/"
            className="nav-item nav-btn res-nav"
            style={{ color: theme.textColor }}
          >
            Products
          </Link>
          <Link
            to="/"
            className="nav-item nav-btn res-nav"
            style={{ color: theme.textColor }}
          >
            For Teams
          </Link>
          <form>
            <input
              type="text"
              placeholder="Search..."
              style={{
                background: theme.backgroundColor,
                color: theme.textColor,
              }}
            />
            <img src={search} alt="search" width="1" className="search-icon" />
          </form>
        </div>
        <div
          className={`${
            User != null && isWideScreen ? "navbar-2-smallScreen" : "navbar-2"
          }`}
        >
          {User === null ? (
            <Link
              to="/Auth"
              className="nav-item nav-links"
              style={{
                background: theme.backgroundColor,
                color: theme.textColor,
              }}
            >
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button
                className={`${isWideScreen ? "logout" : "nav-item nav-links"}`}
                onClick={handleLogout}
                style={{
                  background: theme.backgroundColor,
                  color: theme.textColor,
                }}
              >
                Log out
              </button>
            </>
          )}

          <div className="dark_mode">
            <input
              className="dark_mode_input"
              type="checkbox"
              id="darkmode-toggle"
              onClick={toggleTheme}
              checked={!isDayTime}
              style={{
                background: theme.backgroundColor,
                color: theme.textColor,
              }}
            />
            <label className="dark_mode_label" for="darkmode-toggle">
              <Sun />
              <Moon />
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
