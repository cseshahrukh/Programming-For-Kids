import React, { useState, useRef } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [submissionStatus, setSubmissionStatus] = useState("Pending");
  const [isStatusAccepted, setIsStatusAccepted] = useState(false); 
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

  const handleSubmit = async () => {
    const code = editorRef.current.editor.getValue();

    try {
      const response = await fetch('/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, selectedLanguage }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'Accepted') {
          setSubmissionStatus('Accepted');
          setIsStatusAccepted(true);
        } else {
          setSubmissionStatus('Error');
          window.alert(data.error);
          setIsStatusAccepted(false);
        }
      } else {
        console.error('Error sending code to backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
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
          />
        </div>
      </div>

      <div style={submitButtonContainerStyle} className="d-flex">
        <button onClick={handleSubmit} type="button" className="btn btn-dark btn-me">
          Submit
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
  justifyContent: "flex-start", // Align button to the right
  marginTop: "10px",
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

export default CodeEditor;