import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import HomePage from './HomePage';
import Studenti from './Studenti';
import Predmeti from './Predmeti';
import Predmet from './Predmet';
import Login from './Login';
import Registracija from './Registracija';
import Student from './Student';

const router= createBrowserRouter(
[
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/studenti",
    children: [
      {
        index: true,
        element: <Studenti />
      },
      {
        path: "/studenti/:studentId",
        element: <Student />
      }
    ]

  },

  {
    path: "/predmeti",
    children: [
      {
        index: true,
        element: <Predmeti />

      },
      {
        path: "/predmeti/:predmetId",
        element: <Predmet/>
      }
    ]
    
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/prijava",
        element: <Login />
      },
      {
        path: "/auth/registracija",
        element: <Registracija />
      }
    ]
  }
]
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
