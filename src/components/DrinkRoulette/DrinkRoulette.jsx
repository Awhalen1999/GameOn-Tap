import React from 'react';
import './DrinkRoulette.css';

class DrinkRoulette extends React.Component {
  state = {
    rotation: 0,
  };

  startRotation = () => {
    const totalDegrees = Math.floor(Math.random() * 3600) + 3600;
    this.setState({ rotation: totalDegrees });
    setTimeout(() => {
      const result = 13 - Math.ceil((totalDegrees % 360) / 30);
      alert(`The spin result is: ${result}`);
    }, 5000);
  };

  render() {
    return (
      <div>
        <div className='arrow'></div>
        <ul
          className='circle'
          style={{ transform: `rotate(${this.state.rotation}deg)` }}
        >
          <li>
            <div className='text'>1</div>
          </li>
          <li>
            <div className='text'>2</div>
          </li>
          <li>
            <div className='text'>3</div>
          </li>
          <li>
            <div className='text'>4</div>
          </li>
          <li>
            <div className='text'>5</div>
          </li>
          <li>
            <div className='text'>6</div>
          </li>
          <li>
            <div className='text'>7</div>
          </li>
          <li>
            <div className='text'>8</div>
          </li>
          <li>
            <div className='text'>9</div>
          </li>
          <li>
            <div className='text'>10</div>
          </li>
          <li>
            <div className='text'>11</div>
          </li>
          <li>
            <div className='text'>12</div>
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
