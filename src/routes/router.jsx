import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../pages/Home";
import ClassSchedule from "../pages/ClassSchedule";
import BudgetPlan from "../pages/BudgetPlan";
import Notes from "../pages/Notes";
import Calculator from "../pages/Calculator";
import Todo from "../pages/Todo";
import Reminder from "../pages/Reminder";
import Resources from "../pages/Resources";
import Register from "../Authentication/Register";
import SignIn from "../Authentication/SignIn";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      { index: true, element: <Home /> },
      { path: "class-schedule", element: <ClassSchedule /> },
      { path: "budget-plan", element: <BudgetPlan /> },
      { path: "notes", element: <Notes /> },
      { path: "calculator", element: <Calculator /> },
      { path: "todo", element: <Todo /> },
      { path: "reminder", element: <Reminder /> },
      { path: "resources", element: <Resources /> },
      { path:"register", element:<Register/>},
      {path:"signIn", element:<SignIn/>}
    ],
  },
]);

export default router;
