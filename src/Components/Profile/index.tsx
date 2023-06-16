import { Button, Card } from "@mui/material"
import { useState } from "react";
import { useTranslation } from "react-i18next";

import authApi from "../../api/authApi";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import ChangeInformation from "./ChangeInformation";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/reducers/userSlice";

export const Profile = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    await authApi.logout();
    setLoading(false);
    localStorage.removeItem('token');
    dispatch(userActions.setUserInfo(null));
    navigate("/")
  }

  return (
    <>
      <Card className="container mx-auto m-5">
        <ChangeInformation setLoading={setLoading} />
        <ChangePassword setLoading={setLoading} />
        <div className="ms-5 mb-5">
          <Button
            variant="contained"
            onClick={handleLogout}
          >{t('auth.logout')}</Button>
        </div>
      </Card >
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
