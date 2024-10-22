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
import SettingServerPage from './Pages/main-server/setting/settings-server-page';
import FileManagerPage from './Pages/main-server/file-manager-server';
import TextEditorFile from './Pages/main-server/text-editor-file-page';

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
