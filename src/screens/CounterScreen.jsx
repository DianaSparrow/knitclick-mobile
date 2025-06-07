import React, { useState, useEffect } from 'react';
import './CounterScreen.css';

const CounterScreen = () => {
  const [rowCount, setRowCount] = useState(0);
  const [targetRows, setTargetRows] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);

  const addRow = () => {
    setRowCount(prev => prev + 1);
    animateCounter();
    // Web vibration API (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const subtractRow = () => {
    if (rowCount > 0) {
      setRowCount(prev => prev - 1);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  const resetCounter = () => {
    setRowCount(0);
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const animateCounter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const progressPercent = Math.min(100, (rowCount / targetRows) * 100);

  return (
    <div className="container">
      {/* Title */}
      <h1 className="title">KnitClick</h1>
      <p className="tagline">One by one, knitting is fun!</p>

      {/* Add Row Button */}
      <button className="add-button" onClick={addRow}>
        + Add Row
      </button>

      {/* Circular Counter */}
      <div className={`counter ${isAnimating ? 'spinning' : ''}`}>
        <span className="count-text">{rowCount}</span>
      </div>

      {/* Secondary Buttons */}
      <div className="button-row">
        <button className="secondary-button" onClick={subtractRow}>
          - 1
        </button>
        <button className="secondary-button" onClick={resetCounter}>
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <p className="progress-text">Progress: {rowCount} / {targetRows} rows</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CounterScreen;