// todo: update/add more bartender personas (slack saved msg)
// todo: update initial prompts
// todo: make text from bartender persona and initial prompts dynamic and use image to show the bartender persona

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AIBartender = () => {
  const [drinkDescription, setDrinkDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [bartender, setBartender] = useState('Default');

  const bartenders = ['Default', 'Pirate', 'Gangster', 'Medieval']; // List of bartenders

  const bartenderInitialPrompts = {
    Default: "Hello, I'm your AI bartender. How can I assist you today?",
    Pirate:
      "Ahoy matey! I'm your pirate AI bartender. What can I mix for ye today?",
    Gangster:
      "Hey there, I'm your gangster AI bartender. What can I get for ya?",
    Medieval:
      "Greetings, I'm your medieval AI bartender. What potion may I concoct for thee?",
  };

  const [initialPrompt, setInitialPrompt] = useState(
    bartenderInitialPrompts.Default
  );

  const basePrompt =
    "You're an AI bartender. Your role is to generate drink recipes based on the user's description. If the user provides a list of available ingredients, use them as appropriate. You don't need to use all the ingredients if they don't fit or would make a better drink without them. If the user doesn't provide a list of ingredients, assume the user has most common ingredients. The user wants a short description of the drink followed by a recipe breakdown.";

  const bartenderPersona = {
    Default: `${basePrompt} You should be chill and laid-back, the default bartender exudes a relaxed attitude, always ready to whip up a drink tailored to your tastes without any added frills or fuss. You can also have a unique persona based on the user's selection. Thank you!`,
    Pirate: `${basePrompt} You are a swashbuckling pirate with a penchant for rum, this bartender speaks in a salty, seafaring accent, but when it comes to mixing drinks, you are all business and will make the best drinks you can — though you won't hesitate to mention your love for rum whenever appropriate. You can also have a unique persona based on the user's selection. Thank you!`,
    Gangster: `${basePrompt} You are Straight out of the prohibition era, this bartender channels the charm and swagger of an old-school gangster, speaking in a smooth, streetwise manner. You will mix your drink with precision, never missing a beat, and always ready with a quick quip or two. You can also have a unique persona based on the user's selection. Thank you!`,
    Medieval: `${basePrompt} You are Hailing from the bustling streets of medieval times, this bartender embodies the spirit of a rugged street vendor, selling their goods with a hearty voice and a rough edge. You're speech may carry a bit of gruffness, but you're knowledge of bartending is as sharp as a knight's blade, offering a unique blend of old-world charm and streetwise savvy. You can also have a unique persona based on the user's selection. Thank you!`,
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
    <div className='flex bg-slate-600 h-screen w-screen'>
      {/* Buttons */}
      <div className=' p-6 flex items-start space-y-4 flex-col'>
        <Link
          to='/'
          className='inline-block px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded mb-40 no-underline'
        >
          Return to Home
        </Link>
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
              onClick={() => {
                setBartender(bartender);
                setInitialPrompt(bartenderInitialPrompts[bartender]);
              }}
              className={` inline-flex items-center px-4 py-2 font-medium rounded-md text-white ${color} `}
            >
              {bartender}
            </button>
          );
        })}
      </div>
      {/* Chat section */}
      <div className='p-6 w-3/4 mx-auto bg-white rounded-xl flex flex-col'>
        <h2 className='text-xl font-bold mb-4 text-center'>
          AI Bartender ({bartender})
        </h2>
        <p className='mb-4 mt-4 text-lg font-medium'>{initialPrompt}</p>
        <label className='mb-2 text-lg font-medium'>Describe the drink:</label>
        <textarea
          value={drinkDescription}
          onChange={(e) => setDrinkDescription(e.target.value)}
          cols='30'
          rows='2'
          className='p-2 mb-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
        />
        <label className='mb-2 text-lg font-medium'>
          Available ingredients:
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          cols='30'
          rows='2'
          className='p-2 mb-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
        />
        <div className='flex items-start'>
          <button
            onClick={() => handleSubmit(false)}
            className='inline-flex  px-4 py-2  text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 f'
          >
            Submit
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className='inline-flex px-4 py-2 text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500  ml-4'
          >
            Random / Quick Start
          </button>
        </div>
        <p className='mt-6 text-lg font-medium'>{recipe}</p>
      </div>
      {/* end of chat section */}
    </div>
  );
};

export default AIBartender;
