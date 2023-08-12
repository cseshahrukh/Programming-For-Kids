import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import './ProgrammingProblem.css';

const ProgrammingProb = () => {
  const [leftWidth, setLeftWidth] = useState('50%');

  const handleDrag = (size) => {
    setLeftWidth(size);
  };

  return (
    <div className="App">
        <header className="App-header">
          <h1>Programming Problem</h1>
        </header>
      <div className="problem-solver-container">
        <SplitPane split="vertical" defaultSize={leftWidth} onChange={handleDrag}>
          <div className="left-pane">
            <div className="problem-description">
              <h2>Problem Description</h2>
              <p>
                Given an array of integers, find the maximum possible sum you can get by adding non-adjacent elements. Write a function that takes an array of integers as input and returns the maximum sum.
              </p>
            </div>
            <div className="test-case-container">
              <h3>Test Cases</h3>
              <div className="test-case">
                <p><strong>Input:</strong></p>
                <pre>[2, 4, 6, 2, 5]</pre>
                <p><strong>Output:</strong></p>
                <pre>13</pre>
              </div>
              <div className="test-case">
                <p><strong>Input:</strong></p>
                <pre>[5, 1, 1, 5]</pre>
                <p><strong>Output:</strong></p>
                <pre>10</pre>
              </div>
            </div>
          </div>
          <div className="right-pane">
            <div className="code-editor">
              <h2>Code Editor</h2>
              <textarea className="code-input" placeholder="Write your code here..." />
            </div>
            <div className="output-container">
              <h2>Output</h2>
              <pre className="output">Compiled Output will appear here...</pre>
            </div>
          </div>
        </SplitPane>
      </div>
      </div>
  );
};

export default ProgrammingProb;