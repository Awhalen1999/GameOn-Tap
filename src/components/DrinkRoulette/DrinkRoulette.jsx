import React from 'react';
import './DrinkRoulette.css';

class DrinkRoulette extends React.Component {
  state = {
    name: 'circle',
  };

  startRotation = () => {
    this.setState({ name: 'circle start-rotate' });
    setTimeout(() => this.setState({ name: 'circle' }), 2000);
  };

  render() {
    return (
      <div>
        <div className='arrow'></div>
        <ul className={this.state.name}>
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
