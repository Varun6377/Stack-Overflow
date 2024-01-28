import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainBar.css";
import QuestionList from "./QuestionList";
import { useTheme } from "../../components/ThemeContext/ThemeContext";

export default function HomeMainBar() {
  const location = useLocation();
  const user = 123;
  const navigate = useNavigate();
  const { theme } = useTheme();
  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if (user === null) {
      alert("Login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div
      className="main-bar"
      style={{ background: theme.backgroundColor, color: theme.textColor }}
    >
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button
          to="/AskQuestion"
          onClick={checkAuth}
          className="ask-btn"
          style={{
            background: theme.buttonColor,
            color: theme.buttonTextColor,
          }}
        >
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
}
