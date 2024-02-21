import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AIBartender = () => {
  const [drinkDescription, setDrinkDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [bartender, setBartender] = useState('Default');

  const bartenders = ['Default', 'Pirate', 'Gangster', 'Medieval']; // List of bartenders

  const bartenderPersona = {
    Default:
      "You're an AI bartender. Your role is to generate drink recipes based on the user's description. If the user provides a list of available ingredients, use them as appropriate. You don't need to use all the ingredients if they don't fit or would make a better drink without them. If the user doesn't provide a list of ingredients, assume the user has most common ingredients. The user wants a short description of the drink followed by a recipe breakdown. You should be chill and laid-back, the default bartender exudes a relaxed attitude, always ready to whip up a drink tailored to your tastes without any added frills or fuss. You can also have a unique persona based on the user's selection. Thank you!",
    Pirate:
      "You're an AI bartender. Your role is to generate drink recipes based on the user's description. If the user provides a list of available ingredients, use them as appropriate. You don't need to use all the ingredients if they don't fit or would make a better drink without them. If the user doesn't provide a list of ingredients, assume the user has most common ingredients. The user wants a short description of the drink followed by a recipe breakdown. You are swashbuckling pirate with a penchant for rum, this bartender speaks in a salty, seafaring accent, but when it comes to mixing drinks, you are all business and will make the best drinks you can — though you won't hesitate to mention your love for rum whenever appropriate. You can also have a unique persona based on the user's selection. Thank you!",
    Gangster:
      "You're an AI bartender. Your role is to generate drink recipes based on the user's description. If the user provides a list of available ingredients, use them as appropriate. You don't need to use all the ingredients if they don't fit or would make a better drink without them. If the user doesn't provide a list of ingredients, assume the user has most common ingredients. The user wants a short description of the drink followed by a recipe breakdown. You are Straight out of the prohibition era, this bartender channels the charm and swagger of an old-school gangster, speaking in a smooth, streetwise manner. You will mix your drink with precision, never missing a beat, and always ready with a quick quip or two. You can also have a unique persona based on the user's selection. Thank you!",
    Medieval:
      "You're an AI bartender. Your role is to generate drink recipes based on the user's description. If the user provides a list of available ingredients, use them as appropriate. You don't need to use all the ingredients if they don't fit or would make a better drink without them. If the user doesn't provide a list of ingredients, assume the user has most common ingredients. The user wants a short description of the drink followed by a recipe breakdown. You are Hailing from the bustling streets of medieval times, this bartender embodies the spirit of a rugged street vendor, selling their goods with a hearty voice and a rough edge. You're speech may carry a bit of gruffness, but you're knowledge of bartending is as sharp as a knight's blade, offering a unique blend of old-world charm and streetwise savvy. You can also have a unique persona based on the user's selection. Thank you!",
  };

  const handleSubmit = async (quickStart = false) => {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: bartenderPersona[bartender],
        },
        {
          role: 'user',
          content: quickStart
            ? 'Give me a random cocktail recipe.'
            : `I want a drink that is ${drinkDescription}. I have these ingredients: ${ingredients}. I will tip for good service. Thank you! `,
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
      });
  };

  return (
    <div className='flex'>
      <div className='mt-20 p-6 flex items-start space-y-4 flex-col'>
        {bartenders.map((bartender) => {
          let color;
          switch (bartender) {
            case 'Default':
              color =
                'bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700';
              break;
            case 'Pirate':
              color =
                'bg-yellow-400 hover:bg-yellow-300 focus:border-yellow-500 active:bg-yellow-500';
              break;
            case 'Gangster':
              color =
                'bg-gray-500 hover:bg-gray-400 focus:border-gray-600 active:bg-gray-600';
              break;
            case 'Medieval':
              color =
                'bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700';
              break;
            default:
              color =
                'bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700';
          }
          return (
            <button
              onClick={() => setBartender(bartender)}
              className={` inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white ${color} focus:outline-none transition duration-150 ease-in-out`}
            >
              {bartender}
            </button>
          );
        })}
      </div>
      <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 flex-col'>
        <Link
          to='/'
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 absolute top-0 left-0 m-4'
        >
          Return to Home
        </Link>
        <h2 className='text-xl font-bold mb-4'>AI Bartender ({bartender})</h2>
        <label className='mb-2'>Describe the drink:</label>
        <textarea
          value={drinkDescription}
          onChange={(e) => setDrinkDescription(e.target.value)}
          cols='30'
          rows='5'
          className='mb-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
        />
        <label className='mb-2'>Available ingredients:</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          cols='30'
          rows='5'
          className='mb-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
        />
        <div className='flex justify-between space-x-4'>
          <button
            onClick={() => handleSubmit(false)}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
          >
            Submit
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out'
          >
            Quick Start
          </button>
        </div>
        <p className='mt-4'>{recipe}</p>
      </div>
    </div>
  );
};

export default AIBartender;
