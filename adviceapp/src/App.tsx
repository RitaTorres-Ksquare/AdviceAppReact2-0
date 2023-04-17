import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  //mounting the components
  useEffect(() => {
    fetchAdvice();
  }, []);

  //we call API and change the advice and the backgroundColor
  const fetchAdvice = async () => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip.advice);
    setBackgroundColor(getRandomColor());
  };

  //call the function that calls the API
  const handleAnotherAdviceClick = () => {
    fetchAdvice();
  };

  //Function to help us to share on Twitter our advice
  const handleTwitterClick = () => {
    const tweetText = encodeURIComponent(advice);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`);
  };

  //function that helps us to change de color of the background
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="app" style={{ backgroundColor }}>
      <div className="advice-container">
        <p className="advice">{advice}</p>
        <div className="button">
          <button
            className="new-advice-button"
            onClick={handleAnotherAdviceClick}
          >
            Another One Please
          </button>
          <button className="twitter-icon" onClick={handleTwitterClick}>
            Share on Twitter
          </button>
        </div>
        <div className="instructions">
          <p>
            ---If you want to change the advice, click the button "Another One
            Please"---
          </p>
          <p>
            ---If you want to share the advice, click the button "Share with Twitter"---
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
