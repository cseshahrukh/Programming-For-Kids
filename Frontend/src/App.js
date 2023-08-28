import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import AddCourse from './Pages/AddCourses';
import CodeEditor from "./Pages/CodeEditor";
import ProgrammingProb from './Pages/ProgrammingProblem';
import ReadingMat from "./Pages/readingMaterials";
import Home from "./Pages/Home";
import Form from "./Pages/AddCourseBegin";
import Courses from "./Pages/Courses";
import CourseDetails from "./Pages/CourseDetails";
import WeekDetails from "./Pages/WeekDetails";
import ProgrammingList from "./Pages/ProgrammingList";
import Mcq from "./Pages/MCQs"
import Programming from "./Pages/Program";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Discussion from "./Pages/Discussion";
import CoursesSearch from "./Pages/CoursesSearch";
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
    path: "/courses/search",
    element: <CoursesSearch />,
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
    path: '/courses/:course_id/discussion', 
    element: <Discussion />,
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
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login", 
    element: <Login />,
  },
  {
    path: "/dashboard", 
    element: <Dashboard />, 
  }, 
  {
    
    path: "/logout", 
    element: <Home />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
