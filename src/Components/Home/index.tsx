import { useDispatch } from "react-redux";
import Header from "../Header"
import { Footer } from "../footer"
import { useEffect } from "react";
import authApi from "../../api/authApi";
import { userActions } from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";

export const Home = (props: any) => {
  const dispatch = useDispatch();
  // const aaa = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authApi.profile().then((data) => {
        dispatch(userActions.setUserInfo(data));
      }).catch((e) => {
        localStorage.removeItem("token");
        toast.error(e.message);
      })
    }
    else {
      dispatch(userActions.setUserInfo(null));
    }
  }, [])

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
