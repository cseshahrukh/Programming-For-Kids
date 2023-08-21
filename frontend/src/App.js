import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import AddCourse from './Pages/AddCourses';
import CodeEditor from "./Pages/CodeEditor";
import Mcq from './Pages/MCQs';
import ProgrammingProb from './Pages/ProgrammingProblem';
import ReadingMat from "./Pages/readingMaterials";
import Home from "./Pages/Home";
import Form from "./Pages/AddCourseBegin";
import Courses from "./Pages/Courses";
import CourseDetails from "./Pages/CourseDetails";
import WeekDetails from "./Pages/WeekDetails";
import ProgrammingList from "./Pages/ProgrammingList";
import Discussion from "./Pages/Discussion";
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
    path: '/courses/:course_id/:week_no',
    element: <WeekDetails />,
  },
  {
    path: '/courses/:course_id/:week_no/:lesson_id/mcq', 
    element: <Mcq />,
  }, 

  {
    path: '/courses/:course_id/:week_no/:lesson_id/programming', 
    element: <ProgrammingList />,
  }, 
  {
    path: "/addCourse",
    element: <Form />,
  },
  {
    path: "/mcq",
    element: <Mcq />,
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
    path: '/courses/:course_id/discussion', 
    element: <Discussion />,
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
