import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeContext/ThemeContext";

import "./Users.css";

const User = ({ user }) => {
  const { theme } = useTheme();

  return (
    <Link to={`/Users/${user._id}`} className="user-profile-link">
      <h3>{user.name.charAt(0).toUpperCase()}</h3>
      <h5 style={{ background: theme.backgroundColor, color: theme.textColor }}>
        {user.name}
      </h5>
    </Link>
  );
};

export default User;
