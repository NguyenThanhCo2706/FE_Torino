import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

import TextFieldValidate from "../../Commons/TextFieldValidate";
import { updateUserInfo } from "../../validations";
import { RootState } from "../../redux/store";
import authApi from "../../api/authApi";
import commonApi from "../../api/commonApi";
import { userActions } from "../../redux/reducers/userSlice";

const ChangeInformation = (props: any) => {
  const { setLoading } = props;
  const { t } = useTranslation();
  const [image, setImage] = useState<any>();
  const { user } = useSelector((state: RootState) => state.user);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(updateUserInfo),
  });
  const dispatch = useDispatch();

  const handleSaveInfo = async (data: any) => {
    setLoading(true);
    data.avatar = user?.avatar;
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('folder', 'Products');
      const url = await commonApi.uploadS3(formData);
      data = { ...data, avatar: url }
    }
    console.log(data);
    authApi.updateProfile(data).then(() => {
      dispatch(userActions.setUserInfo(data));
      setLoading(false);
      toast.success(t('message.profile.successSaveInfo'));
      setImage(null);
    }).catch(() => {
      setLoading(false);
      toast.error(t("message.profile.failSave"));
    });
  }

  useEffect(() => {
    if (user) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("phone", user?.phone);
      setValue("birthday", moment(user?.birthday).format("YYYY-MM-DD"));
      setValue("gender", user?.gender.toString());
    }
  }, [user])

  const openFile = () => {
    const input = document.getElementById('myFileInput');
    input && input.click();
  }

  const handleChooseImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    setImage(selectedImage);
  }

  return (
    <>
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
                  src={user?.avatar} alt=""
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
        </div>

        <div className="w-2/3 pb-5 border-b-2">
          <form onSubmit={handleSubmit(handleSaveInfo)} >
            <div className="flex flex-row items-center mb-3">
              <LabelImportantIcon />
              <Typography variant="h6" fontWeight="bold">{t('profile.profile')}</Typography>
            </div>
            <Grid container spacing={3} className="mb-4">
              <Grid item xs={6}>
                <TextFieldValidate
                  control={control}
                  errors={errors}
                  name={"firstName"}
                  label={t('profile.firstName')}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldValidate
                  control={control}
                  errors={errors}
                  name={"lastName"}
                  label={t('profile.lastName')}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextFieldValidate
                  control={control}
                  errors={errors}
                  name={"phone"}
                  label={t('profile.phone')}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldValidate
                  type="date"
                  control={control}
                  errors={errors}
                  name={"birthday"}
                  label={t('profile.birthday')}
                  size="small"
                />
              </Grid>
            </Grid>
            <div className="p-3">
              <p className="font-bold my-2">{t('profile.gender')}</p>
              <Controller
                name="gender"
                control={control}
                defaultValue="0"
                render={({ field }) => (
                  <RadioGroup {...field}    >
                    <FormControlLabel value={2} control={<Radio />} label={t('profile.male')} />
                    <FormControlLabel value={1} control={<Radio />} label={t('profile.female')} />
                    <FormControlLabel value={0} control={<Radio />} label={t('profile.other')} />
                  </RadioGroup>
                )}
              />
            </div>
            <div className="text-right mt-2">
              <Button variant="contained" type="submit">{t('profile.save')}</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangeInformation;
