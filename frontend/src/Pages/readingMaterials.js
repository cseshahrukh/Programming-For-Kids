import React, { useState } from 'react';
import './readingMaterials.css';

const sampleReadingMaterials = [
    `Section 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
    Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit
    Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit
    Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit
    Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit
    `,
    `Section 2: Suspendisse pretium velit et metus venenatis, et tempor elit sodales.`,
    `Section 3: Fusce tristique, ligula at facilisis venenatis, mi nulla pellentesque orci, ut consequat odio tellus ac arcu.`,
  ];
  
  const MCQPage = () => {
    return <div>MCQ Page</div>; // Replace this with the actual MCQ page component
  };
  
  const ReadingMat = () => {
    const [displayedSections, setDisplayedSections] = useState([sampleReadingMaterials[0]]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [showMCQButton, setShowMCQButton] = useState(false);
  
    const handleNext = () => {
      if (currentSectionIndex < sampleReadingMaterials.length - 1) {
        setDisplayedSections((prevSections) => [...prevSections, sampleReadingMaterials[currentSectionIndex + 1]]);
        if (currentSectionIndex === sampleReadingMaterials.length - 2)  {
          setShowMCQButton(true); // Show the "Go To MCQ" button when the last section is printed
        }
        setCurrentSectionIndex((prevIndex) => prevIndex + 1);
      } 
    };
  
    const handleSectionClick = (index) => {
      setCurrentSectionIndex(index);
      if (!displayedSections.includes(sampleReadingMaterials[index])) {
        setDisplayedSections((prevSections) => [...prevSections, sampleReadingMaterials[index]]);
      }
    };
  
    const handleGoToMCQ = () => {
      // Code to navigate to the MCQ page
      // You can use React Router or any other method for navigation
    };
  
    if (currentSectionIndex === sampleReadingMaterials.length) {
      return <MCQPage />; // Render the MCQ page when all sections are displayed
    }
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Reading Materials Page</h1>
        </header>
        <div className="reading-materials-container">
          <h2> Week 1: Introduction to React </h2>
          <div className="reading-materials">
            <div className="section-content">
              {displayedSections.map((section, index) => (
                <div key={index} className="section">
                  <p>{section}</p>
                </div>
              ))}
            </div>
            <div className="table-of-contents no-interaction">
              {sampleReadingMaterials.map((section, index) => (
                <div
                  key={index}
                  className={`section-title ${currentSectionIndex === index ? 'highlighted' : 'greyed-out'}`}
                  onClick={() => handleSectionClick(index)}
                >
                  {`Section ${index + 1}`}
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentSectionIndex < sampleReadingMaterials.length - 1 && !showMCQButton && (
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        )}
        {showMCQButton && (
          <button onClick={handleGoToMCQ} className="mcq-button">
            Go To MCQ
          </button>
        )}
      </div>
    );
  };
  
  export default ReadingMat;