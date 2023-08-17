import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import "./App.css";
import Header from './components/Header.jsx';
import { connect } from 'react-redux';
import { authProps } from './shared/prop-types/reducerProps.js';

let isAuthenticated = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: isAuthenticated ? <Navigate replace to="/" /> : <Register />,
      },
      {
        path: "login",
        element: isAuthenticated ? <Navigate replace to="/" /> : <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],
  },
]
);

function App({ auth }) {
  isAuthenticated = auth.isLoggedIn;
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>

    </>
  );
}


App.propTypes = {
  auth: authProps.isRequired,
};
export default connect((state) => ({
  auth: state.auth,
}))(App);
