import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getActiveRuleset, getRuleset } from '../../utils/api';
import RulesetDisplay from '../../components/RulesetDisplay';
import { useAuth } from '../../hooks/useAuth';
import { FaMinus, FaPlus } from 'react-icons/fa';

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
  const [activeRuleset, setActiveRuleset] = useState(null);
  const gameId = 'Trivia';
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchActiveRuleset = async () => {
        const activeRulesetResponse = await getActiveRuleset(
          user.user_id,
          gameId
        );
        if (activeRulesetResponse.ruleset_id) {
          const activeRuleset = await getRuleset(
            user.user_id,
            gameId,
            activeRulesetResponse.ruleset_id
          );
          setActiveRuleset(activeRuleset);
        }
      };
      fetchActiveRuleset();
    }
  }, [user, gameId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api_category.php'
        );
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error('Error fetching trivia categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(buildApiUrl());
          setQuestions(response.data.results);
        } catch (error) {
          console.error('Error fetching trivia questions:', error);
        }
      };
      setTimeout(fetchQuestions, 1000);
    }
  }, [gameStarted]);

  const buildApiUrl = () => {
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) apiUrl += `&category=${category}`;
    if (difficulty) apiUrl += `&difficulty=${difficulty}`;
    if (type) apiUrl += `&type=${type}`;
    return apiUrl;
  };

  const handleStartGame = (event) => {
    event.preventDefault();
    setGameStarted(true);
  };

  const handleTriviaAnswer = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];

    let newScore = score;
    if (answer === currentQuestion.correct_answer) {
      newScore += 1;
      setScore(newScore);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert(`Game Over! Your score: ${newScore}/${questions.length}`);
        resetGame();
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameStarted(false);
  };

  const handleAmountChange = (value) => {
    if (value > 50) {
      setAmount(50);
    } else {
      setAmount(value);
    }
  };

  if (!gameStarted) {
    return (
      <div>
        <div className='flex justify-end'>
          <button
            className='btn btn-ghost mr-4 font-bold mt-1'
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            Trivia Rules
          </button>
        </div>
        <dialog id='my_modal_1' className='modal'>
          <div className='modal-box'>
            <RulesetDisplay rules={activeRuleset?.rules} gameId='Trivia' />
          </div>
        </dialog>
        <div className='p-6 bg-base-100 h-full font-space'>
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-4 w-1/3'>
              <form onSubmit={handleStartGame}>
                {/* number of questions */}
                <div className='mb-4'>
                  <label className='block text-md font-medium text-base-content'>
                    Number of Questions:
                  </label>
                  <div className='bg-neutral rounded-lg border border-primary'>
                    <div className='w-full flex justify-between items-center gap-x-5'>
                      <input
                        className='input bg-neutral w-full'
                        type='number'
                        value={amount}
                        onChange={(e) =>
                          handleAmountChange(parseInt(e.target.value))
                        }
                      />
                      <div className='flex justify-end items-center gap-x-1.5 m-2'>
                        <button
                          type='button'
                          className='btn btn-sm btn-primary'
                          onClick={() =>
                            handleAmountChange(amount > 1 ? amount - 1 : 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <button
                          type='button'
                          className='btn btn-sm btn-primary'
                          onClick={() =>
                            handleAmountChange(amount < 50 ? amount + 1 : 50)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* type of questions */}
                <div className='mb-4'>
                  <label className='block text-md font-medium text-base-content'>
                    Select Type:
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className='select select-primary w-full bg-neutral text-neutral-content'
                  >
                    <option value=''>Any Type</option>
                    <option value='multiple'>Multiple Choice</option>
                    <option value='boolean'>True/False</option>
                  </select>
                </div>
                {/* category of questions */}
                <div className='mb-4'>
                  <label className='block text-md font-medium text-base-content'>
                    Select Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='select select-primary w-full bg-neutral text-neutral-content'
                  >
                    <option value=''>Any Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* difficulty of questions */}
                <div className='mb-4'>
                  <label className='block text-md font-medium text-base-content'>
                    Select Difficulty:
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className='select select-primary w-full bg-neutral text-neutral-content'
                  >
                    <option value=''>Any Difficulty</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                  </select>
                </div>
                <button
                  onClick={handleStartGame}
                  className='btn btn-primary w-full text-lg font-bold'
                >
                  Start Game
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className='bg-base-100 text-base-content h-full flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion) {
    return (
      <div className='p-6 bg-base-100 h-full font-space'>
        <div className='flex justify-end'>
          <button
            className='btn btn-ghost mr-4 font-bold'
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            Trivia Rules
          </button>
        </div>
        <dialog id='my_modal_1' className='modal'>
          <div className='modal-box'>
            <RulesetDisplay rules={activeRuleset?.rules} gameId='RideTheBus' />
          </div>
        </dialog>
        <div className='my-4 flex flex-col items-center justify-center'>
          <p className='font-bold text-lg text-base-content'>
            Question {currentQuestionIndex + 1} of {amount}
          </p>
          <div className='divider divider-primary'></div>
          <p
            className='text-lg font-medium text-base-content my-4'
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
          <div className='space-x-4 my-6'>
            {currentQuestion.incorrect_answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleTriviaAnswer(answer)}
                className={`px-4 py-2 rounded ${
                  selectedAnswer === answer &&
                  answer !== currentQuestion.correct_answer
                    ? 'bg-red-600'
                    : 'bg-primary hover:bg-accent'
                } text-white`}
              >
                {answer}
              </button>
            ))}
            <button
              onClick={() => handleTriviaAnswer(currentQuestion.correct_answer)}
              className={`px-4 py-2 rounded ${
                selectedAnswer ? 'bg-green-500' : 'bg-primary hover:bg-accent'
              } text-white`}
            >
              {currentQuestion.correct_answer}
            </button>
          </div>
          <p className='my-6 text-base-content text-lg font-medium'>
            Score: {score}
          </p>
        </div>
        <button
          onClick={resetGame}
          className='btn btn-success absolute bottom-0 right-0 m-4'
        >
          Reset Game
        </button>
      </div>
    );
  } else {
    return <div>No more questions</div>;
  }
}

export default TriviaGame;
