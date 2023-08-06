import React from 'react';
import { useState, useEffect } from "react";
import './MCQs.css';

let currentNum = 1;

const mcqs = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    question: 'What is the capital of Germany?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    correctAnswer: 'Berlin',
  },
  {
    question: 'What is the capital of Italy?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    correctAnswer: 'Rome',
  },
  // Add more MCQ objects here
];

const Mcq = () => {
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const currentMCQ = mcqs[currentMCQIndex];
  const [selectedOption, setSelectedOption] = useState('');
  const [buttonText, setButtonText] = useState('Next');
  const [buttonColor, setButtonColor] = useState('');
  const [resultText, setResultText] = useState('');
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  const maxMCQsToShow = 2;

  const handleOptionChange = (option) => {
    if (!optionsDisabled) {
      setSelectedOption(option);
    }
    setButtonText('Check');
  };

  const handleButtonClick = () => {
    if (buttonText === 'Next') {
      if (selectedOption) {
        if (currentNum <= maxMCQsToShow) {
          setCurrentMCQIndex(currentMCQIndex + 1);
          setSelectedOption('');
          setResultText('');
          setButtonColor('');
          setOptionsDisabled(false);
        }
      }
    } else if (buttonText === 'Check') {
      setOptionsDisabled(true);
      if (selectedOption === currentMCQ.correctAnswer) {
        setResultText('Correct!');
        setButtonColor('green');
        currentNum += 1;
      } else {
        setResultText(`Correct answer: ${currentMCQ.correctAnswer}`);
        setButtonColor('red');
      }
      if (currentNum > maxMCQsToShow) {
        setButtonText('Go To Problems'); // Change button text when no more MCQs
      } else {
        setButtonText('Next');
      }
    }
  };

  return (
    <div className="App">
        <header className="App-header">
          <h1>Multiple Choice Questions</h1>
        </header>
        <div className="mcq-container">
          <div className="mcq-section">
            <div className="mcq-question">
              <p className="question-text">{currentMCQ.question}</p>
            </div>
            <div className="mcq-options">
              {currentMCQ.options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                    disabled={optionsDisabled}
                  />
                  <span className="option-radio"></span>
                  <span className="option-text">{option}</span>
                </label>
              ))}
            </div>
            <div className="mcq-button-container">
              <button
                className={`mcq-button ${buttonColor}`}
                onClick={handleButtonClick}
              >
                {buttonText}
              </button>
              {resultText && <p className="result-text">{resultText}</p>}
            </div>
          </div>
        </div>
    </div>
  );
};


export default Mcq;