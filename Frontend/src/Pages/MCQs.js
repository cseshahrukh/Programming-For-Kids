import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import './MCQs.css';
import Navbar from "./Navbar";
import NavbarStudent from './NavbarStudent';
import Footer from './Footer';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

const MyMCQ = () => {
  const { username,course_id, week_no, lesson_no } = useParams();
  const [mcqList, setMcqList] = useState([]);
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const [currentWrongIndex, setCurrentWrongIndex] = useState(0);
  const [currentSolved, setCurrentSolved] = useState(0);
  const [maxMCQsToShow] = useState(2);
  const currentMCQ = mcqList[currentMCQIndex];
  const [selectedOption, setSelectedOption] = useState('');
  const [buttonText, setButtonText] = useState('Next');
  const [buttonColor, setButtonColor] = useState('');
  const [resultText, setResultText] = useState('');
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [traverseWrong, setTraverseWrong] = useState(false);
  const [wrongOnes, setWrongOnes] = useState([]);


  const navigate = useNavigate();
  const { user } = useUserContext(); // Get user data from context
  const isAuthenticated = useAuth(); // Use the custom hook

  // Use useEffect to handle the redirection
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page
      navigate(`/login`);    
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetch(`/courses/mcqs/${course_id}/${week_no}/${lesson_no}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMcqList(data.mcqs);
      })
      .catch(error => {
        console.error(error);
      });
  }, [course_id, week_no, lesson_no]);

  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

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
        if (currentSolved < maxMCQsToShow) {
          if (!traverseWrong) {
            if (currentMCQIndex === mcqList.length - 1) {
              setTraverseWrong(true);
              setCurrentWrongIndex(0);
              setCurrentMCQIndex(wrongOnes[currentWrongIndex]);
            }
            else if (currentMCQIndex < mcqList.length - 1) {
              setCurrentMCQIndex(currentMCQIndex + 1);
            }
          } else {
            if (currentWrongIndex === wrongOnes.length - 1) {
              setCurrentWrongIndex(0);
            } else {
              setCurrentWrongIndex(currentWrongIndex + 1);
            }
            setCurrentMCQIndex(wrongOnes[currentWrongIndex]);
          }
          setSelectedOption('');
          setResultText('');
          setButtonColor('');
          setOptionsDisabled(false);
        }
      }
    } else if (buttonText === 'Check') {
      setOptionsDisabled(true);
      const selectedOptionNumber = parseInt(selectedOption.split('_')[1]);
      if (selectedOptionNumber === currentMCQ.correct) {
        setResultText('Correct!');
        setButtonColor('green');
        setCurrentSolved(currentSolved + 1);
        if (wrongOnes.includes(currentMCQIndex)) {
          setWrongOnes(wrongOnes.filter((index) => index !== currentMCQIndex));
        }
      } else {
        const correctOptionText = mcqList[currentMCQIndex][`option_${currentMCQ.correct}`];
        setResultText(`Correct answer: ${correctOptionText}`);
        setButtonColor('red');
        if (!wrongOnes.includes(currentMCQIndex)) {
          setWrongOnes([...wrongOnes, currentMCQIndex]);
        }
      }
      if (currentSolved >= maxMCQsToShow - 1) {
        setButtonText('Go To Problems');
        setCurrentSolved(0);
      } else {
        setButtonText('Next');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavbarStudent username={username} />
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
                to={`/student/${username}/courses/${course_id}/week/${week_no}/lesson/${lesson_no}/problems`}
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
