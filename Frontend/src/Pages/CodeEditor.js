import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";

const CodeEditor = ({ question, testCases }) => {
  const inputs = [];
  const outputs = [];
  testCases.forEach((testCase) => {
    inputs.push(testCase.Input);
    outputs.push(testCase.Output);
  });
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [submissionStatus, setSubmissionStatus] = useState("Pending");
  const [isStatusAccepted, setIsStatusAccepted] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(1);
  const [prevCode, setPrevCode] = useState("");
  const [stdinInput, setStdinInput] = useState("");
  const [hint, setHint] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const editorRef = useRef(null);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    resetSubmissionStatus();
  };

  const handleCodeChange = () => {
    if (isStatusAccepted) {
      resetSubmissionStatus();
      setIsStatusAccepted(false);
    }

  };

  const resetSubmissionStatus = () => {
    setSubmissionStatus("Pending");
  };

  const handleStdinInputChange = (event) => {
    setStdinInput(event.target.value);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleSubmit = async () => {
    const code = editorRef.current.editor.getValue();

    if (code === prevCode) {
      toast("Submitting same code again");
      // return;
    }

    try {
      const response = await fetch('/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, selectedLanguage, stdinInput }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'Accepted') {
          setSubmissionStatus('Successfully Run');
          toast(data.output);
          setSubmissionCount(1);
        } else if (data.status === 'Compilation Error') {
          setSubmissionStatus('Compilation Error');
          toast(data.error);
          const message = data.error
          setNotifications([...notifications, message]);
          setIsStatusAccepted(false);
        } else {
          toast("No Code Provided");
          setIsStatusAccepted(false);
        }
        setPrevCode(code);
      } else {
        console.error('Error sending code to backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
    }
  };

  const handleSubmitForGrading = async () => {
    const code = editorRef.current.editor.getValue();
    try {
      const response = await fetch('/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, selectedLanguage, inputs, outputs }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'Accepted') {
          setSubmissionStatus('Accepted');
          setIsStatusAccepted(true);
          setSubmissionCount(1);
        } else if (data.status === 'Rejected') {
          setSubmissionStatus('Wrong Answer');
          setIsStatusAccepted(false);
          setSubmissionCount(1);

        } else if (data.status === 'Compilation Error') {
          setSubmissionStatus('Compilation Error');
          toast(data.error);
          const message = data.error
          setNotifications([...notifications, message]);
          setIsStatusAccepted(false);
        } else {
          toast("No Code Provided");
          setIsStatusAccepted(false);
        }
        setPrevCode(code);
      } else {
        console.error('Error sending code to backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
    }
  }

  const handleHint = async () => {
    try {

      const cappedHintCount = Math.min(hintCount + 1, 3);
      const code = editorRef.current.editor.getValue();

      const response = await fetch('/hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hintCount: cappedHintCount, question, code }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setHintCount(cappedHintCount);

        // Fetch the hint
        const hintResponse = await fetch('/hint');
        if (hintResponse.ok) {
          const hintData = await hintResponse.json();
          setHint(hintData.hint);
          toast(hintData.hint);
          const message = hintData.hint
          setNotifications([...notifications, message]);
        } else {
          console.error('Error fetching hint:', hintResponse.statusText);
        }
      } else {
        console.error('Error sending hint count:', response.statusText);
      }
    } catch (error) {
      console.error('Error handling hint:', error);
    }
  };

  return (
    <div>
      <div style={editorHeaderStyle}>
        <div style={editorTitleStyle}>Editor:</div>
        <div style={languageSelectContainerStyle}>
          <label htmlFor="languageSelect">Select Language:</label>
          <select
            id="languageSelect"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="python">Python</option>
            <option value="c_cpp">C++</option>
            {/* <option value="java">Java</option> */}
            {/* Add more language options here */}
          </select>
        </div>

      </div>

      <div style={editorContainerStyle}>
        <div style={editorStyle}>
          <AceEditor
            ref={editorRef}
            mode={selectedLanguage}
            theme="monokai"
            width="300%"
            height="396px"
            fontSize={14}
            fontColor="#666"
            style={{ backgroundColor: "#555" }}
            onChange={handleCodeChange}
            question={question}
            testCases={testCases}
          />
        </div>
        <div style={stdinInputContainer}>
          <label htmlFor="stdinInput">Input for stdin:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <textarea
              id="stdinInput"
              value={stdinInput}
              onChange={handleStdinInputChange}
              rows={5}
              cols={40}
            />
          </div>
          <div>
            <div>
              <button
                onClick={toggleNotifications}
                type="button"
                className="btn btn-dark btn-me"
                style={{ width: '100%', marginLeft: '195%' }}
              >
                See Previous Hints
              </button>
              {isNotificationsOpen && (
                <div style={customWindowStyle}>
                  <h3>Previous Hints:</h3>
                  <ul>
                    {notifications.map((notification, index) => (
                      <li key={index}>{notification}</li>
                    ))}
                  </ul>
                  <button onClick={toggleNotifications} style={closeButtonStyle}>X</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={submitButtonContainer} className="d-flex">
        <button onClick={handleSubmit} type="button" className="btn btn-dark btn-me">
          Submit
        </button>
        <div style={hintButtonContainer}>
          <button onClick={handleHint} type="button" className="btn btn-info btn-me" style={hintButtonStyle}>
            Get Hint
          </button>
        </div>
        <button onClick={handleSubmitForGrading} type="button" className="btn btn-success btn-me">
          Submit for Grading
        </button>
      </div>
      {submissionStatus && (
        <div style={statusBoxStyle}>
          <span>Status: </span>
          <span style={{ color: submissionStatus === "Accepted" ? "green" : submissionStatus === "Pending" ? "blue" : "red" }}>
            {submissionStatus}
          </span>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

const statusBoxStyle = {
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  color: "#333",
  marginBottom: "20px",
};


const submitButtonContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const editorContainerStyle = {
  display: "flex",
  justifyContent: "flex-right",
  marginTop: "2px",
  width: "32.6%",
  flexDirection: "column",
};

const editorHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

const languageSelectContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginRight: "18px",
};

const editorTitleStyle = {
  fontWeight: "bold",
};

const editorStyle = {
  flex: "1 1 auto",
};

const stdinInputContainer = {
  flex: "1 1 auto",
};

const hintButtonContainer = {
  marginLeft: "50%",
  marginTop: "-1px",
};

const hintButtonStyle = {
  marginLeft: "10px",
};

const customWindowStyle = {
  position: 'fixed',
  top: '20%',
  left: '20%',
  width: '60%',
  background: 'white',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0px 0px 5px 0px #ccc',
  zIndex: 9999,
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
};

export default CodeEditor;