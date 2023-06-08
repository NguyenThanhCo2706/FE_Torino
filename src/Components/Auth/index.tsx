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
import Register from './Register';

const theme = createTheme();

export default function Auth(props: any) {

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
              {
                props.children
              }
              {/* <Register /> */}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
