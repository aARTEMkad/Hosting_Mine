import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,
         RouterProvider,
 } from 'react-router-dom';


// Pages
import App from './App';
import ErrorPage from './Pages/Error-pages/error-page';
import ListServers from './Pages/List-servers/list-servers';
import CreateServer from './Pages/Create-servers/createServer';
import MainServerPage from './Pages/Main/main-server/mainServer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListServers/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/create-server",
    element: <CreateServer/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/main-server",
    element: <MainServerPage/>,
    errorElement: <ErrorPage/>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
