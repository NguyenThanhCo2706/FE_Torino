import { Button, Card, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import authApi from "../../api/authApi";
import { InfoUser } from "../../types";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState<number>(0);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const openFile = () => {
    const input = document.getElementById('myFileInput');
    input && input.click();
  }
  useEffect(() => {
    authApi.profile().then((data: InfoUser) => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      setBirthday(new Date(data.birthday));
      setGender(data.gender);
    }).catch((error) => {
      alert(error.message);
    })
  }, [])

  const handleSaveInfo = async () => {
    setLoading(true);
    try {
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
  return (
    <>
      <Card className="container mx-auto m-5">
        <div className="mx-auto flex flex-row items-center justify-between w-full p-5">
          <div className="w-1/5"></div>
          <div className="w-1/5 flex flex-col items-center">
            <img
              className="w-[200px] h-[200px] rounded-full object-cover"
              src="https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg" alt="" />
            <div className="mt-5">
              <input type="file" id="myFileInput" hidden onChange={(e) => console.log(e.target.files && e.target.files[0])} />
              <Button
                variant="contained"
                onClick={openFile}
              >Chọn Ảnh</Button>
            </div>
          </div>
          <div className="w-1/5"></div>

          <div className="w-2/3">
            <div>
              <div className="flex flex-row items-center">
                <LabelImportantIcon />
                <Typography variant="h6" fontWeight="bold">Thông tin cá nhân:</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="outlined-controlled"
                    label="FirstName"
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
                    label="LastName"
                    name="lastName"
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
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
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
                    label="Birthday"
                    name="birthday"
                    fullWidth
                    value={birthday}
                    onChange={(e) => setBirthday(new Date(e.target.value))}
                  />
                </Grid>
              </Grid>
              <div className="p-3">
                <p className="font-bold mb-2">Giới Tính:</p>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(+e.target.value)}
                >
                  <FormControlLabel value={1} control={<Radio />} label="Female" />
                  <FormControlLabel value={2} control={<Radio />} label="Male" />
                  <FormControlLabel value={0} control={<Radio />} label="Other" />
                </RadioGroup>
              </div>
              <div className="text-right mt-2">
                <Button variant="contained" onClick={handleSaveInfo} >Lưu thay đổi</Button>
              </div>
            </div>
            <div className="flex mt-6 items-center border-b-2 border-gray-200 mb-5">
            </div>
            <div>
              <div className="flex flex-row items-center">
                <LabelImportantIcon />
                <Typography variant="h6" fontWeight="bold">Change password:</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    type="password"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    label="old-password"
                    name="old-password"
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
                    label="new-password"
                    name="new-password"
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
                    label="re-password"
                    name="re-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <div className="text-right mt-2">
                <Button variant="contained" onClick={handleChangePassword} >Lưu thay đổi</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <ToastContainer />
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
