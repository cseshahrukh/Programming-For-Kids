import React from 'react';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './MCQs.css';
import Navbar from "./Navbar";
import Footer from './Footer';

let currentNum = 1;

const mcqList = [
    //   {
    //     question: 'What is the capital of France?',
    //     options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    //     correctAnswer: 'Paris',
    //   }
];

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
    }, []);

    if (Object.keys(mcqList).length === 0) {
        return <p>Loading...</p>;
    }

    console.log(mcqList);

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
                <Navbar />
            </header>
            <div className="mcq-container">
                <h1>Multiple Choice Questions</h1>
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
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};


export default MyMCQ;