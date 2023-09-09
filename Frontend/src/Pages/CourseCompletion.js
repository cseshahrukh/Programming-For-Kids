// CourseCompletion.js

import React from 'react';

const CourseCompletion = () => {
  const handleDownloadCertificate = () => {
    // Replace with the actual download logic
    alert('Downloading certificate...');
  };

  return (
    <div className="container">
      <h1>Congratulations!</h1>
      <p>You have successfully completed the course.</p>
      <p>Your achievements:</p>
      <ul>
        <li>Completed all lessons</li>
        <li>Scored 95% on the final exam</li>
        <li>Received a certificate of completion</li>
      </ul>
      <button onClick={handleDownloadCertificate}>Download Certificate</button>
    </div>
  );
};

export default CourseCompletion;
