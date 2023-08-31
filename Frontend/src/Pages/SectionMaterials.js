import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import './AddCourse.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

function SectionMaterials() {
  const { course_id, week_no, lesson_no } = useParams(); // Extract course_id, week_no, and lesson_no
  const [sections, setSections] = useState([
    // Initialize with an empty section
    { title: "", details: "" },
  ]);
  const [completed, setCompleted] = useState(false);
   
  const handleAddSection = () => {
    // Add a new empty section to the sections state
    setSections([
      ...sections,
      { title: "", details: "" },
    ]);
  };

  const handleSectionChange = (index, field, value) => {
    // Update the corresponding field in the specified section
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleComplete = async () => {
    try {
      const response = await fetch(`/api/save_section_contents`, { // Use the URL parameter values
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_id: course_id,
          week_no: week_no,
          lesson_id: lesson_no,
          sections: sections
        }),
      });

      if (response.ok) {
        setCompleted(true);
      } else {
        console.error('Error saving section contents');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="body-container">
        <h1 style={{ color: '#000000' }}>Upload Course Materials</h1>
        <form>
          {sections.map((section, index) => (
            <div key={index} className="section-container" style={{ marginBottom: '50px' }}>
              <div className="section-title">
                <input
                  type="text"
                  placeholder="Section Title"
                  value={section.title}
                  onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="section-details">
                <textarea
                  rows="10" // Increased the number of rows for a taller textarea
                  placeholder="Section Details"
                  value={section.details}
                  onChange={(e) => handleSectionChange(index, "details", e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                />
              </div>
            </div>
          ))}
          <div className="buttons-container" style={{ marginTop: '20px' }} >
            <button type="button" className="btn btn-secondary" onClick={handleAddSection}>
              <i className="bi bi-plus"></i> Add Section
            </button>
            <button type="button" className="btn btn-primary" onClick={handleComplete}>
              Complete
            </button>
          </div>
        </form>
        {completed && (
          <div className="completed-message">
            <p>Section materials have been successfully added.</p>
          </div>
        )}
        <div  style={{ marginTop: '20px' }} >
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default SectionMaterials;
