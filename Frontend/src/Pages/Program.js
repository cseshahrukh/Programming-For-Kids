import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProgrammingProblem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import NavbarStudent from './NavbarStudent';
import CodeEditor from './CodeEditor';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

let solved = 0;
let btext = "Next Problem";
let reply = "";
let link = "";

const Programming = () => {
  const { username, course_id, week_no, lesson_no } = useParams();
  const [problemsList, setProblemsList] = useState([]);
  const [lastSkipped, setlastSkipped] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSolved, setCurrentSolved] = useState(0);
  const [problemsToSolve] = useState(2);
  const [nextLink, setNextLink] = useState("");
  const [status, setStatus] = useState(null);
  const { user } = useUserContext(); // Get user data from context
  const [buttonText, setButtonText] = useState('Next Problem');

  useEffect(() => {
    fetch(`/courses/problems/${course_id}/${week_no}/${lesson_no}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProblemsList(data.problems);
      })
      .catch(error => {
        console.error(error);
      });
  }, [course_id, week_no, lesson_no]);

  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

  if (Object.keys(problemsList).length === 0) {
    return <p>Loading...</p>;
  }

  const handleCodeEditorResponse = (status) => {
    if (status === 'Correct') {
      setCurrentSolved(currentSolved + 1);
      solved++;
      handleButtonText();
    }
  };

  const handleClick = () => {
    if (btext !== "Next Problem") {
      setStatus('Incorrect');
      solved = 0;
      btext = "Next Problem";
      reply = "";
      link = "";
    } else {
      setCurrentIndex(currentIndex + 1);
      setStatus('Incorrect');
    }

  };

  const handleButtonText = async () => {
    console.log(solved, "WHY");
    if (solved === problemsToSolve) {
      try {
        const response = await fetch(`/get-next/${course_id}/${week_no}/${lesson_no}`);
        const data = await response.json();
        reply = data.next;
        // setStatus("Incorrect");

        if (reply === "week") {
          setButtonText("Go To Next Week");
          btext = "Go To Next Week";
          const weekNumber = parseInt(week_no, 10);
          link = `/student/${username}/courses/${course_id}/week/${weekNumber + 1}/lesson/${lesson_no}/readingMaterials`;
        } else if (reply === "lesson") {
          setButtonText("Go To Next Lesson");
          btext = "Go To Next Lesson";
          const lessonNumber = parseInt(lesson_no, 10);
          link = `/student/${username}/courses/${course_id}/week/${week_no}/lesson/${lessonNumber + 1}/readingMaterials`;
        } else {
          setButtonText("Nicely Done. Get Your Certificate Here");
          btext = "Nicely Done. Get Your Certificate Here";
          link = `/student/${username}/courses/${course_id}/course-completed`
        }
      } catch (error) {
        console.error('Error fetching next Page:', error);
      }
      // console.log(btext, " ", link);
    } else {
      // Implement skip function
      // let toJump = lastSkipped;
      // lastSkipped = currentIndex;
      // setCurrentIndex(toJump);
    }
    setStatus("Correct");
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavbarStudent username={username}/>
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
            </div>
            <CodeEditor
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
