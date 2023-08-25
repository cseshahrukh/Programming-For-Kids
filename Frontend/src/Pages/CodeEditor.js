import React, { useState, useRef } from "react";
import AceEditor from "react-ace";

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

  const handleSubmit = async () => {
    const code = editorRef.current.editor.getValue();

    if (code === prevCode) {
      if (submissionCount < 2) {
        setSubmissionCount(submissionCount + 1);
      }
      // setSubmissionStatus("Error");
      // window.alert(`Code is the same as the previous submission. Submitted ${submissionCount + 1} times.`);
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
          setSubmissionStatus('Accepted');
          setIsStatusAccepted(true);
          window.alert(data.output);
          setSubmissionCount(1);
        } else if (data.status === 'Rejected') {

        } else {
          setSubmissionStatus('Error');
          window.alert(data.error);
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
  }

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
          <textarea
            id="stdinInput"
            value={stdinInput}
            onChange={handleStdinInputChange}
            rows={5}
            cols={40}
          />
        </div>
      </div>

      <div style={submitButtonContainer} className="d-flex">
        <button onClick={handleSubmit} type="button" className="btn btn-dark btn-me">
          Submit
        </button>
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

const submitButtonContainerStyle = {
  display: "flex",
  justifyContent: "space-between", // Spread buttons apart
  alignItems: "center", // Center buttons vertically
  marginTop: "10px",
};

const submitButtonContainer = {
  display: "flex",
  justifyContent: "space-between", // Align button to the right
  alignItems: "center",
  marginTop: "10px",
};

const gradingButtonStyle = {
  marginLeft: "10px", // Add more spacing between the buttons
};

const editorContainerStyle = {
  display: "flex",
  justifyContent: "flex-right", // Place editor on the right side
  marginTop: "2px", // Adjust as needed for spacing
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
  marginRight: "18px", // Add some spacing between the label and select
};

const editorTitleStyle = {
  fontWeight: "bold",
};

const editorStyle = {
  flex: "1 1 auto", // Allow to grow and shrink, take remaining space
};

const stdinInputContainer = {
  flex: "1 1 auto",
};

export default CodeEditor;