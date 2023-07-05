import { useState } from "react";
import { Box, Button, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

import authApi from "../../api/authApi";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import { registerSchema } from "../../validations";
import TextFieldValidate from "../../Commons/TextFieldValidate";
import PasswordFieldValidate from "../../Commons/PasswordFieldValidate";
import { authentication } from "../../config/firebase-config";

const Register = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [final, setFinal] = useState<any>();

  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = () => {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      'callback': (response: any) => {
      }
    }, authentication);

    signInWithPhoneNumber(authentication, getValues("phone").replace("0", "+84"), appVerifier)
      .then((confirmationResult) => {
        setFinal(confirmationResult);
        handleOpen();
        appVerifier.clear()
      })
      .catch((error) => {
      })
  };

  const register = async (customer: any) => {
    try {
      setLoading(true);
      const data: any = await authApi.register(customer)
      setLoading(false);
      if (data.status !== 200) {
        toast.error(t("message.auth.failRegister"));
        return;
      }
      toast.success(t("message.auth.successRegister"));
      return navigate("/login");
    }
    catch {
      setLoading(false);
      toast.error(t("message.auth.failRegister"));
    }
  }

  const handleCheckOTP = async () => {
    final.confirm(otp)
      .then(async () => {
        await register(getValues());
        handleClose();
        setOTP("");
      })
      .catch((error: any) => {
        alert(t("auth.wrongOTP"));
      })
  }

  const [otp, setOTP] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <PasswordFieldValidate
              control={control}
              errors={errors}
              name={"password"}
              label={t('auth.password')}
            />
          </Grid>
          <Grid item xs={6}>
            <PasswordFieldValidate
              control={control}
              errors={errors}
              name={"confirmPassword"}
              label={t('auth.confirmPassword')}
            />
          </Grid>
        </Grid>
        <div className="flex justify-center mt-5">
          <div id="recaptcha-container"></div>
        </div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          boxShadow: 24,
          padding: "40px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
            {t("auth.otpTitle")}
          </Typography>
          <TextField
            variant="standard"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            inputProps={{
              style: {
                textAlign: 'center',
                fontSize: '20px',
              }
            }}
            sx={{
              marginBottom: '10px'
            }}
          />
          <Button variant="contained" onClick={handleCheckOTP}>{t("auth.submit")}</Button>
        </Box>
      </Modal>
    </>
  )
}

export default Register;
