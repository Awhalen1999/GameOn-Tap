// todo: remove post game alert
// todo: limit # of questions
// todo: add reset game button that returns to setup
// todo: add text to text.js file
// todo: add quick start button that starts game with default settings

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TriviaGame() {
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // handle user's answer
  const handleTriviaAnswer = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];

    let newScore = score;
    if (answer === currentQuestion.correct_answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Game Over
        alert(`Game Over! Your score: ${newScore}/${questions.length}`);
        // Reset game
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameStarted(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api_category.php');
      setCategories(response.data.trivia_categories);
    } catch (error) {
      console.error('Error fetching trivia categories:', error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(buildApiUrl());
        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      }
    };

    if (gameStarted) {
      fetchQuestions();
    }
  }, [gameStarted]);

  // Function to build API URL
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

  if (!gameStarted) {
    return (
      <div className='p-6 bg-gray-100 min-h-screen'>
        <h1 className='text-2xl font-bold mb-4'>Trivia Game Setup</h1>
        <div className='mb-4'>
          <label className='block mb-2'>
            Number of Questions:
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className='border-gray-400 border w-full p-2 rounded'
              min={1}
              max={50}
            />
          </label>
          <label className='block mb-2'>
            Select Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='border-gray-400 border w-full p-2 rounded'
            >
              <option value=''>Any Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className='block mb-2'>
            Select Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className='border-gray-400 border w-full p-2 rounded'
            >
              <option value=''>Any Difficulty</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </label>
          <label className='block mb-2'>
            Select Type:
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='border-gray-400 border w-full p-2 rounded'
            >
              <option value=''>Any Type</option>
              <option value='multiple'>Multiple Choice</option>
              <option value='boolean'>True/False</option>
            </select>
          </label>
        </div>
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
        className='mb-8 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
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
              onClick={() => handleTriviaAnswer(answer)}
              className={`px-4 py-2 rounded ${
                selectedAnswer === answer &&
                answer !== currentQuestion.correct_answer
                  ? 'bg-red-500'
                  : 'bg-blue-500'
              } text-white`}
            >
              {answer}
            </button>
          ))}
          <button
            onClick={() => handleTriviaAnswer(currentQuestion.correct_answer)}
            className={`px-4 py-2 rounded ${
              selectedAnswer ? 'bg-green-500' : 'bg-blue-500'
            } text-white`}
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
