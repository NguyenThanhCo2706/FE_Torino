import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import PasswordFieldValidate from "../../Commons/PasswordFieldValidate";
import { changePasswordSchema } from "../../validations";
import { useTranslation } from "react-i18next";

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

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  return (
    <>
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
    </>
  )
}

export default ChangePassword;