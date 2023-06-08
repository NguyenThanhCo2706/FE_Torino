import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { Customer, ErrorRegister } from "../../types";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import { registerSchema } from "../../validations";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldValidate from "../../Commons/TextFieldValidate";
import PasswordFieldValidate from "../../Commons/PasswordFieldValidate";

const Register = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerType, setCustomerType] = useState("1");

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleSubmit2 = async () => {


  };

  const onSubmit = (customer: any) => {
    setLoading(true);
    authApi.register(customer).then((data) => {
      setLoading(false);
      if (data.status !== 200) {
        toast.error(t("message.auth.failRegister"));
        return;
      }
      toast.success(t("message.auth.successRegister"));
      return navigate("/login");
    }).catch(() => {
      setLoading(false);
      toast.error(t("message.auth.failRegister"));
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-[20px]">
        <Grid container spacing={2} className="my-[20px]">
          <Grid item xs={6}>
            <TextFieldValidate
              control={control}
              errors={errors}
              name={"firstName"}
              label={t('auth.firstName')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldValidate
              control={control}
              errors={errors}
              name={"lastName"}
              label={t('auth.lastName')}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="my-[20px]">
          <Grid item xs={6}>
            <TextFieldValidate
              control={control}
              errors={errors}
              name={"email"}
              label={t('auth.email')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldValidate
              control={control}
              errors={errors}
              name={"phone"}
              label={t('auth.phone')}
            />
          </Grid>
        </Grid>
        <div className="my-[20px]">
          <FormLabel className="underline"
            sx={{
              fontSize: "18px",
              color: "black",
            }}
          >{t('auth.area')}</FormLabel>
          <Controller
            name="type"
            control={control}
            defaultValue="1"
            render={({ field }) => (
              <RadioGroup {...field}    >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControlLabel value="1" control={<Radio />} label={t('auth.inArea')} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="2" control={<Radio />} label={t('auth.outArea')} />
                  </Grid>
                </Grid>
              </RadioGroup>
            )}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextFieldValidate
              control={control}
              errors={errors}
              name={"username"}
              label={t('auth.username')}
            />
          </Grid>
          <Grid item xs={4}>
            <PasswordFieldValidate
              control={control}
              errors={errors}
              name={"password"}
              label={t('auth.password')}
            />

          </Grid>
          <Grid item xs={4}>
            <PasswordFieldValidate
              control={control}
              errors={errors}
              name={"confirmPassword"}
              label={t('auth.confirmPassword')}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, p: "10px" }}
        >
          {t('auth.signUp')}
        </Button>
      </form>
      <Grid container justifyContent={"end"}>
        <Grid item>
          <Link to="/login" className="underline text-blue-500 hover:cursor-pointer hover:text-blue-700">
            {t('auth.backLogin')}
          </Link>
        </Grid>
      </Grid>

      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}

export default Register;
