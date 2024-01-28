import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { useTheme } from "./components/ThemeContext/ThemeContext";
import { leftBarSlide } from "./actions/leftBarSlide";

function App() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  var slide = useSelector((state) => state.leftBarSlideReducer);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);
  // console.log("slideIn", slideIn);

  useEffect(() => {
    setSlideIn(false);
  }, []);

  useEffect(() => {
    dispatch(leftBarSlide(slideIn));
  }, [slideIn, dispatch]);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <Router>
        <Navbar slideIn={slideIn} handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
