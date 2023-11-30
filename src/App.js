import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TopBanner from './Components/Home/TopBanner/TopBanner';
import Main from './Components/Layout/Main';
import Home from './Components/Home/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { useContext } from 'react';
import { SharedData } from './Components/SharedData/SharedContext';
import { Toaster } from "react-hot-toast";
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Forbidden from './Components/Forbidden/Forbidden';
import MyProfile from './Components/MyProfile/MyProfile';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage></ErrorPage>,
      element: <Main></Main>,
      children: [
        {
          path: "/", element: <Home></Home>
        },
        {
          path: "/login", element: <Login></Login>
        },
        {
          path: "/register", element: <Register></Register>
        },
        {
          path: "/profile",
          element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        }
      ]
    },
    {
      path: "*",
      errorElement: <ErrorPage></ErrorPage>,
      element: <PageNotFound></PageNotFound>
    },
    {
      path: "/forbidden",
      errorElement: <ErrorPage></ErrorPage>,
      element: <Forbidden></Forbidden>
    }
  ]);
  const { handleNavMiniWindow, navbarMiniWindow, coverPhotoOptionIcon, handleCoverPhotoOption } = useContext(SharedData);
  const handleNavMini = () => {
    if (navbarMiniWindow) {
      handleNavMiniWindow();
    }
  }
  return (
    <div className='autoMargin bg-custom' onClick={handleNavMini}>

      <RouterProvider router={routers}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
