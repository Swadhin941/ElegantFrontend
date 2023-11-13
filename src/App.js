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

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        { path: "/", element: <Home></Home> },
        {
          path: "/login", element: <Login></Login>
        },
        {
          path: "/register", element: <Register></Register>
        }
      ]
    }
  ]);
  const { handleNavMiniWindow, navbarMiniWindow } = useContext(SharedData);
  const handleNavMini = () => {
    if (navbarMiniWindow) {
      handleNavMiniWindow();
    }
  }
  return (
    <div className='autoMargin shadow-lg' onClick={handleNavMini}>
      <RouterProvider router={routers}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
