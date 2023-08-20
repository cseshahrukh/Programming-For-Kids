import React, { useState, useEffect } from 'react';
import './MCQs.css';
import Navbar from "./Navbar";
import Footer from './Footer';

const Mcq = () => {
  const [mcqList, setMcqList] = useState([]);
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [buttonText, setButtonText] = useState('Next');
  const [buttonColor, setButtonColor] = useState('');
  const [resultText, setResultText] = useState('');
  const [optionsDisabled, setOptionsDisabled] = useState(false);


  useEffect(() => {
    // Fetch MCQs from backend based on course_id, week_no, and lesson_id
    fetch('/courses/mcqs/101/1/1')  // Replace with actual course_id, week_no, and lesson_id
      .then(response => {
        if (!response.ok) {
          setError(true); // Set error state if response status is not ok
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMcqList(data.mcqs);
        setError(false); // Clear error state if fetch is successful
      })
      .catch(error => {
        console.error(error);
        setError(true); // Set error state if any error occurs
      });
  }, []);

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div className="mcq-container">
          <h1>Error</h1>
          <p>An error occurred while fetching MCQ questions.</p>
          <Footer />
        </div>
      </div>
    );
  }

  const currentMCQ = mcqList[currentMCQIndex];

  const handleOptionChange = (option) => {
    if (!optionsDisabled) {
      setSelectedOption(option);
    }
    setButtonText('Check');
  };

  const handleButtonClick = () => {
    if (buttonText === 'Next') {
      if (selectedOption) {
        if (currentMCQIndex < mcqList.length - 1) { // Check against total number of MCQs
          setCurrentMCQIndex(currentMCQIndex + 1);
          setSelectedOption('');
          setResultText('');
          setButtonColor('');
          setOptionsDisabled(false);
        }
      }
    } else if (buttonText === 'Check') {
      setOptionsDisabled(true);
      if (selectedOption === currentMCQ.correct) {
        setResultText('Correct!');
        setButtonColor('green');
      } else {
        setResultText(`Correct answer: ${currentMCQ.correct}`);
        setButtonColor('red');
      }
      if (currentMCQIndex >= mcqList.length - 1) {
        setButtonText('Go To Problems');
      } else {
        setButtonText('Next');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="mcq-container">
        <h1>Multiple Choice Questions</h1>
        <div className="mcq-section">
          <div className="mcq-question">
            <p className="question-text">{currentMCQ?.question}</p>
          </div>
          <div className="mcq-options">
            <label className="option-label">
              <input
                type="radio"
                name="option"
                value="option_1"
                checked={selectedOption === 'option_1'}
                onChange={() => handleOptionChange('option_1')}
                disabled={optionsDisabled}
              />
              <span className="option-radio"></span>
              <span className="option-text">{currentMCQ?.option_1}</span>
            </label>
            <label className="option-label">
              <input
                type="radio"
                name="option"
                value="option_2"
                checked={selectedOption === 'option_2'}
                onChange={() => handleOptionChange('option_2')}
                disabled={optionsDisabled}
              />
              <span className="option-radio"></span>
              <span className="option-text">{currentMCQ?.option_2}</span>
            </label>
            <label className="option-label">
              <input
                type="radio"
                name="option"
                value="option_3"
                checked={selectedOption === 'option_3'}
                onChange={() => handleOptionChange('option_3')}
                disabled={optionsDisabled}
              />
              <span className="option-radio"></span>
              <span className="option-text">{currentMCQ?.option_3}</span>
            </label>
            <label className="option-label">
              <input
                type="radio"
                name="option"
                value="option_4"
                checked={selectedOption === 'option_4'}
                onChange={() => handleOptionChange('option_4')}
                disabled={optionsDisabled}
              />
              <span className="option-radio"></span>
              <span className="option-text">{currentMCQ?.option_4}</span>
            </label>
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
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Mcq;