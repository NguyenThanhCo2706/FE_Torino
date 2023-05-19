import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { TextField } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function PrimarySearchAppBar() {
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const navigate = useNavigate()

  return (
    <div className="w-full bg-green-100 border-b-2">
      <div className="container h-[80px] flex items-center justify-between mx-auto ">
        <div
          className='flex items-center hover:cursor-pointer'
          onClick={() => navigate("/")}
        >
          <div className='flex flex-row items-center'>
            <img
              style={
                {
                  width: "100px",
                  height: "80px"
                }
              }
              src="https://torinobucket.s3.ap-southeast-1.amazonaws.com/Products/logo.png?fbclid=IwAR0TWqJzmuWcRXlbWJSH7geInKdktMULzDRYKa2xp_tnOALa_1y7fIpTRgc"
              alt=""
            />

          </div>
        </div>
        <div>
          <TextField
            // size="small"
            autoComplete="off"
            label={""}
            fullWidth
            sx={{
              width: "500px",
              "& label.Mui-focused": {
                color: "rgba(0, 0, 0, 0.23)",
                borderWidth: "1px"
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderWidth: "1px"
                }
              },
            }}
            required
            InputProps={{
              startAdornment: <SearchIcon />,

            }}
            placeholder='Search...'
          />
        </div>
        <div>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={4} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate("/profile")}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </div>
      </div>
    </div>
  );
}
