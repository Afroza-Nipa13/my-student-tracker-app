import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../pages/Home";
import ClassSchedule from "../pages/ClassSchedule";
import BudgetPlan from "../pages/BudgetPlan";
import Notes from "../pages/Notes";
import Calculator from "../pages/Calculator";
import Reminder from "../pages/Reminder";
import Resources from "../pages/Resources";
import Register from "../Authentication/Register";
import SignIn from "../Authentication/SignIn";
import ExamQAgenerator from "../pages/ExamQAgenerator";
import StudyPlanner from "../pages/StudyPlanner";
import ProfilePage from "../shared/ProfilePage";
import Error from "../shared/Error";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />, 
    element: <MainLayOut></MainLayOut>,
    children: [
      { index: true, element: <Home /> },
      { path: "class-schedule", element: <ClassSchedule /> },
      { path: "budget-plan", element: <BudgetPlan /> },
      { path: "notes", element: <Notes /> },
      { path: "ExamQAgenerator", element:<ExamQAgenerator/>},
      { path: "calculator", element: <Calculator /> },
      { path: "studyPlanner", element: <StudyPlanner /> },
      { path: "reminder", element: <Reminder /> },
      { path: "resources", element: <Resources /> },
      { path:"register", element:<Register/>},
      {path:"signIn", element:<SignIn/>},
      {path:"profile", element:<ProfilePage/>}
    ],
  },
]);

export default router;
