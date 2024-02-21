import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AIBartender = () => {
  const [drinkDescription, setDrinkDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleSubmit = async () => {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are an AI Bartender. Your role is to generate cocktail recipes based on the user's description and available ingredients.",
        },
        {
          role: 'user',
          content: `I want a drink that is ${drinkDescription}. I have these ingredients: ${ingredients}.`,
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    };

    axios
      .post('https://api.openai.com/v1/chat/completions', data, { headers })
      .then((response) => {
        const message = response.data.choices[0].message.content;
        setRecipe(message);
      })
      .catch((error) => {
        console.error(error);
        setRecipe('An error occurred.');
      });
  };

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 flex-col'>
      <Link
        to='/'
        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 absolute top-0 left-0 m-4'
      >
        Return to Home
      </Link>
      <h2 className='text-xl font-bold mb-4'>AI Bartender</h2>
      <label className='mb-2'>Describe the drink:</label>
      <textarea
        value={drinkDescription}
        onChange={(e) => setDrinkDescription(e.target.value)}
        cols='30'
        rows='10'
        className='mb-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
      />
      <label className='mb-2'>Available ingredients:</label>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        cols='30'
        rows='10'
        className='mb-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
      />
      <button
        onClick={handleSubmit}
        className='mb-4 mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
      >
        Submit
      </button>
      <p>{recipe}</p>
    </div>
  );
};

export default AIBartender;
