import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function PrimarySearchAppBar() {
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const navigate = useNavigate()

  return (
    <div className="w-full border-b-2">
      <div className="container h-[80px] flex items-center justify-between mx-auto ">
        <div
          className='flex items-center hover:cursor-pointer w-1/4'
          onClick={() => navigate("/")}
        >
          <div className='flex flex-row items-center'>
            <img
              className='w-[100px] h-[80px]'
              src="https://torinobucket.s3.ap-southeast-1.amazonaws.com/Products/logo.png?fbclid=IwAR0TWqJzmuWcRXlbWJSH7geInKdktMULzDRYKa2xp_tnOALa_1y7fIpTRgc"
              alt=""
            />
          </div>
        </div>
        <div className='flex flex-row justify-evenly w-2/4 font-bold items-center'>
          <div
            className='hover:cursor-pointer hover:border-b-4'
            onClick={() => navigate("/product")}
          >
            <button className="peer">PRODUCT</button>
            <div className="absolute hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg z-10">
              <a className="px-5 py-3 hover:bg-gray-200" href="#">About Us</a>
              <a className="px-5 py-3 hover:bg-gray-200" href="#">Contact Us</a>
              <a className="px-5 py-3 hover:bg-gray-200" href="#">Privacy Policy</a>
            </div>
          </div>
          <div
            className='hover:cursor-pointer hover:border-b-4'
          >OUR STORY</div>
          <div
            className='hover:cursor-pointer hover:border-b-4'
          >NEWS & EVENTS</div>
          <div
            className='hover:cursor-pointer hover:border-b-4'
          >FRANCHISE</div>
          <div
            className='hover:cursor-pointer hover:border-b-4'
            onClick={() => navigate("/contact")}
          >CONTACT US</div>
        </div>
        <div className='flex justify-end w-1/4'>
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
