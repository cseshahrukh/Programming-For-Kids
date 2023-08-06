import React from 'react';
import AddCourses from './Pages/AddCourses';
import Mcq from './Pages/MCQs';
import ProgrammingProb from './Pages/ProgrammingProblem';
import ReadingMaterial from './Pages/readingMaterials';
import './App.css';
import Compiler from './Pages/compiler';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        {/* <AddCourses /> */}
        {/* <ReadingMaterial /> */}
        <Mcq />
        {/* <ProgrammingProb /> */}
        {/* <Compiler /> */}
        
      </body>
    </div>
  );
}

export default App;
