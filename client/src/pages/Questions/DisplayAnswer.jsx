import React, { useRef, useState } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../components/Avatar/Avatar";
import { deleteAnswer } from "../../actions/question";
import { useGesture } from "react-use-gesture";

const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
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
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          {ans.video && (
            <div className="question-video">
              <h3>Answer Related Video</h3>
              <video
                width="400"
                controls
                ref={videoRef}
                {...bind()}
                className="video"
              >
                <source src={ans.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {User?.result?._id === ans?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightgreen"
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
