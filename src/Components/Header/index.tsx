import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HistoryIcon from '@mui/icons-material/History';

import Notification from '../../Commons/Notification';
import { Category } from '../../types';
import i18n from '../../i18n';
import { RootState } from '../../redux/store';

const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { categories } = useSelector((state: RootState) => state.category);
  const { orderDetails } = useSelector((state: RootState) => state.orderDetail);
  const { user } = useSelector((state: RootState) => state.user);
  console.log(categories);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }

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
            className='relative first-letter:hover:cursor-pointer hover:border-b-4'
          >
            <button
              onClick={() => navigate("/product")}
              className="peer py-1">{t('header.product')}</button>
            <div className="absolute hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg z-10">
              {
                categories.map((category: Category, index: number) => (
                  <Link
                    key={index}
                    to={`/product/category/${category.id}`}
                    className="px-5 py-3 hover:bg-gray-200 hover:cursor-pointer font-semibold"
                  >{category.name}</Link>
                ))
              }
            </div>
          </div>
          <div
            className='hover:cursor-pointer hover:border-b-4'
          >{t('header.story')}</div>
          <div
            className='hover:cursor-pointer hover:border-b-4'
            onClick={() => navigate("/contact")}
          >{t('header.support')}</div>
        </div>
        <div className='flex justify-end w-1/4 items-center'>
          <div className='font-bold bg-slate-300 py-1 px-2 rounded-[20px] mx-2 whitespace-nowrap'>
            <button
              className='underline hover:text-blue-600'
              onClick={() => handleChangeLanguage('vi')}>VIE</button>
            <span className='mx-1'>/</span>
            <button
              className="underline hover:text-blue-600"
              onClick={() => handleChangeLanguage('en')}>ENG</button>
          </div>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => navigate("/history")}
            >
              <HistoryIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={orderDetails.length} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            <Notification />
            {
              user ?
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => navigate("/profile")}
                >
                  {
                    user.avatar ?
                      <img src={user?.avatar} alt="" className="w-[24px] h-[24px] rounded-full object-cover" />
                      : <AccountCircle />
                  }
                </IconButton>
                :
                <div className='text-center font-semibold ml-3 flex items-center whitespace-nowrap'>
                  <Link to="/login" className='hover:underline'>{t('header.signIn')}</Link>
                </div>
            }
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
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

export default Header;
