// LoginInformationWidget.js

import React from "react";

const LoginInformationWidget = ({
  theme,
  handleButtonClick,
  showDetails,
  currentUser,
}) => {
  return (
    <div
      className={`user-login-information ${showDetails ? "show-details" : ""}`}
    >
      <button
        onClick={handleButtonClick}
        style={{
          background: theme.backgroundColor,
          color: theme.textColor,
        }}
      >
        Login Information
      </button>
      {showDetails &&
        currentUser &&
        currentUser.result.loginInformation.map(
          (loginInfo, index, array) =>
            index === array.length - 1 && (
              <div
                key={loginInfo._id}
                className="user-login-information-details"
              >
                <p>Browser: {loginInfo.browser}</p>
                <p>
                  Operating System: {loginInfo.os[0].name}{" "}
                  {loginInfo.os[0].version}
                </p>
                <p>Device: {loginInfo.device}</p>
                <p>IP Address: {loginInfo.ip}</p>
              </div>
            )
        )}
    </div>
  );
};

export default LoginInformationWidget;
