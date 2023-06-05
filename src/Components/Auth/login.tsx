import * as React from 'react';
import { IconButton, InputAdornment, Grid, createTheme, ThemeProvider, Avatar, Button, Typography, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box } from '@mui/material';
import authApi from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgressCustom } from '../../Commons/CircularProgressCustom';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';

const theme = createTheme();

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      toast.error("Wrong Username or Password!");
    }).catch(() => {
      setLoading(false);
      toast.error("Wrong Username or Password!");
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://torinobucket.s3-ap-southeast-1.amazonaws.com/Products/a92e9225-14b5-4605-bf86-435dbdf456bc.PNG)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                TORINO
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label={t('auth.username')}
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label={t('auth.password')}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                >
                  {t('auth.signIn')}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {t('auth.forgotPassword')}
                    </Link>
                  </Grid>
                  <Grid item>
                    {t('auth.dontHaveAccount')}?
                    <Link href="#" variant="body2" sx={{ marginLeft: "5px" }}>
                      {t('auth.signUp')}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      {
        loading && <CircularProgressCustom />
      }
    </>
  );
}
