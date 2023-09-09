import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { useAuth } from './useAuth'; // Import the custom hook

import CodeEditor from "./Pages/CodeEditor";
import ProgrammingProb from './Pages/ProgrammingProblem';
import ReadingMat from "./Pages/readingMaterials";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import TeacherCourses from "./Pages/TeacherCourses";
import CourseDetails from "./Pages/CourseDetails";
import WeekDetails from "./Pages/WeekDetails";
import ProgrammingList from "./Pages/ProgrammingList";
import Mcq from "./Pages/MCQs"
import Programming from "./Pages/Program";
import SectionMaterials from "./Pages/SectionMaterials";
import LectureMcqs from "./Pages/LectureMcqs";
import LectureProblems from "./Pages/LectureProblems";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Discussion from "./Pages/Discussion";
import CoursesSearch from "./Pages/CoursesSearch";
import AddCourseMaterialsPage from "./Pages/AddCourseMaterialsPage";
import AddCourseLessonsPage from "./Pages/AddCourseLessonsPage";
import CourseInfoInput from "./Pages/CourseInfoInput";

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
    path: "/teacher/courses",
    element: <TeacherCourses />,
  },
  {
    path: "/courses/search/:searchQuery",
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
    
    path: `/addCourse/:course_id/week/:week_no`,
    element: <AddCourseMaterialsPage />,
  }, 
  {
    
    path: `/addCourse/:course_id/week/:week_no/lesson/:lesson_no/:which_page`,
    element: <AddCourseLessonsPage />,
  }, 
  {
    
    path: `/teacher/:teacher_id/addCourse`,
    element: <CourseInfoInput />,
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
  // {
  //   path: "/dashboard", 
  //   element: <Dashboard />, 
  // }, 
  {
    path: '/dashboard',
    element: <Dashboard />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
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
