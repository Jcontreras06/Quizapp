import React from "react";

export default function Results({ score, resetQuiz }) {
  return (
    <div className="results-container">
      <h2>Your Score: {score}/100</h2>
      <button onClick={resetQuiz} className="black-text">
        Try Again
      </button>
    </div>
  );
}
