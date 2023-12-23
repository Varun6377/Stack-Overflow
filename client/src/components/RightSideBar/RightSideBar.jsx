import React from 'react'
import "./RightSideBar.css";
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";

export default function RightSideBar() {
  return (
    <aside className="right-sidebar">
      <Widget />
      <WidgetTags />
    </aside>
  )
}
