import React, { useState } from "react";
import PreLoader from "./components/PreLoader/PreLoader";
import App from "./App";

const Loading = () => {
  const [showMainContent, setShowMainContent] = useState(false);

  return (
    <div>
      {!showMainContent && (
        <PreLoader onFinish={() => setShowMainContent(true)} />
      )}
      {showMainContent && <App />}
    </div>
  );
};

export default Loading;
