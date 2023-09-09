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
import TeacherCourses from "./Pages/TeacherCourses";
import CourseDetails from "./Pages/CourseDetails";
import WeekDetails from "./Pages/WeekDetails";
import ProgrammingList from "./Pages/ProgrammingList";
import Mcq from "./Pages/MCQs"
import Programming from "./Pages/Program";
import SectionMaterials from "./Pages/SectionMaterials";
import LectureMcqs from "./Pages/LectureMcqs";
import LectureProblems from "./Pages/LectureProblems";
import CourseCompletion from "./Pages/CourseCompletion";

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
    path: "/student/:username/courses",
    element: <Courses />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
  },
  {
    path: "/teacher/courses",
    element: <TeacherCourses />,
  },
  {
    path: "/student/:username/courses/search/:searchQuery",
    element: <CoursesSearch />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
    
  }, 
  {
    path: `/student/:username/courses/:course_id`,
    element: <CourseDetails />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
  },
  {
    path: `/student/:username/courses/:course_id/week/:week_no/lesson/:lesson_no/readingMaterials`,
    element: <ReadingMat />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },

  },
  {
    
    path: `/student/:username/courses/:course_id/week/:week_no/lesson/:lesson_no/mcqs`,
    element: <Mcq />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
  },
  {
    
    path: `/student/:username/courses/:course_id/week/:week_no/lesson/:lesson_no/problems`,
    element: <Programming />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
  },

  {
    path: '/student/:username/courses/:course_id/:week_no',
    element: <WeekDetails />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
  },
  {
    path: '/student/:username/courses/:course_id/discussion', 
    element: <Discussion />,
    action: () => {
      return undefined; // No redirection here, check inside the Dashboard component
    },
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
    path: "/course-completed",
    element: <CourseCompletion />,
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
    path: '/student/:username/dashboard',
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
