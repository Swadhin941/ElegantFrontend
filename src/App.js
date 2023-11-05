import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TopBanner from './Components/Home/TopBanner/TopBanner';
import Main from './Components/Layout/Main';
import Home from './Components/Home/Home/Home';

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {path:"/", element: <Home></Home>}
      ]
    }
  ])
  return (
    <div className='autoMargin shadow-lg'>
      <RouterProvider router={routers}>

      </RouterProvider>
    </div>
  );
}

export default App;
