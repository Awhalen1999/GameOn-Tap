// todo: remove pop up alert and add a container below button for rule title and desc

import React from 'react';
import './DrinkRoulette.css';
import { TiArrowDownThick } from 'react-icons/ti';
import { DrinkRouletteRules } from './DrinkRouletteRules';

class DrinkRoulette extends React.Component {
  state = {
    rotation: 0,
  };

  itemNames = [
    'Straight Shot',
    'Choice',
    'Water Break',
    'Mystery',
    'Mix It Up',
    'Target',
    'Middle',
    'Bartender',
    'Take or Add',
    'Generosity',
    'Right Hand',
    'Spinner Drinks',
  ];

  startRotation = () => {
    const totalDegrees =
      this.state.rotation + Math.floor(Math.random() * 3600) + 3600;
    this.setState({ rotation: totalDegrees });
    setTimeout(() => {
      const result = 13 - Math.ceil((totalDegrees % 360) / 30);
      // Use the result as an index to access the corresponding item name
      alert(`The spin result is: ${this.itemNames[result - 1]}`);
    }, 3500); // Reduced spin time to 4 seconds
  };

  render() {
    return (
      <div>
        <div className='arrow'>
          <TiArrowDownThick size={38} />
        </div>
        <ul
          className='circle'
          style={{ transform: `rotate(${this.state.rotation}deg)` }}
        >
          <li className='item'>
            <div className='text'>Straight Shot</div>
          </li>
          <li className='item'>
            <div className='text'>Choice</div>
          </li>
          <li className='item'>
            <div className='text'>Water Break</div>
          </li>
          <li className='item'>
            <div className='text'>Mystery</div>
          </li>
          <li className='item'>
            <div className='text'>Mix It Up</div>
          </li>
          <li className='item'>
            <div className='text'>Target</div>
          </li>
          <li className='item'>
            <div className='text'>Middle</div>
          </li>
          <li className='item'>
            <div className='text'>Bartender</div>
          </li>
          <li className='item'>
            <div className='text'>Take or Add</div>
          </li>
          <li className='item'>
            <div className='text'>Generosity</div>
          </li>
          <li className='item'>
            <div className='text'>Right Hand</div>
          </li>
          <li className='item'>
            <div className='text'>Spinner Drinks</div>
          </li>
        </ul>
        <button className='spin-button' onClick={this.startRotation}>
          SPIN
        </button>
      </div>
    );
  }
}

export default DrinkRoulette;
