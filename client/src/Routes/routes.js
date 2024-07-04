import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Active from "../components/Auth/Active/active";
import Forgot from "../components/Auth/Forgot";
import OtpForm from "../components/Auth/Forgot/OtpForm";
import Login from "../components/Auth/Login";
import Error from "../components/Error";
import Home from "../components/Home";
import SideBar from "../components/SideBar";
import ChangePassword from './../components/Auth/Forgot/ChangePassword';
import Trash from './../components/Trash/index';
import Reminders from "../components/Reminders";
import Archive from "../components/Archive";
import NoLoginAccess from './ProtectedRoutes/NoLoginAccess';
import LoginAcess from './ProtectedRoutes/LoginAcess';
import NotLoggedInRoutes from "./ProtectedRoutes/NoLoginAccess";
import LoggedInRoutes from "./ProtectedRoutes/LoginAcess";
import Profile from "../components/Profile";
import { useSelector } from "react-redux";
import ViewArea from "../components/Model/ViewArea";
import DrawingPad from "../components/DrawingPad";
import ViewContent from "../components/Model/ViewContent";



let menuWidth = "collapse";

export const RoutesContaner = createBrowserRouter(createRoutesFromElements(<Route
  errorElement={<Error />}
>


  <Route element={<LoginAcess />} >
    <Route
      path="/"
      element={<Home />}
    />
    <Route
      path="/reminders"
      element={<Reminders />}
    />
     <Route
      path="/modelView"
      element={<ViewContent />}
    />
    <Route
      path="/label/:name/:id"
      element={<ViewArea />}
    />
    <Route
      path="/archive"
      element={<Archive />}
    />
    <Route
      path="/trash"
      element={<Trash />}
    />
    <Route
      path="/drawingPad"
      element={<DrawingPad />}
    />
    <Route
      path="/profile"
      element={<Profile />}
    />
  </Route>
  <Route element={<NoLoginAccess />} >

    <Route
      element={<Active />}
      path="/active/:token"
    />
    <Route
      element={<ChangePassword />}
      path="/forgot/changePWd/:email"
    />
    <Route
      element={<OtpForm />}
      path="/forgot/otpPage/:email"
    />
    <Route
      element={<Forgot />}
      path="/forgot"
    />
    <Route
      element={<Login />}
      path="/login"
    />
  </Route>

  <Route
    path="/*"
    element={<Error />}
  />

</Route>
)
)

// {
//   path: "/login",
//   element: <Login />,
//   errorElement: <Error />
// },
// {
//   path: "/forgot",
//   element: <Forgot />,
//   errorElement: <Error />,
// },
// {
//   path: "/forgot/otpPage/:email",
//   element: <OtpForm />,
//   errorElement: <Error />,
// },
// {
//   element: <ChangePassword />,
//   path: "/forgot/changePWd/:email",
//   errorElement: <Error />,
// },
// {
//   path: "/active/:token",
//   errorElement: <Error />,
//   element: <Active />
// },
// {
//   path: "/*",
//   element: <Error />,
//   errorElement: <Error />
// },
// {
//   path: "/",
//   element: <Home />,
//   errorElement: <Error />
// },