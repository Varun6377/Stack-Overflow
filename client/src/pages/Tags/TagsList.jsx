import React from "react";
import "./Tags.css";
import { useTheme } from "../../components/ThemeContext/ThemeContext";

const TagsList = ({ tag }) => {
  const { theme } = useTheme();

  return (
    <div className="tag">
      <h5
        style={{
          background: theme.backgroundColor,
        }}
      >
        {tag.tagName}
      </h5>
      <p
        style={{
          color: theme.textColor,
        }}
      >
        {tag.tagDesc}
      </p>
    </div>
  );
};

export default TagsList;
