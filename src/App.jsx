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

    // Spin animation - full revolution per count
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
      {/* SVG filter for yarn-like fuzzy texture */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="yarn-texture">
            <feTurbulence type="turbulence" baseFrequency="0.05 0.08" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </defs>
      </svg>

      {/* Header */}
      <header className="header">
        <h1 className="title">KnitClick</h1>
      </header>

      {/* Counter Display */}
      <main className="counter-container">
        {/* Spinning circle with pins */}
        <div
          className="counter-circle"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Pin markers on the circle edge */}
          {[...Array(48)].map((_, i) => {
            // Offset so pin 0 (white marker) sits at the bottom (180°)
            const angle = (i * 360) / 48 + 180;
            // Pin 0 is white (marker pin), rest are shades of pink/purple
            const pinkPurpleShades = [
              '#ff6b9d', '#e84393', '#d63384', '#c44569',
              '#b83b8b', '#a855f7', '#9b59b6', '#8b5cf6',
              '#7c3aed', '#c084fc', '#e879a8', '#f472b6',
              '#db7093', '#d946ef', '#a78bfa', '#e293b3',
              '#ba68c8', '#ce7bb5', '#d4a0c7', '#b56eaa',
              '#e06b9f', '#c76dba', '#9f7aea', '#d471a8',
              '#b967d8', '#e48db5', '#a964c9', '#cc70a3',
              '#d584c6', '#b07cc8', '#e57baf', '#c165b0',
              '#a670d4', '#da6ba5', '#be78c4', '#cb6dab',
              '#9c6fd0', '#e680b8', '#b560ae', '#d077bd',
              '#a36ac8', '#dd73a8', '#c46db5', '#9975cc',
              '#e185b2', '#b86cb8', '#cd72b0', '#a06dc6'
            ];
            const color = i === 0 ? '#ffffff' : pinkPurpleShades[(i - 1) % pinkPurpleShades.length];

            return (
              <div
                key={i}
                className="pin"
                style={{
                  transform: `rotate(${angle}deg) translateY(-90px)`,
                  backgroundColor: color,
                  borderColor: color === '#ffffff' ? '#b08a93' : color
                }}
              />
            );
          })}
          <div
            className="count-display"
            style={{ transform: `rotate(${-rotation}deg)` }}
          >
            {count}
          </div>
        </div>
        {/* Crank handle - stationary, anchored to the side */}
        <div className="handle-arm">
          <div className="handle-knob" />
        </div>
      </main>

      {/* Control Buttons */}
      <div className="button-container">
        <button
          className="decrement-button"
          onClick={decrementCount}
          disabled={count === 0}
        >
          -
          <div className="yarn-tail-minus">
            <div className="yarn-tail-minus-strand" />
            <div className="yarn-tail-minus-connect" />
          </div>
        </button>

        <button
          className="increment-button"
          onClick={incrementCount}
        >
          +
          <div className="yarn-tail">
            <div className="yarn-tail-strand yarn-tail-connect" />
            <div className="yarn-tail-strand yarn-tail-h" />
            <div className="yarn-tail-strand yarn-tail-v" />
          </div>
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
