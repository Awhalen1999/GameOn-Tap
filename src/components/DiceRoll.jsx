import React, { useState } from 'react';
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';

function DiceRoller() {
  const [dice1, setDice1] = useState(1); // Initial value of the first dice
  const [dice2, setDice2] = useState(1); // Initial value of the second dice
  const [total, setTotal] = useState(2); // Initial value of the total

  const rollDice = () => {
    // Generate a random number between 1 and 6 for each dice
    const randomNumber1 = Math.floor(Math.random() * 6) + 1;
    const randomNumber2 = Math.floor(Math.random() * 6) + 1;

    // Update the state with the new values
    setDice1(randomNumber1);
    setDice2(randomNumber2);
    setTotal(randomNumber1 + randomNumber2);
  };

  return (
    <div>
      <div>
        <FaDiceOne size={50} style={{ marginRight: '10px' }} />
        <FaDiceTwo size={50} style={{ marginRight: '10px' }} />
        <FaDiceThree size={50} style={{ marginRight: '10px' }} />
        <FaDiceFour size={50} style={{ marginRight: '10px' }} />
        <FaDiceFive size={50} style={{ marginRight: '10px' }} />
        <FaDiceSix size={50} style={{ marginRight: '10px' }} />
      </div>
      <button onClick={rollDice}>Roll Dice</button>
      <div>
        <p>Dice 1: {dice1}</p>
        <p>Dice 2: {dice2}</p>
        <p>Total: {total}</p>
      </div>
    </div>
  );
}

export default DiceRoller;
