import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';

import CodeEditor from "./Pages/CodeEditor";
import ProgrammingProb from './Pages/ProgrammingProblem';
import ReadingMat from "./Pages/readingMaterials";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import CourseDetails from "./Pages/CourseDetails";
import WeekDetails from "./Pages/WeekDetails";
import ProgrammingList from "./Pages/ProgrammingList";
import Mcq from "./Pages/MCQs"
import Programming from "./Pages/Program";
import SectionMaterials from "./Pages/SectionMaterials";
import LectureMcqs from "./Pages/LectureMcqs";
import LectureProblems from "./Pages/LectureProblems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: `/courses/:course_id`,
    element: <CourseDetails />,
  },
  {
    path: `/courses/:course_id/week/:week_no/lesson/:lesson_no/readingMaterials`,
    element: <ReadingMat />,
  },
  {
    
    path: `/courses/:course_id/week/:week_no/lesson/:lesson_no/mcqs`,
    element: <Mcq />,
  },
  {
    
    path: `/courses/:course_id/week/:week_no/lesson/:lesson_no/problems`,
    element: <Programming />,
  },
  {
    path: '/courses/:course_id/:week_no',
    element: <WeekDetails />,
  },
  {
    path: '/courses/:course_id/:week_no/:lesson_id/programming', 
    element: <ProgrammingList />,
  }, 
  {
    path: '/addCourse/:course_id/week/:week_no/lesson/:lesson_no/readingMaterials',
    element: <SectionMaterials />,
  },
  {
    path: '/addCourse/:course_id/week/:week_no/lesson/:lesson_no/mcqs',
    element: <LectureMcqs />,
  },
  {
    path: '/addCourse/:course_id/week/:week_no/lesson/:lesson_no/problems',
    element: <LectureProblems />,
  },
  {
    path: "/editor",
    element: <CodeEditor />,
  },
  {
    path: "/problems",
    element: <ProgrammingProb />,
  },
  {
    path: "/reading-materials",
    element: <ReadingMat />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
