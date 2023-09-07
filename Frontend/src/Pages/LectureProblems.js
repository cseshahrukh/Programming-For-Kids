import React, { useState,useEffect } from 'react';
import './LectureProblems.css';
import { useParams, Link ,useNavigate} from "react-router-dom";
import './AddCourse.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./Navbar";
import Footer from "./Footer";


function LectureProblems() {
    const { course_id, week_no, lesson_no } = useParams(); // Extract course_id, week_no, and lesson_no
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
  
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
  

    const handleComplete = async () => {
      try {
        const response = await fetch(`/api/save_problems`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            course_id: course_id,
            week_no: week_no,
            lesson_id: lesson_no,
            problems: problems,
          }),
        });

        if (response.ok) {
          // Handle success, e.g., show a success message to the user
          navigate(`/addCourse/${course_id}/week/${week_no}/lesson/${lesson_no}/3`);
          console.log('Problems have been successfully saved');
        } else {
          console.error('Error saving problems');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };


     // Function to fetch existing problems from the backend
    const fetchProblems = async () => {
      try {
        const response = await fetch(`/api/load_problems?course_id=${course_id}&week_no=${week_no}&lesson_id=${lesson_no}`);
        if (response.ok) {
          const data = await response.json();
          setProblems(data.problems || []);
        } else {
          console.error('Error fetching problems');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    useEffect(() => {
      // Fetch existing problems when the component mounts
      fetchProblems();
    }, []);


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
