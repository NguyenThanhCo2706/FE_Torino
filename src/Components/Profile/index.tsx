import { Button, Card, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import authApi from "../../api/authApi";
import { InfoUser } from "../../types";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import commonApi from "../../api/commonApi";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState<number>(0);
  const [image, setImage] = useState<any>();
  const [avatar, setAvatar] = useState<string>("");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const openFile = () => {
    const input = document.getElementById('myFileInput');
    input && input.click();
  }
  useEffect(() => {
    setLoading(true);
    authApi.profile().then((data: InfoUser) => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      setBirthday(new Date(data.birthday));
      setGender(data.gender);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    })
  }, [])

  const handleSaveInfo = async () => {
    setLoading(true);
    try {
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('folder', 'Products');
        const url = await commonApi.uploadS3(formData);
        setAvatar(url);
      }

      await authApi.updateProfile({
        "firstName": firstName,
        "lastName": lastName,
        "gender": gender,
        "birthday": birthday
      });
      setLoading(false);
      toast.success("Save information success!");
    }
    catch (err) {
      setLoading(false);
      toast.error("Save information failed!");
    }
  }
  const handleChangePassword = async () => {
    setLoading(true);
    try {
      // await authApi.changePassword({
      //   "oldPassword": firstName,
      //   "password": lastName,
      //   "confirmPassword": confirmPassword,
      // });
      console.log({
        "oldPassword": oldPassword,
        "password": password,
        "confirmPassword": confirmPassword,
      });

      setLoading(false);
      toast.success("Save password success!");
    }
    catch (err) {
      setLoading(false);
      toast.success("Save password failed!");
    }
  }

  const handleChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    setImage(selectedImage);
  }

  return (
    <>
      <Card className="container mx-auto m-5">
        <div className="mx-auto flex flex-row items-center justify-between w-full p-5">
          <div className="w-1/5"></div>
          <div className="w-1/5 flex flex-col items-center">
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
            <div className="mt-5">
              <input type="file" id="myFileInput" hidden onChange={(e) => handleChooseImage(e)} />
              <Button
                variant="contained"
                onClick={openFile}
              >{t('profile.chooseImage')}</Button>
            </div>
          </div>
          <div className="w-1/5"></div>

          <div className="w-2/3">
            <div>
              <div className="flex flex-row items-center">
                <LabelImportantIcon />
                <Typography variant="h6" fontWeight="bold">{t('profile.profile')}</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="outlined-controlled"
                    label={t('profile.firstName')}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    label={t('profile.lastName')}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    size="small"
                    id="phone"
                    label={t('profile.phone')}
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    margin="normal"
                    size="small"
                    label={t('profile.birthday')}
                    fullWidth
                    value={birthday}
                    onChange={(e) => setBirthday(new Date(e.target.value))}
                  />
                </Grid>
              </Grid>
              <div className="p-3">
                <p className="font-bold mb-2">{t('profile.gender')}</p>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(+e.target.value)}
                >
                  <FormControlLabel value={2} control={<Radio />} label={t('profile.male')} />
                  <FormControlLabel value={1} control={<Radio />} label={t('profile.female')} />
                  <FormControlLabel value={0} control={<Radio />} label={t('profile.other')} />
                </RadioGroup>
              </div>
              <div className="text-right mt-2">
                <Button variant="contained" onClick={handleSaveInfo} >{t('profile.save')}</Button>
              </div>
            </div>
            <div className="flex mt-6 items-center border-b-2 border-gray-200 mb-5">
            </div>
            <div>
              <div className="flex flex-row items-center">
                <LabelImportantIcon />
                <Typography variant="h6" fontWeight="bold">{t('profile.changePassword')}</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    type="password"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    label={t('profile.oldPassword')}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="password"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    label={t('profile.newPassword')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="password"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    label={t('profile.rePassword')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <div className="text-right mt-2">
                <Button variant="contained" onClick={handleChangePassword} >{t('profile.save')}</Button>
              </div>
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
