import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import { ErrorLogin } from "../../types";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<ErrorLogin>();

  useEffect(() => {
    const authString = localStorage.getItem('auth');
    if (authString) {
      const auth = JSON.parse(authString);
      if (auth) {
        setUsername(auth.username);
        setPassword(auth.password);
      }
    }
  }, [])

  const handleSubmit = () => {
    const error: ErrorLogin = {};
    if (username === "") {
      error.username = t('auth.errorUser') || ""
    }
    if (password === "") {
      error.password = t('auth.errorPass') || ""
    }
    if (Object.keys(error).length !== 0) {
      setError(error);
      return;
    }

    setLoading(true);
    authApi.login(username, password).then((data) => {
      setLoading(false);
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (rememberMe) {
          localStorage.setItem('auth', JSON.stringify({
            username: username,
            password: password
          }));
        }
        return navigate("/");
      }
      toast.error(t('message.auth.wrongUserPass'));
    }).catch(() => {
      setLoading(false);
      toast.error(t('message.auth.wrongUserPass'));
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const changeUsername = (e: any) => {
    setUsername(e.target.value)
    delete error?.username;
    setError(error)
  }

  const changePassword = (e: any) => {
    setPassword(e.target.value)
    delete error?.password;
    setError(error)
  }

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label={t('auth.username')}
          autoFocus
          value={username}
          onChange={changeUsername}
          error={!!error?.username}
          helperText={error?.username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label={t('auth.password')}
          type={showPassword ? 'text' : 'password'}
          error={!!error?.password}
          helperText={error?.password}
          value={password}
          onChange={changePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            color="primary" />}
          label={t('auth.rememberMe')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          {t('auth.signIn')}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="">
              {t('auth.forgotPassword')}
            </Link>
          </Grid>
          <Grid item>
            {t('auth.dontHaveAccount')}?
            <Link to="/register" className="ms-1 text-blue-500 underline hover:cursor-pointer hover:text-blue-700">
              {t('auth.signUp')}
            </Link>
          </Grid>
        </Grid>
      </Box>
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}

export default Login;
