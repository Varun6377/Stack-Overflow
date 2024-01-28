import React, { useRef, useState } from "react";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DisplayAnswer from "./DisplayAnswer";
import { useDispatch, useSelector } from "react-redux";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";
import moment from "moment";
import copy from "copy-to-clipboard";
import { useTheme } from "../../components/ThemeContext/ThemeContext";
import { useGesture } from "react-use-gesture";

export default function QuestionsDetails() {
  const { id } = useParams();
  const [Answer, setAnswer] = useState("");
  const [convertedVideoFile, setConvertedVideoFile] = useState(null);
  const fileInputRef = useRef(null);

  const { theme } = useTheme();

  const questionsList = useSelector((state) => state.questionsReducer);

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const location = useLocation();
  const url = "https://stack-overflow-varun.netlify.app";

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
            userId: User.result._id,
            video: convertedVideoFile,
          })
        );
        setAnswer("");
        fileInputRef.current.value = "";
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleUpVote = () => {
    if (User) {
      dispatch(voteQuestion(id, "upVote", User.result._id));
    } else {
      alert("Please log in to upvote.");
    }
  };

  const handleDownVote = () => {
    if (User) {
      dispatch(voteQuestion(id, "downVote", User.result._id));
    } else {
      alert("Please log in to downvote.");
    }
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, Navigate));
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
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let backwardSeekTimer;

  const bind = useGesture({
    onDrag: () => {},
    onDoubleClick: ({ event }) => {
      const video = videoRef.current;
      const seekForward = event.clientX > (2 * window.innerWidth) / 3;
      const seekBackward = event.clientX < window.innerWidth / 3;

      if (seekForward || seekBackward) {
        const seekAmount = seekForward ? 10 : -5;

        video.currentTime += seekAmount;
      } else {
        if (isPlaying) {
          video.pause();
        } else {
          video.play();
        }
        setIsPlaying(!isPlaying);
      }
    },
    onPointerDown: ({ event }) => {
      const video = videoRef.current;
      const seekForward = event.clientX > (2 * window.innerWidth) / 3;
      const seekBackward = event.clientX < window.innerWidth / 3;

      if (seekForward) {
        video.playbackRate = 2;
      } else if (seekBackward) {
        video.pause();

        backwardSeekTimer = setInterval(() => {
          video.currentTime = Math.max(0, video.currentTime - 1);
        }, 1000);
      }
    },

    onPointerUp: () => {
      const video = videoRef.current;
      const isVideoEnded = video.currentTime === video.duration;

      video.playbackRate = 1;

      clearInterval(backwardSeekTimer);

      if (!isVideoEnded) {
        video.play();
      }
    },
  });

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
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
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.video && (
                  <div className="question-video">
                    <h3>Question Related Video</h3>
                    <div className="video-container">
                      <video
                        width="400"
                        controls
                        ref={videoRef}
                        {...bind()}
                        className="video"
                      >
                        <source src={question.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                <DisplayAnswer
                  key={question._id}
                  question={question}
                  handleShare={handleShare}
                />

                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      style={{
                        background: theme.backgroundColor,
                        color: theme.textColor,
                      }}
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <label htmlFor="ask-ques-video">
                      <h4>Video (optional)</h4>
                      <p>
                        You can upload a video related to your answer; only
                        'mp4' files are supported
                      </p>
                      <input
                        type="file"
                        id="ask-ques-video"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </label>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link
                        to="/Tags"
                        key={tag}
                        className="ans-tags"
                        style={{
                          background: theme.backgroundColor,
                        }}
                      >
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
