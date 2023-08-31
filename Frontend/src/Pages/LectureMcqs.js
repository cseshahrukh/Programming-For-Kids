import React, { useState } from "react";
import './AddCourse.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

function LectureMcqs() {
    const [mcqs, setMCQs] = useState([
    { question: "", choices: ["", "", "", ""], correctAnswer: 0 }
    ]);

    const handleMCQChange = (event, mcqIndex) => {
    const { value } = event.target;
    const updatedMCQs = [...mcqs];
    updatedMCQs[mcqIndex].question = value;
    setMCQs(updatedMCQs);
    };

    const handleMCQChoiceChange = (event, mcqIndex, choiceIndex) => {
    const { value } = event.target;
    const updatedMCQs = [...mcqs];
    updatedMCQs[mcqIndex].choices[choiceIndex] = value;
    setMCQs(updatedMCQs);
    };

    const handleCorrectAnswerChange = (event, mcqIndex) => {
    const { value } = event.target;
    const updatedMCQs = [...mcqs];
    updatedMCQs[mcqIndex].correctAnswer = parseInt(value);
    setMCQs(updatedMCQs);
    };

    const handleAddMCQ = () => {
    setMCQs([
        ...mcqs,
        { question: "", choices: ["", "", "", ""], correctAnswer: 0 }
    ]);
    };

    const handleComplete = () => {
    // Perform actions to complete adding MCQs
    console.log("MCQs have been added:", mcqs);
    };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="body-container">
        <div className="mcq-section">
            <h3>MCQs</h3>
            {mcqs.map((mcq, mcqIndex) => (
              <div key={mcqIndex} className="mcq-question-wrapper">
                <label>
                    MCQ {mcqIndex + 1}:
                    <textarea
                    type="text"
                    value={mcq.question}
                    onChange={(e) => handleMCQChange(e, mcqIndex)}
                    style={{ width: '250%' }} /* Span the entire width */
                    rows="3" /* Let the question occupy 2 rows */
                    />
                </label>
                <div className="mcq-choices">
                    {/* Display the first 2 choices in the first row */}
                    <div className="mcq-choice">
                    <label>
                        Choice 1:
                        <input
                        type="text"
                        value={mcq.choices[0]}
                        onChange={(e) => handleMCQChoiceChange(e, mcqIndex, 0)}
                        style={{ width: '150%' }} /* Span the entire width */
                        />
                    </label>
                    <label>
                        Choice 2:
                        <input
                        type="text"
                        value={mcq.choices[1]}
                        onChange={(e) => handleMCQChoiceChange(e, mcqIndex, 1)}
                        style={{ width: '150%' }} /* Span the entire width */
                        />
                    </label>
                    </div>
                    {/* Display the next 2 choices in the second row */}
                    <div className="mcq-choice">
                    <label>
                        Choice 3:
                        <input
                        type="text"
                        value={mcq.choices[2]}
                        onChange={(e) => handleMCQChoiceChange(e, mcqIndex, 2)}
                        style={{ width: '150%' }} /* Span the entire width */
                        />
                    </label>
                    <label>
                        Choice 4:
                        <input
                        type="text"
                        value={mcq.choices[3]}
                        onChange={(e) => handleMCQChoiceChange(e, mcqIndex, 3)}
                        style={{ width: '150%' }} /* Span the entire width */
                        />
                    </label>
                    </div>
                </div>
                {/* Correct Answer below the choices */}
                <label>
                    Correct Answer:
                    <input
                    type="number"
                    value={mcq.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(e, mcqIndex)}
                    />
                </label>
                </div>
            ))}
            <div className="mcq-buttons-container">
              <button className="btn btn-secondary" onClick={handleAddMCQ}>
                Add More MCQ
              </button>
              <button className="btn btn-primary" onClick={handleComplete}>
                Complete
              </button>
            </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default LectureMcqs;
