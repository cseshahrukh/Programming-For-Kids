import React from 'react';
import './ProgrammingProblem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import CodeEditor from './CodeEditor';

const ProgrammingProb = () => {

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

export default ProgrammingProb;
