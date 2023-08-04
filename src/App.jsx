import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import "./App.css";
import Header from './components/Header.jsx';
import { useSelector } from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
)

function App() {

  const myState = useSelector((state) => state);
  console.log("my state", myState);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
