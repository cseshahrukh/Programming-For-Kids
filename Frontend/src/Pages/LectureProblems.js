// import React, { useState } from "react";
// import './AddCourse.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function LectureProblems() {
//   const [weeks] = useState([
//     // Initialize with an empty week
//     {
//       lessons: [
//         {
//           programmingProblems: [""],
//         },
//       ],
//     },
//   ]);

//   const [selectedWeek, setSelectedWeek] = useState(null);
//   const [selectedLesson, setSelectedLesson] = useState(null);

//   const handleProgrammingProblemChange = (event, problemIndex) => {
//     // Update the corresponding Programming Problem in the specified lesson of the specified week
//     const { value } = event.target;
//     const updatedWeeks = [...weeks];
//     updatedWeeks[selectedWeek].lessons[selectedLesson].programmingProblems[problemIndex] = value;
//     // Here, you would typically send the updatedWeeks state to your backend or update it through your desired method.
//   };

//   const handleAddProgrammingProblem = () => {
//     // Add a new empty Programming Problem to the specified lesson of the specified week
//     const updatedWeeks = [...weeks];
//     updatedWeeks[selectedWeek].lessons[selectedLesson].programmingProblems.push("");
//     // Here, you would typically send the updatedWeeks state to your backend or update it through your desired method.
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Navbar />
//       </header>
//       <div className="body-container">
//         <div className="programming-problem-section">
//           <h3>Programming Problems</h3>
//           {weeks[selectedWeek]?.lessons[selectedLesson]?.programmingProblems.map((problem, problemIndex) => (
//             <div key={problemIndex}>
//               <textarea
//                 rows="5"
//                 style={{ width: '100%' }}
//                 value={problem}
//                 onChange={(e) => handleProgrammingProblemChange(e, problemIndex)}
//               />
//             </div>
//           ))}
//           <button onClick={handleAddProgrammingProblem} className="btn btn-secondary">
//             Add Another Programming Problem
//           </button>
//         </div>
//         <div>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LectureProblems;
