import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useTheme } from "../../components/ThemeContext/ThemeContext";

export default function Questions({ question }) {
  const { theme } = useTheme();
  return (
    <div
      className="display-question-container"
      style={{
        background: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div className="display-votes-ans">
        <p>{question.upVote.length - question.downVote.length}</p>
        <p>votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>answers</p>
      </div>
      <div className="display-question-details">
        <Link to={`/Questions/${question._id}`} className="question-title-link">
          {question.questionTitle}
        </Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {question.questionTags.map((tag) => (
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
          <p className="display-time" style={{ color: theme.timeColor }}>
            asked {moment(question.askedOn).fromNow()} by {question.userPosted}
          </p>
        </div>
      </div>
    </div>
  );
}
