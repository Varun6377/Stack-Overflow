import React from "react";
import "./RightSideBar.css";
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";
import { useTheme } from "../ThemeContext/ThemeContext";

export default function RightSideBar() {
  const { theme } = useTheme();

  return (
    <aside
      className="right-sidebar"
      style={{ background: theme.backgroundColor, color: theme.textColor }}
    >
      <Widget />
      <WidgetTags />
    </aside>
  );
}
