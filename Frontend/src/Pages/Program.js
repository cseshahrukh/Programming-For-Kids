import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import './ProgrammingProblem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import CodeEditor from './CodeEditor';

const Programming = () => {

  const { course_id, week_no, lesson_no } = useParams();
  const [problemsList, setProblemsList] = useState([]);
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const currentProgram = problemsList[currentMCQIndex];
  const [error, setError] = useState(false);

  useEffect(() => {
    // fetch(`/courses/problems/${course_id}/${week_no}/${lesson_no}`)
    fetch(`/courses/problems/101/1/1`)
      .then(response => {
        if (!response.ok) {
          setError(true);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProblemsList(data.problems);
        setError(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }, [course_id, week_no, lesson_no]);

  if (Object.keys(problemsList).length === 0) {
    return <p>Loading...</p>;
  }

  console.log(problemsList)

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="problem-solver-container">
        <div className="left-pane">
          <div className="problem-description">
            <h2>Problem Description</h2>
            <p>
              Given an array of integers, find the maximum possible sum you can get by adding non-adjacent elements. Write a function that takes an array of integers as input and returns the maximum sum.
            </p>
          </div>
          <div className="test-case-container">
            <h3>Test Cases</h3>
            <div className="test-cases">
              <div className="test-case">
                <div className="test-input">
                  <p><strong>Input:</strong></p>
                  <pre>[2, 4, 6, 2, 5]</pre>
                </div>
                <div className="test-output">
                  <p><strong>Output:</strong></p>
                  <pre>13</pre>
                </div>
              </div>
              <div className="test-case">
                <div className="test-input">
                  <p><strong>Input:</strong></p>
                  <pre>[5, 1, 1, 5]</pre>
                </div>
                <div className="test-output">
                  <p><strong>Output:</strong></p>
                  <pre>10</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-pane">
          <div className="code-editor">
            <CodeEditor />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Programming;
