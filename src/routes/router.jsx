import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayOut from '../LayOuts/MainLayOut';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
  },
]);

export default router;