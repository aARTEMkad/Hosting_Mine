import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,
         RouterProvider,
} from 'react-router-dom';


// Pages
//import App from './App';
import ErrorPage from './Pages/Error-page/error-page';
import ListServers from './Pages/List-server/list-server-page';
import CreateServerPage from './Pages/Create-server-page/create-server-page';
import MainServerPage from './Pages/main-server/main-server-page';
import LogsServerPage from './Pages/main-server/logs/logs-server-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListServers/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/create-server",
    element: <CreateServerPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/main-server",
    element: <MainServerPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/server-setting",
    element: <LogsServerPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/server-logs",
    element: <LogsServerPage/>,
    errorElement: <ErrorPage/>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
