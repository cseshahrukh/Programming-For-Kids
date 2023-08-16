import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import AddCourse from './Pages/AddCourses';
import Compiler from './Pages/compiler';
import Mcq from './Pages/MCQs';
import ProgrammingProb from './Pages/ProgrammingProblem';
import ReadingMat from "./Pages/readingMaterials";
import Home from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addCourse",
    element: <AddCourse />,
  },
  {
    path: "/mcq",
    element: <Mcq />,
  },
  {
    path: "/compiler",
    element: <Compiler />,
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
