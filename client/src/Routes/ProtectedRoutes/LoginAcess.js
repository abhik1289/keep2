import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from './../../components/Auth/Login/index';


export default function LoggedInRoutes() {
  const auth = useSelector(state => state.user.auth);


  return auth?.isLogin===true ? <Outlet /> : <Login/>;
}
