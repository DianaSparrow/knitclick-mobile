import React, { useState, useEffect } from 'react';
import './App.css';

const KnitClick = () => {
  const [count, setCount] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Load saved count on app start
  useEffect(() => {
    const savedCount = localStorage.getItem('knitClickCount');
    if (savedCount !== null) {
      setCount(parseInt(savedCount));
    }
  }, []);

  // Save count whenever it changes
  useEffect(() => {
    localStorage.setItem('knitClickCount', count.toString());
  }, [count]);

  const incrementCount = () => {
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Update count
    setCount(prevCount => prevCount + 1);

    // Spin animation - circle spins 360 degrees
    setRotation(prevRotation => prevRotation + 360);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const resetCount = () => {
    setCount(0);
    setRotation(0);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="title">KnitClick</h1>
      </header>

      {/* Counter Display */}
      <main className="counter-container">
        <div 
          className="counter-circle"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div 
            className="count-display"
            style={{ transform: `rotate(${-rotation}deg)` }}
          >
            {count}
          </div>
        </div>
        
        {/* Stationary white pin */}
        <div className="white-pin" />
      </main>

      {/* Control Buttons */}
      <div className="button-container">
        <button
          className="decrement-button"
          onClick={decrementCount}
          disabled={count === 0}
        >
          -
        </button>

        <button
          className="increment-button"
          onClick={incrementCount}
        >
          +
        </button>
      </div>

      {/* Reset Button */}
      <button className="reset-button" onClick={resetCount}>
        Reset Counter
      </button>
    </div>
  );
};

export default KnitClick;
