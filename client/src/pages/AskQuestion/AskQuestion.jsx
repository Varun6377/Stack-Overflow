import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";
import { useTheme } from "../../components/ThemeContext/ThemeContext";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [convertedVideoFile, setConvertedVideoFile] = useState(null);

  const { theme } = useTheme();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody && questionTags) {
        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              questionTags,
              userPosted: User.result.name,
              userId: User?.result._id,
              video: convertedVideoFile,
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask a question");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const videoContentAsDataUrl = event.target.result;
        setConvertedVideoFile(videoContentAsDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="ask-question"
      style={{
        background: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div
            className="ask-form-container"
            style={{
              background: theme.backgroundColor,
              color: theme.textColor,
            }}
          >
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                style={{
                  background: theme.backgroundColor,
                  color: theme.textColor,
                }}
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                style={{
                  background: theme.backgroundColor,
                  color: theme.textColor,
                }}
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                style={{
                  background: theme.backgroundColor,
                  color: theme.textColor,
                }}
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
            <h4>Video (optional)</h4>
            <p>
              You can upload a video related to your question; only 'mp4' files
              are supported
            </p>
            <label htmlFor="ask-ques-video">
              <input
                type="file"
                id="ask-ques-video"
                onChange={handleFileChange}
              />
              {convertedVideoFile && (
                <video width="400" controls>
                  <source src={convertedVideoFile} />
                  Your browser does not support the video tag.
                </video>
              )}
            </label>
          </div>
          <input
            type="submit"
            value="Review your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
