import React, { useState, useEffect, useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './ProgrammingProblem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import CodeEditor from './CodeEditor';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

const problemsToSolve = 1;
let currentSolved = 0;

const Programming = () => {
  const { username, course_id, week_no, lesson_no } = useParams();
  const [problemsList, setProblemsList] = useState([]);
  const [lastSkipped, setlastSkipped] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextLink, setNextLink] = useState("");
  const [status, setStatus] = useState(null);
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

  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

  if (Object.keys(problemsList).length === 0) {
    return <p>Loading...</p>;
  }

  const clearAceEditor = () => {
    if (codeEditorRef.current) {
      codeEditorRef.current.clearAceEditor();
    }
  };

  const handleCodeEditorResponse = (status) => {
    setStatus(status);
    if (status === 'Correct') {
      currentSolved++;
      if (currentIndex < problemsList.length - 1 && currentSolved < problemsToSolve) {
        setCurrentIndex(currentIndex + 1);
      } else if (currentSolved == problemsToSolve) {
        //move to next Lesson or Week or Course Completed
        fetch(`/get-next/${course_id}/${week_no}/${lesson_no}`)
          .then(response => response.json())
          .then(data => setNextLink(data.next))
          .catch(error => console.error('Error fetching next Page:', error));
      } else {
        //Implement skip function
        // let toJump = lastSkipped;
        // lastSkipped = currentIndex;
        // setCurrentIndex(toJump);
      }
    }
  };

  // const handleButtonClick = () => {
  //   if (buttonText === 'Next') {
  //     if (currentSolved < maxMCQsToShow) {
  //       if (!traverseWrong) {
  //         if (currentMCQIndex === mcqList.length - 1) {
  //           setTraverseWrong(true);
  //           setCurrentMCQIndex(wrongOnes[0]);
  //         }
  //         else if (currentMCQIndex < mcqList.length - 1) {
  //           setCurrentMCQIndex(currentMCQIndex + 1);
  //         }
  //       } else {
  //         setCurrentWrongIndex((currentMCQIndex + 1) % wrongOnes.length);
  //         setCurrentMCQIndex(wrongOnes[currentWrongIndex]);
  //       }
  //       setSelectedOption('');
  //       setResultText('');
  //       setButtonColor('');
  //       setOptionsDisabled(false);
  //     }
  //   } else if (buttonText === 'Check') {
  //     setOptionsDisabled(true);
  //     const selectedOptionNumber = parseInt(selectedOption.split('_')[1]);
  //     if (selectedOptionNumber === currentMCQ.correct) {
  //       setResultText('Correct!');
  //       setButtonColor('green');
  //       currentSolved += 1;
  //       if (wrongOnes.includes(currentMCQIndex)) {
  //         setWrongOnes(wrongOnes.filter((index) => index !== currentMCQIndex));
  //       }
  //     } else {
  //       const correctOptionText = mcqList[currentMCQIndex][`option_${currentMCQ.correct}`];
  //       setResultText(`Correct answer: ${correctOptionText}`);
  //       setButtonColor('red');
  //       if (!wrongOnes.includes(currentMCQIndex)) {
  //         setWrongOnes([...wrongOnes, currentMCQIndex]);
  //       }
  //     }
  //     if (currentSolved === maxMCQsToShow) {
  //       setButtonText('Go To Problems');
  //       currentSolved = 0;
  //     } else {
  //       setButtonText('Next');
  //     }
  //   }
  //   console.log(wrongOnes);
  // };

  const currentProgram = problemsList[currentIndex];
  return (
    <div className="App">
      <header className="App-header">
        <Navbar username={username}/>
      </header>
      <div className="problem-solver-container">
        <div className="left-pane">
          <div className="problem-description">
            <h2>Problem Description</h2>
            <p>
              {problemsList[currentIndex].question}
            </p>
          </div>
          <div className="test-case-container">
            <h3>Test Cases</h3>
            <div className="test-cases">
              {problemsList[currentIndex].examples.map((examples, index) => (
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
            <div>
              {status === 'Correct' && currentIndex < problemsList.length - 1 && (
                <button onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                  clearAceEditor();
                }}>
                  Go To Next Problem
                </button>
              )}
            </div>
            <CodeEditor
              ref={codeEditorRef}
              question={problemsList[currentIndex].question}
              testCases={problemsList[currentIndex].examples}
              onCodeEditorResponse={handleCodeEditorResponse}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Programming;
