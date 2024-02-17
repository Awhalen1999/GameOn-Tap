import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function TriviaGame() {
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(buildApiUrl());
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      }
    };

    if (gameStarted) {
      fetchQuestions();
    }
  }, [gameStarted]);

  const buildApiUrl = () => {
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;

    if (category) {
      apiUrl += `&category=${category}`;
    }

    if (difficulty) {
      apiUrl += `&difficulty=${difficulty}`;
    }

    if (type) {
      apiUrl += `&type=${type}`;
    }

    return apiUrl;
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game Over
      alert(`Game Over! Your score: ${score}/${questions.length}`);
      // Reset game
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameStarted(false);
    }
  };

  if (!gameStarted) {
    return (
      <div className='p-6 bg-gray-100 min-h-screen'>
        <Link
          to='/'
          className='mb-8 inline-block bg-blue-500 text-white px-4 py-2 rounded'
        >
          Return to Home
        </Link>
        <h1 className='text-2xl font-bold mb-4'>Trivia Game Setup</h1>
        <button
          onClick={handleStartGame}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Start Game
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <Link
        to='/'
        className='mb-8 inline-block bg-blue-500 text-white px-4 py-2 rounded'
      >
        Return to Home
      </Link>
      <h1 className='text-2xl font-bold mb-4'>Trivia Game</h1>
      <div className='space-y-4'>
        <p>
          Question {currentQuestionIndex + 1} of {amount}
        </p>
        <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <div className='space-y-2'>
          {currentQuestion.incorrect_answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              {answer}
            </button>
          ))}
          <button
            onClick={() => handleAnswer(currentQuestion.correct_answer)}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            {currentQuestion.correct_answer}
          </button>
        </div>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

export default TriviaGame;
