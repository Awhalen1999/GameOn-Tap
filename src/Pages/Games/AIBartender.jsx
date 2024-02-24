// todo: update/add more bartender personas (slack saved msg)
// todo: update initial prompts
// todo: make text from bartender persona and initial prompts dynamic and use image to show the bartender persona
// todo: initial prompt not changing with bartender persona

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
    <div className='flex bg-slate-500 h-screen w-screen p-6 pt-12 items-start justify-center gap-1 border'>
      {/* bartender section */}
      <div className='w-1/4 h-full flex flex-col items-start p-2.5 border'>
        <div className='w-full h-10 flex flex-row justify-start items-center border text-xl font-bold text-left text-white'>
          Choose a bartender
        </div>
        {/* Profiles */}
        <div className='w-full h-22 bg-accent rounded border flex p-4 my-1'>
          <div className='avatar flex-shrink-0'>
            <div className='w-24 rounded-full'>
              <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <div className='flex-grow flex flex-col justify-center items-start space-y-2 ml-4'>
            <h3 className='text-black'>Default</h3>
            <button
              onClick={() => setBartender('Default')}
              className='btn btn-primary'
            >
              Select
            </button>
          </div>
        </div>
        <div className='w-full h-22 bg-accent rounded border flex p-4 my-1'>
          <div className='avatar flex-shrink-0'>
            <div className='w-24 rounded-full'>
              <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <div className='flex-grow flex flex-col justify-center items-start space-y-2 ml-4'>
            <h3 className='text-black'>Pirate</h3>
            <button
              onClick={() => setBartender('Pirate')}
              className='btn btn-primary'
            >
              Select
            </button>
          </div>
        </div>
        <div className='w-full h-22 bg-accent rounded border flex p-4 my-1'>
          <div className='avatar flex-shrink-0'>
            <div className='w-24 rounded-full'>
              <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <div className='flex-grow flex flex-col justify-center items-start space-y-2 ml-4'>
            <h3 className='text-black'>Gangster</h3>
            <button
              onClick={() => setBartender('Gangster')}
              className='btn btn-primary'
            >
              Select
            </button>
          </div>
        </div>
        <div className='w-full h-22 bg-accent rounded border flex p-4 my-1'>
          <div className='avatar flex-shrink-0'>
            <div className='w-24 rounded-full'>
              <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <div className='flex-grow flex flex-col justify-center items-start space-y-2 ml-4'>
            <h3 className='text-black'>Medieval</h3>
            <button
              onClick={() => setBartender('Medieval')}
              className='btn btn-primary'
            >
              Select
            </button>
          </div>
        </div>
      </div>
      {/* Chat section */}
      <div className='w-3/4 h-full flex flex-col justify-start items-start p-2.5 border'>
        <h2 className='w-full h-10 flex flex-row justify-start items-center border text-xl font-bold text-left text-white'>
          AI Bartender ({bartender})
        </h2>
        <div className='w-full h-25 flex flex-col justify-start items-start border'>
          <div className='flex items-center'>
            <div className='avatar flex-shrink-0'>
              <div className='w-24 rounded-full'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
            </div>
            <div className='px-2 py-5 bg-base-100 rounded-xl ml-4'>
              <p className='mb-4 mt-4 text-lg font-medium'>{initialPrompt}</p>
            </div>
          </div>
        </div>
        <textarea
          value={drinkDescription}
          onChange={(e) => setDrinkDescription(e.target.value)}
          cols='30'
          rows='2'
          className='textarea textarea-primary w-1/2 mt-5'
          placeholder='Describe a drink:'
        />
        <textarea
          value={drinkDescription}
          onChange={(e) => setDrinkDescription(e.target.value)}
          cols='30'
          rows='2'
          className='textarea textarea-primary w-1/2 mt-5'
          placeholder='Available ingredients:'
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

        <div className='w-full h-25 flex flex-col justify-start items-start border mt-5'>
          <div className='flex items-center'>
            <div className='avatar flex-shrink-0'>
              <div className='w-24 rounded-full'>
                <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
              </div>
            </div>
            <div className='px-2 py-5 bg-base-100 rounded-xl ml-4'>
              <p className='mb-4 mt-4 text-lg font-medium'>{recipe}</p>
            </div>
          </div>
        </div>
      </div>
      {/* end of chat section */}
    </div>
  );
};

export default AIBartender;
