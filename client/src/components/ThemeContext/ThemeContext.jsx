import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const lightTheme = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
};

const darkTheme = {
  backgroundColor: "#1a1a1a",
  textColor: "#ffffff",
};

export const ThemeProvider = ({ children }) => {
  const [isDayTime, setDayTime] = useState(true);
  const theme = isDayTime ? lightTheme : darkTheme;

  useEffect(() => {
    const currentTime = new Date().getHours();
    setDayTime(currentTime > 6 && currentTime < 18);
  }, []);

  const toggleTheme = () => {
    setDayTime((prevIsDayTime) => !prevIsDayTime);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDayTime, lightTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
