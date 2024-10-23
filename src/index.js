import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,
         RouterProvider,
} from 'react-router-dom';


// Pages
//import App from './App';
import ErrorPage from './pages/error-page'
import ListServers from './pages/list-server-page';
import CreateServerPage from './pages/create-server-page';
import MainServerPage from './pages/main-server-page';
import LogsServerPage from './pages/logs-server-page';
import SettingServerPage from './pages/settings-server-page';
import FileManagerPage from './pages/file-manager-server';
import TextEditorFile from './pages/text-editor-file-page';

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
    element: <SettingServerPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/server-logs",
    element: <LogsServerPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/file-manager-server",
    element: <FileManagerPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/edit-file-value",
    element: <TextEditorFile/>,
    errorElement: <ErrorPage/>
  }
  
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode> // if in production need return
    <RouterProvider router={router} />
 // </React.StrictMode>
);
