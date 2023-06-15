import { Button, Card, Typography } from "@mui/material"
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
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

  const [image, setImage] = useState<any>();
  const [avatar, setAvatar] = useState<string>("");
  const openFile = () => {
    const input = document.getElementById('myFileInput');
    input && input.click();
  }

  const handleChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    setImage(selectedImage);
  }

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
        <div className="mx-auto flex flex-row justify-between w-full h-full p-5">
          <div className="w-1/3 min-h-full flex flex-col justify-between relative">
            <div className="flex flex-col items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              {
                image ?
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="w-[200px] h-[200px] rounded-full object-cover"
                  />
                  :
                  <img
                    className="w-[200px] h-[200px] rounded-full object-cover"
                    src="https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg" alt=""
                  />
              }
              <div className="mt-5 text-center">
                <input type="file" id="myFileInput" hidden onChange={(e) => handleChooseImage(e)} />
                <Button
                  variant="contained"
                  onClick={openFile}
                >{t('profile.chooseImage')}</Button>
              </div>
            </div>
            <div className="mt-auto">
              <Button
                variant="contained"
                onClick={handleLogout}
              >{t('auth.logout')}</Button>
            </div>
          </div>

          <div className="w-2/3">
            <ChangeInformation setLoading={setLoading} />
            <div className="flex mt-6 items-center border-b-2 border-gray-200 mb-5">
            </div>
            <div>
              <div className="flex flex-row items-center">
                <LabelImportantIcon />
                <Typography variant="h6" fontWeight="bold">{t('profile.changePassword')}</Typography>
              </div>
              <ChangePassword setLoading={setLoading} />
            </div>
          </div>
        </div>
      </Card>
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
