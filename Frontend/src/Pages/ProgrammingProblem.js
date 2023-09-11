import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProgrammingProblem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import NavbarStudent from './NavbarStudent';
import CodeEditor from './CodeEditor';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

const ProgrammingProb = () => {
  const [problem, setProblem] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    fetch(`/getProblem`)
      .then(response => response.json())
      .then(data => setProblem(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, []);

  const handleCodeEditorResponse = (status) => {
  };

  if (Object.keys(problem).length === 0) {
    return <p>Loading...</p>;
  }
  console.log(problem);
  return (
    <div className="App">
      <header className="App-header">
        <NavbarStudent username={username} />
      </header>
      <div className="problem-solver-container">
        <div className="left-pane">
          <div className="problem-description">
            <h2>Problem Description</h2>
            <p>
              {problem.question}
            </p>
          </div>
          <div className="test-case-container">
            <h3>Test Cases</h3>
            <div className="test-cases">
              {problem.examples.map((examples, index) => (
                <div className="test-case" key={index}>
                  <div className="test-input">
                    <p><strong>Input:</strong></p>
                    <pre>{JSON.stringify(examples.input, null, 2)}</pre>
                  </div>
                  <div className="test-output">
                    <p><strong>Output:</strong></p>
                    <pre>{JSON.stringify(examples.output, null, 2)}</pre>
                  </div>
                  <div className="test-explanation">
                    <p><strong>Explanation:</strong></p>
                    <p>{examples.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-pane">
          <div className="code-editor">
            {/* <div>
              <>
                {status === 'Correct' && (
                  <button onClick={handleClick}>
                    {btext === 'Next Problem' ? (
                      btext
                    ) : btext === 'Go To Next Week' ? (
                      <Link to={link}>{btext}</Link>
                    ) : btext === 'Go To Next Lesson' ? (
                      <Link to={link}>{btext}</Link>
                    ) : (
                      <Link to={link}>{btext}</Link>
                    )}
                  </button>
                )}
              </>
            </div> */}
            <CodeEditor
              question={problem.question}
              testCases={problem.examples}
              onCodeEditorResponse={handleCodeEditorResponse}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgrammingProb;
