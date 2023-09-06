import React, { useState } from "react";

export default function Quiz({
  question,
  setScore,
  setQuestionIndex,
  questionIndex,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const allAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.correct_answer) {
      setScore((prevScore) => prevScore + 10);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setButtonDisabled(true);
  };

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setButtonDisabled(false);
  };

  return (
    <div className="quiz-container">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="answer-buttons">
        {allAnswers.map((answer, index) => (
          <button
            className={`answer-button answer-button-${index}`}
            key={index}
            disabled={buttonDisabled}
            onClick={() => checkAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      {isCorrect !== null && <p>{isCorrect ? "Correct" : "Incorrect"}</p>}
      {selectedAnswer && (
        <button onClick={nextQuestion} className="continue-button">
          Continue
        </button>
      )}
    </div>
  );
}
