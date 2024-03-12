import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BartenderInfo from './BartenderInfo';

const AIBartender = () => {
  const [drinkDescription, setDrinkDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [bartender, setBartender] = useState('Default');
  const [isLoading, setIsLoading] = useState(false);

  const bartenders = Object.keys(BartenderInfo); // List of bartenders

  const [initialPrompt, setInitialPrompt] = useState(
    BartenderInfo[bartender].initialPrompt
  );

  useEffect(() => {
    setInitialPrompt(BartenderInfo[bartender].initialPrompt);
    setRecipe('');
  }, [bartender]);

  const handleSubmit = async (quickStart = false) => {
    setIsLoading(true);
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: BartenderInfo[bartender].persona,
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
        setIsLoading(false);
      });
  };

  return (
    <div className='font-space'>
      <div
        className='flex h-screen w-screen p-6 pt-12 items-start justify-center gap-1'
        style={{
          backgroundImage: `url(${BartenderInfo[bartender].background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* bartender section */}
        <div className='w-1/4 h-full flex flex-col items-start p-2.5 bg-black bg-opacity-85 rounded-lg border border-secondary border-1 mr-1'>
          <div className=' w-full h-10 flex flex-row justify-start items-center text-xl font-bold text-left text-white'>
            Choose a bartender
          </div>
          {/* Profiles */}
          <div className='w-full h-full overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin'>
            {bartenders.map((bartenderKey) => (
              <div
                key={bartenderKey}
                className='w-full h-22 bg-base rounded flex my-1'
              >
                <div className='avatar flex-shrink-0'>
                  <div className='m-2 w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    <img
                      src={BartenderInfo[bartenderKey].picture}
                      alt={bartenderKey}
                    />
                  </div>
                </div>
                <div className='flex-grow flex flex-col justify-center items-start space-y-2 ml-4'>
                  <h3 className='text-white'>{bartenderKey}</h3>
                  <button
                    onClick={() => setBartender(bartenderKey)}
                    className='btn btn-primary'
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chat section */}
        <div className='w-3/4 h-full flex flex-col justify-start items-start p-2.5 bg-black bg-opacity-75 rounded-lg border border-secondary border-1 ml-1 overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin'>
          <h2 className='w-full h-10 flex flex-row justify-start items-center text-xl font-bold text-left text-white'>
            AI Bartender ({bartender})
          </h2>
          <div className='w-full h-25 flex flex-col justify-start items-start mt-2'>
            <div className='flex items-center'>
              <div className='avatar flex-shrink-0'>
                <div className='m-2 w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src={BartenderInfo[bartender].picture} />
                </div>
              </div>
              <div className='chat chat-start'>
                <div className='chat-bubble chat-bubble-accent font-tech'>
                  {initialPrompt}
                </div>
              </div>
            </div>
          </div>
          <textarea
            value={drinkDescription}
            onChange={(e) => setDrinkDescription(e.target.value)}
            cols='30'
            rows='2'
            className='textarea textarea-primary w-1/2 mt-5'
            placeholder='Describe a drink (optional):'
          />
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            cols='30'
            rows='2'
            className='textarea textarea-primary w-1/2 mt-5'
            placeholder='Available ingredients (optional):'
          />
          <div className='flex items-start'>
            <button
              onClick={() => handleSubmit(false)}
              className='btn btn-primary mt-5 mr-2'
            >
              Make this drink
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className='btn btn-primary mt-5 ml-2'
            >
              Random drink / Quick Start
            </button>
          </div>
          {/* AI recipe returned: */}
          {isLoading || recipe ? (
            <div className='w-full h-25 flex flex-col justify-start items-start mt-5'>
              <div className='flex items-end'>
                <div className='avatar flex-shrink-0'>
                  <div className='m-2 w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    <img src={BartenderInfo[bartender].picture} />
                  </div>
                </div>
                <div className='chat chat-start'>
                  <div className='chat-bubble chat-bubble-accent font-tech flex items-center justify-center'>
                    {isLoading ? (
                      <span className='loading loading-dots loading-lg'></span>
                    ) : recipe ? (
                      recipe
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {/* end of chat section */}
      </div>
    </div>
  );
};

export default AIBartender;
