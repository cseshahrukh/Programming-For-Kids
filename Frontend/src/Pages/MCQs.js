import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import './MCQs.css';
import Navbar from "./Navbar";
import Footer from './Footer';

let currentNum = 1;

const MyMCQ = () => {
  const { course_id, week_no, lesson_no } = useParams();
  const [mcqList, setMcqList] = useState([]);
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const currentMCQ = mcqList[currentMCQIndex];
  const [selectedOption, setSelectedOption] = useState('');
  const [buttonText, setButtonText] = useState('Next');
  const [buttonColor, setButtonColor] = useState('');
  const [resultText, setResultText] = useState('');
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [error, setError] = useState(false);

  const maxMCQsToShow = 2;

  useEffect(() => {
    fetch(`/courses/mcqs/${course_id}/${week_no}/${lesson_no}`)
      .then(response => {
        if (!response.ok) {
          setError(true);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMcqList(data.mcqs);
        setError(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }, [course_id, week_no, lesson_no]);

  if (Object.keys(mcqList).length === 0) {
    return <p>Loading...</p>;
  }

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
      const selectedOptionNumber = parseInt(selectedOption.split('_')[1]);
      console.log(selectedOptionNumber);
      console.log(currentMCQ.correct);
      if (selectedOptionNumber === currentMCQ.correct) {
        setResultText('Correct!');
        setButtonColor('green');
        currentNum += 1;
      } else {
        const correctOptionText = mcqList[currentMCQIndex][`option_${currentMCQ.correct}`];
        setResultText(`Correct answer: ${correctOptionText}`);
        setButtonColor('red');
      }
      if (currentNum > maxMCQsToShow) {
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
            <p className="question-text">{currentMCQ.question}</p>
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
            {buttonText === 'Go To Problems' ? (
              <Link
                to={`/courses/${course_id}/week/${week_no}/lesson/${lesson_no}/problems`}
                className={`mcq-button ${buttonColor}`}
              >
                {buttonText}
              </Link>
            ) : (
              <button
                className={`mcq-button ${buttonColor}`}
                onClick={handleButtonClick}
              >
                {buttonText}
              </button>
            )}
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

export default MyMCQ;
