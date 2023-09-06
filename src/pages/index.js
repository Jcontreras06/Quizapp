import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "../components/Quiz";
import Results from "../components/Results";

export default function Home() {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topicAPIs = {
    Sports: "https://opentdb.com/api.php?amount=10&category=21&type=multiple",
    History: "https://opentdb.com/api.php?amount=10&category=23&type=multiple",
    Geography:
      "https://opentdb.com/api.php?amount=10&category=22&type=multiple",
    Animals: "https://opentdb.com/api.php?amount=10&category=27&type=multiple",
    Science: "https://opentdb.com/api.php?amount=10&category=17&type=multiple",
  };

  const fetchQuestions = async (apiUrl) => {
    try {
      const response = await axios.get(apiUrl);
      setQuestions(response.data.results);
      setQuestionIndex(0);
      setScore(0);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    fetchQuestions(topicAPIs[topic]);
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setScore(0);
    setQuestionIndex(0);
    setQuestions([]);
  };

  return (
    <div className="main-content">
      <div className="nav-bar">
        <h1>Quiz App</h1>
      </div>
      {selectedTopic === null ? (
        <>
          <h2>Select a Topic</h2>
          {Object.keys(topicAPIs).map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicSelect(topic)}
              className="black-text"
            >
              {topic}
            </button>
          ))}
        </>
      ) : questionIndex < questions.length ? (
        <Quiz
          question={questions[questionIndex]}
          setScore={setScore}
          setQuestionIndex={setQuestionIndex}
          questionIndex={questionIndex}
        />
      ) : (
        <Results score={score} resetQuiz={resetQuiz} />
      )}
    </div>
  );
}
