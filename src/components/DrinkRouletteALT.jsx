import React, { useState } from 'react';
import { FaLongArrowAltDown } from 'react-icons/fa';

const RouletteWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const options = [
    { name: 'Wine Sip', color: 'bg-red-600' },
    { name: 'Beer', color: 'bg-yellow-500' },
    { name: "Spinner's Cocktail", color: 'bg-green-500' },
    { name: 'Straight Shot', color: 'bg-orange-500' },
    { name: 'Spinner Drinks', color: 'bg-blue-500' },
    { name: "Spinner's Choice", color: 'bg-indigo-500' },
    { name: 'Mixed Drink', color: 'bg-purple-500' },
    { name: 'Water Break', color: 'bg-teal-500' },
    { name: 'Mystery Shot', color: 'bg-red-600' },
    { name: 'Group Toast', color: 'bg-yellow-600' },
    { name: 'Mix It Up', color: 'bg-green-600' },
    { name: 'Spin Again', color: 'bg-blue-600' },
    { name: "Bartender's Special", color: 'bg-indigo-600' },
    { name: 'Sip Sync', color: 'bg-purple-600' },
    { name: 'Right Hand', color: 'bg-red-700' },
    { name: 'Middle', color: 'bg-yellow-700' },
    { name: 'Skip Your Turn', color: 'bg-green-700' },
    { name: 'Target', color: 'bg-blue-700' },
    { name: 'Take or Add, Generosity', color: 'bg-indigo-700' },
    { name: 'Generosity', color: 'bg-purple-700' },
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    // Generate a random result
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    // Simulate spinning animation for 3 seconds
    setTimeout(() => {
      if (selectedOption) {
        setResult(selectedOption);
      }
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <div className='relative w-96 h-96 mb-4'>
        <FaLongArrowAltDown
          className='absolute text-black'
          style={{
            fontSize: '30px',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <div
          className={`absolute inset-0 rounded-full overflow-hidden transition-transform ${
            spinning ? 'animate-spin' : ''
          }`}
          style={{
            transform: spinning ? 'rotate(3600deg)' : 'rotate(0deg)',
          }}
        >
          {options.map((option, index, arr) => {
            const startAngle = (index / arr.length) * 360;
            const endAngle = ((index + 1) / arr.length) * 360;
            const midAngle = (startAngle + endAngle) / 2;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const clipPath = `polygon(50% 50%, ${
              50 + 50 * Math.cos(startRad)
            }% ${50 + 50 * Math.sin(startRad)}%, ${
              50 + 50 * Math.cos(endRad)
            }% ${50 + 50 * Math.sin(endRad)}%)`;
            const justifyContent = midAngle > 180 ? 'flex-start' : 'flex-end';

            return (
              <div
                key={index}
                className={`absolute inset-0 flex items-center ${justifyContent} text-white ${option.color}`}
                style={{ clipPath, padding: '0 1em' }}
              >
                {option.name}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={spinWheel}
        className='px-6 py-3 text-white bg-blue-500 rounded-lg mb-4'
        disabled={spinning}
      >
        Spin the Wheel
      </button>
      {result && (
        <div className='text-center bg-white shadow-lg p-4'>
          Result: <span className={`${result.color}`}>{result.name}</span>
        </div>
      )}
    </div>
  );
};

export default RouletteWheel;
