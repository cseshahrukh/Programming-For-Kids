import React, { useState, useEffect } from 'react';
import { useParams, Link,useNavigate } from "react-router-dom";
import './readingMaterials.css';
import Navbar from "./Navbar";
import NavbarStudent from "./NavbarStudent";
import Footer from './Footer';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

const ReadingMat = () => {
  const { username,course_id, week_no, lesson_no } = useParams();
  const [readingMaterials, setReadingMaterials] = useState([]);
  const [displayedSections, setDisplayedSections] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showMCQButton, setShowMCQButton] = useState(false);

  const navigate = useNavigate();
  const { user } = useUserContext(); // Get user data from context
  const isAuthenticated = useAuth(); // Use the custom hook

  // Use useEffect to handle the redirection
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page
      navigate(`/login`);    
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetch(`/courses/reading_materials/${course_id}/${week_no}/${lesson_no}`)
      .then(response => response.json())
      .then(data => {
        setReadingMaterials(data.reading_materials);
        setDisplayedSections([data.reading_materials[0]]);
      })
      .catch(error => console.error('Error fetching reading materials:', error));
  }, [course_id, week_no, lesson_no]);

  
  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

  if (readingMaterials.length === 0) {
    return <p>Loading...</p>;
  }

  const handleNext = () => {
    if (currentSectionIndex < readingMaterials.length - 1) {
      setDisplayedSections((prevSections) => [...prevSections, readingMaterials[currentSectionIndex + 1]]);
      if (currentSectionIndex === readingMaterials.length - 2) {
        setShowMCQButton(true);
      }
      setCurrentSectionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSectionClick = (index) => {
    setCurrentSectionIndex(index);
    if (!displayedSections.includes(readingMaterials[index])) {
      setDisplayedSections((prevSections) => [...prevSections, readingMaterials[index]]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavbarStudent username={username}/>
      </header>
      <div className="reading-materials-container">
        <div style={{ textAlign: 'center' }}>
          <h1> Week {week_no}: Introduction to React </h1>
        </div>
        <div className="reading-materials">
          <div className="section-content">
            {displayedSections.map((section, index) => (
              <div key={index} className="section">
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {readingMaterials[index].section_title}
                </p>
                <p>{section.section_content}</p>
              </div>
            ))}
          </div>
          <div className="table-of-contents no-interaction">
            {readingMaterials.map((section, index) => (
              <div
                key={index}
                className={`section-title ${currentSectionIndex === index ? 'highlighted' : 'greyed-out'}`}
                onClick={() => handleSectionClick(index)}
              >
                {section.section_title}
              </div>
            ))}
          </div>
        </div>
      </div>
      {currentSectionIndex < readingMaterials.length - 1 && !showMCQButton && (
        <button onClick={handleNext} className="next-button btn btn-dark">
          Next
        </button>
      )}
      {showMCQButton && (
        <Link to={`/student/${username}/courses/${course_id}/week/${week_no}/lesson/${lesson_no}/mcqs`}>
          <button className="mcq-button">
            Go To MCQ
          </button>
        </Link>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ReadingMat;
