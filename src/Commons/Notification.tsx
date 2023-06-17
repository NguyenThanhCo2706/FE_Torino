import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;
const Notification = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [count, setCount] = useState(5);
  const [connectionRef, setConnection] = useState<HubConnection>();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const url = `${process.env.REACT_APP_API_URL}/hub/notification?token=${token}`;
      const con = new HubConnectionBuilder()
        .withUrl(url)
        .withAutomaticReconnect()
        .build();
      setConnection(con);
    } catch (e: any) {
      toast.error(e.message);
    }
  }, []);

  useEffect(() => {
    if (connectionRef) {
      try {
        connectionRef
          .start()
          .then(() => {
            connectionRef.on('OrderConfirmed', (message: any) => {
              setCount(count + 1);
              toast.success("Đơn hàng bạn đã được approve");
            });
          })
          .catch((err: any) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
    return () => {
      connectionRef?.stop();
    };
  }, [connectionRef]);


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        size="large"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={count} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 7.5,
            width: '300px',
            transform: "translateX(-50%) ",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Notification;
