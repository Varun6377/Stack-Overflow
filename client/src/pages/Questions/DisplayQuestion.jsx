import React from "react";

import QuestionsDetails from "./QuestionsDetails";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";


const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <QuestionsDetails />
        <RightSideBar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
