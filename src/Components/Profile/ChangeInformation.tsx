import { useEffect, useState } from "react";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { updateUserInfo } from "../../validations";
import { useTranslation } from "react-i18next";
import TextFieldValidate from "../../Commons/TextFieldValidate";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { InfoUser, UpdateProfile } from "../../types";
import moment from "moment";

const ChangeInformation = (props: any) => {
  const { setLoading } = props;
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState<string>("");

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(updateUserInfo),
  });

  const handleSaveInfo = (data: any) => {
    setLoading(true);
    // if (image) {
    //   const formData = new FormData();
    //   formData.append('file', image);
    //   formData.append('folder', 'Products');
    //   const url = await commonApi.uploadS3(formData);
    //   setAvatar(url);
    // }
    authApi.updateProfile(data).then(() => {
      setLoading(false);
      toast.success(t('message.profile.successSaveInfo'));
    }).catch(() => {
      setLoading(false);
      toast.error(t("message.profile.failSave"));
    });
  }

  useEffect(() => {
    setLoading(true);
    authApi.profile().then((data: InfoUser) => {
      setValue("firstName", data?.firstName);
      setValue("lastName", data?.lastName);
      setValue("phone", data?.phone);
      setValue("birthday", moment(data?.birthday).format("YYYY-MM-DD"));
      setValue("gender", data?.gender);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    })
  }, [])

  return (
    <>
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
    </>
  )
}

export default ChangeInformation;
