import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

import PasswordFieldValidate from "../../Commons/PasswordFieldValidate";
import { changePasswordSchema } from "../../validations";
import authApi from "../../api/authApi";

const ChangePassword = (props: any) => {
  const { setLoading } = props;
  const { t } = useTranslation();

  const handleChangePassword = async (data: any) => {
    setLoading(true);
    try {
      await authApi.changePassword(data);
      setLoading(false);
      toast.success(t('message.profile.successSavePass'));
    }
    catch (err) {
      setLoading(false);
      toast.error(t('message.profile.failSave'));
    }
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  return (
    <div className="flex p-5">
      <div className="w-1/3"></div>
      <div className="w-2/3">
        <div>
          <div className="flex flex-row items-center">
            <LabelImportantIcon />
            <Typography variant="h6" fontWeight="bold">{t('profile.changePassword')}</Typography>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleChangePassword)} className="my-[20px]">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <PasswordFieldValidate
                control={control}
                errors={errors}
                name={"oldPassword"}
                label={t('profile.oldPassword')}
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <PasswordFieldValidate
                control={control}
                errors={errors}
                name={"password"}
                label={t('profile.newPassword')}
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <PasswordFieldValidate
                control={control}
                errors={errors}
                name={"confirmPassword"}
                label={t('profile.confirmPassword')}
                size="small"
              />
            </Grid>
          </Grid>
          <div className="text-right mt-2">
            <Button variant="contained" type="submit">{t('profile.save')}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword;