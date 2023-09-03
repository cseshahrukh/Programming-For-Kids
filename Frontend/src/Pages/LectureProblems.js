import React, { useState } from 'react';
import './LectureProblems.css';
import { useParams, Link } from "react-router-dom";
import './AddCourse.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./Navbar";
import Footer from "./Footer";


function LectureProblems() {
    const [problems, setProblems] = useState([
      {
        problemDescription: '',
        testCases: [{ input: '', output: '', explanation: '' }],
      },
    ]);
  
    const handleProblemDescriptionChange = (problemIndex, e) => {
      const updatedProblems = [...problems];
      updatedProblems[problemIndex].problemDescription = e.target.value;
      setProblems(updatedProblems);
    };
  
    const handleAddTestCase = (problemIndex) => {
      const updatedProblems = [...problems];
      updatedProblems[problemIndex].testCases.push({ input: '', output: '', explanation: '' });
      setProblems(updatedProblems);
    };
  
    const handleTestCaseChange = (problemIndex, testCaseIndex, field, value) => {
      const updatedProblems = [...problems];
      updatedProblems[problemIndex].testCases[testCaseIndex][field] = value;
      setProblems(updatedProblems);
    };
  
    const handleAddNewProblem = () => {
      setProblems([...problems, { problemDescription: '', testCases: [{ input: '', output: '', explanation: '' }] }]);
    };
  
    const handleComplete = () => {
      // Handle form completion, e.g., sending data to the server
      // You can access all the problems and test cases in the 'problems' state here
    };
  
    return (
      <div className="problem-form">
        <h2>Programming Problem Form</h2>

        {problems.map((problem, problemIndex) => (
          <div key={problemIndex} className="problem-container">
            <h3>Upload the new problem</h3>
            <textarea
              value={problem.problemDescription}
              onChange={(e) => handleProblemDescriptionChange(problemIndex, e)}
              placeholder="Problem Description"
              className="problem-description"
            />
  
            <h3>Test Cases</h3>
            {problem.testCases.map((testCase, testCaseIndex) => (
              <div key={testCaseIndex} className="test-case">
                <input
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(problemIndex, testCaseIndex, 'input', e.target.value)}
                  placeholder="Sample Input"
                  className="test-input"
                />
                <input
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(problemIndex, testCaseIndex, 'output', e.target.value)}
                  placeholder="Sample Output"
                  className="test-output"
                />
                <textarea
                  value={testCase.explanation}
                  onChange={(e) => handleTestCaseChange(problemIndex, testCaseIndex, 'explanation', e.target.value)}
                  placeholder="Explanation"
                  className="test-explanation"
                />
              </div>
            ))}
            <button onClick={() => handleAddTestCase(problemIndex)} className="add-test-case">
              Add Test Case
            </button>
          </div>
        ))}
  
        <button onClick={handleAddNewProblem} className="add-new-problem">
          Add New Problem
        </button>
  
        <button onClick={handleComplete} className="complete">
          Complete
        </button>
  
        {/* Other form elements and buttons for submitting */}
      </div>
    );
 }

export default LectureProblems;
