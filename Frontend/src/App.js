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
