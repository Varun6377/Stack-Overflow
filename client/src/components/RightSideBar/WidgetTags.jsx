import React from "react";
import { useTheme } from "../../components/ThemeContext/ThemeContext";

const WidgetTags = () => {
  const tags = [
    "c",
    "css",
    "express",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "reactjs",
  ];
  const { theme } = useTheme();

  return (
    <div className="widget-tags">
      <h4 style={{ background: theme.backgroundColor, color: theme.textColor }}>
        Watched tags
      </h4>
      <div className="widget-tags-div">
        {tags.map((tag) => (
          <p
            key={tag}
            style={{
              background: theme.backgroundColor,
            }}
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
