import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProgrammingProblem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import CodeEditor from './CodeEditor';

let currentIndex = 1;

const Programming = () => {
  const { course_id, week_no, lesson_no } = useParams();
  const [problemsList, setProblemsList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/courses/problems/${course_id}/${week_no}/${lesson_no}`)
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

  const currentProgram = problemsList[currentIndex]; // You should adjust this according to your data structure

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
              {currentProgram.question}
            </p>
          </div>
          <div className="test-case-container">
            <h3>Test Cases</h3>
            <div className="test-cases">
              {currentProgram.examples.map((examples, index) => (
                <div className="test-case" key={index}>
                  <div className="test-input">
                    <p><strong>Input:</strong></p>
                    <pre>{JSON.stringify(examples.Input, null, 2)}</pre>
                  </div>
                  <div className="test-output">
                    <p><strong>Output:</strong></p>
                    <pre>{JSON.stringify(examples.Output, null, 2)}</pre>
                  </div>
                  <div className="test-explanation">
                    <p><strong>Explanation:</strong></p>
                    <p>{examples.Explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-pane">
          <div className="code-editor">
            <CodeEditor
              question={currentProgram.question}
              testCases={currentProgram.examples}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Programming;
