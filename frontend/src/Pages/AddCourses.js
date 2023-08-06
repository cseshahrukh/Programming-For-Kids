import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import './AddCourses.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AddCourse() {
  const [weeks, setWeeks] = useState([
    // Initialize with an empty week
    {
      lessons: [
        {
          readingMaterials: "",
          mcqs: [{ question: "", choices: ["", "", "", ""], correctAnswer: 0 }],
          programmingProblems: [""],
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal
  const [selectedWeek, setSelectedWeek] = useState(null); // State to keep track of the selected week index
  const [selectedLesson, setSelectedLesson] = useState(null); // State to keep track of the selected lesson index

  const handleAddWeek = () => {
    // Add a new empty week to the weeks state
    setWeeks([
      ...weeks,
      {
        lessons: [
          {
            readingMaterials: "",
            mcqs: [{ question: "", choices: ["", "", "", ""], correctAnswer: 0 }],
            programmingProblems: [""],
          },
        ],
      },
    ]);
  };

  const handleWeekChange = (weekIndex, lessonIndex, field, value) => {
    // Update the corresponding field in the specified lesson of the specified week
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].lessons[lessonIndex][field] = value;
    setWeeks(updatedWeeks);
  };

  const handleLessonClick = (weekIndex, lessonIndex) => {
    setSelectedWeek(weekIndex);
    setSelectedLesson(lessonIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMCQChange = (event, mcqIndex) => {
    // Update the corresponding field in the specified MCQ of the specified lesson
    const { value } = event.target;
    const updatedWeeks = [...weeks];
    updatedWeeks[selectedWeek].lessons[selectedLesson].mcqs[mcqIndex].question = value;
    setWeeks(updatedWeeks);
  };

  const handleAddMCQ = () => {
    // Add a new empty MCQ to the specified lesson of the specified week
    const updatedWeeks = [...weeks];
    updatedWeeks[selectedWeek].lessons[selectedLesson].mcqs.push({ question: "", choices: ["", "", "", ""], correctAnswer: 0 });
    setWeeks(updatedWeeks);
  };

  const handleMCQChoiceChange = (event, mcqIndex, choiceIndex) => {
    const { value } = event.target;
    const updatedWeeks = [...weeks];
    updatedWeeks[selectedWeek].lessons[selectedLesson].mcqs[mcqIndex].choices[choiceIndex] = value;
    setWeeks(updatedWeeks);
  };

  const handleCorrectAnswerChange = (event, mcqIndex) => {
    const { value } = event.target;
    const updatedWeeks = [...weeks];
    updatedWeeks[selectedWeek].lessons[selectedLesson].mcqs[mcqIndex].correctAnswer = parseInt(value);
    setWeeks(updatedWeeks);
  };

  const handleProgrammingProblemChange = (event, problemIndex) => {
    // Update the corresponding Programming Problem in the specified lesson of the specified week
    const { value } = event.target;
    const updatedWeeks = [...weeks];
    updatedWeeks[selectedWeek].lessons[selectedLesson].programmingProblems[problemIndex] = value;
    setWeeks(updatedWeeks);
  };

  const handleAddProgrammingProblem = () => {
    // Add a new empty Programming Problem to the specified lesson of the specified week
    const updatedWeeks = [...weeks];
    updatedWeeks[selectedWeek].lessons[selectedLesson].programmingProblems.push("");
    setWeeks(updatedWeeks);
  };

  const handleAddLesson = (weekIndex) => {
    // Add a new empty Lesson to the specified week
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].lessons.push({
      readingMaterials: "",
      mcqs: [{ question: "", choices: ["", "", "", ""], correctAnswer: 0 }],
      programmingProblems: [""],
    });
    setWeeks(updatedWeeks);
  };

  const handleData = () => {
    console.log("DONE")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: '#ffffff' }}>Add Course Materials</h1>
        {/* Display the form fields for each week */}
        </header>
        <div className="body-container">
          <div className="week-tabs-container">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="week-tab-container">
                <div className="week-tab-label">
                  <div className="week-tab-button" onClick={() => handleLessonClick(weekIndex)}>
                    Week {weekIndex + 1}
                  </div>
                </div>
                <div className="week-tab-content">
                  {week.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="lesson-tab"
                      onClick={() => handleLessonClick(weekIndex, lessonIndex)} // Call the handleLessonClick function when a lesson is clicked
                    >
                      <label className="lesson-tab-label">
                        Lesson {lessonIndex + 1}
                      </label>
                      <div className="lesson-tab-content">
                        {/* Rest of the code for Reading Materials, MCQs, and Programming Problem Questions */}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddLesson(weekIndex)}
                    className="btn btn-secondary btn-lg btn-block mb-3"
                  >
                    <i className="bi bi-plus"></i> Add Another Lesson
                  </button>
                  <br />
                </div>
              </div>
            ))}
          </div>
          <div className="button-space" ></div>
          <button onClick={handleAddWeek} className="btn btn-primary btn-lg btn-block">
            <i className="bi bi-plus"></i> Add Another Week
          </button>
          <div className="button-space" ></div>
          <div className="button-space" ></div>
          <div className="done-button-space" ></div>
          <button onClick={handleData} className="btn btn-primary">
                DONE
          </button>

        {/* Modal for Lesson content */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Lesson Content"
          ariaHideApp={false} // Set to false to avoid a warning related to accessibility
        >
          {selectedWeek !== null && selectedLesson !== null && (
            <div className="modal-content">
              <h2>Week {selectedWeek + 1}, Lesson {selectedLesson + 1}</h2>
              <div className="reading-materials-section">
                <h3>Reading Materials</h3>
                <label>
                  <textarea
                    rows="10" /* Increase the number of rows for a bigger text area */
                    style={{ width: '800%' }} /* Span the entire width */
                    // rows="10" /* Increase the number of rows for a bigger text area */
                    // style={{ width: '100%' }} /* Span the entire width */
                    value={weeks[selectedWeek].lessons[selectedLesson].readingMaterials}
                    onChange={(e) => handleWeekChange(selectedWeek, selectedLesson, "readingMaterials", e.target.value)}
                  />
                </label>
              </div>
              <div className="mcq-section">
                <h3>MCQs</h3>
                {weeks[selectedWeek].lessons[selectedLesson].mcqs.map((mcq, mcqIndex) => (
                  <div key={mcqIndex} className="mcq-question-wrapper">
                    <label>
                      MCQ {mcqIndex + 1}:
                      <textarea
                        type="text"
                        value={mcq.question}
                        onChange={(e) => handleMCQChange(e, mcqIndex)}
                        style={{ width: '580%' }} /* Span the entire width */
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
                            style={{ width: '250%' }} /* Span the entire width */
                          />
                        </label>
                        <label>
                          Choice 2:
                          <input
                            type="text"
                            value={mcq.choices[1]}
                            onChange={(e) => handleMCQChoiceChange(e, mcqIndex, 1)}
                            style={{ width: '250%' }} /* Span the entire width */
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
                            style={{ width: '250%' }} /* Span the entire width */
                          />
                        </label>
                        <label>
                          Choice 4:
                          <input
                            type="text"
                            value={mcq.choices[3]}
                            onChange={(e) => handleMCQChoiceChange(e, mcqIndex, 3)}
                            style={{ width: '250%' }} /* Span the entire width */
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
                <button onClick={handleAddMCQ} className="btn btn-secondary">
                  Add Another MCQ
                </button>
              </div>
              <div className="programming-problem-section">
                <h3>Programming Problems</h3>
                {weeks[selectedWeek].lessons[selectedLesson].programmingProblems.map((problem, problemIndex) => (
                  <div key={problemIndex}>
                    <textarea
                      rows="5" /* Increase the number of rows for a bigger text area */
                      style={{ width: '100%' }} /* Span the entire width */
                      value={problem}
                      onChange={(e) => handleProgrammingProblemChange(e, problemIndex)}
                    />
                  </div>
                ))}
                <button onClick={handleAddProgrammingProblem} className="btn btn-secondary">
                  Add Another Programming Problem
                </button>
              </div>
              <button onClick={handleCloseModal} className="btn btn-primary">
                Close
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
