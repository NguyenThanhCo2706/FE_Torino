import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import notificationApi from '../api/notificationApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';
import { caculateTime } from '../utils';

const ITEM_HEIGHT = 48;
const Notification = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const [options, setOptions] = useState<any>([]);
  const [notificationType, setNotificationType] = useState("");
  const { t } = useTranslation();

  const open = Boolean(anchorEl);
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [connectionRef, setConnection] = useState<HubConnection>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      setCount(0);
      setOptions([]);
      return;
    }
    notificationApi.count().then((data: any) => setCount(+data))
    notificationApi.getMany(notificationType).then((data: any) => {
      setOptions(data.list)
      setTotalRecord(data.paging.totalRecord);
      setPageIndex(1);
    });
  }, [user, notificationType])

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
              setCount((prev: number) => prev + 1);
              toast.success("Đơn hàng bạn đã được chấp nhận");
            });

            connectionRef.on('OrderCancled', (message: any) => {
              setCount((prev: number) => prev + 1);
              toast.error("Đơn hàng bạn bị từ chối");
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

  const readNotification = async (id: number) => {
    await notificationApi.read(id);
    const newList = options.map((option: any) => {
      if (option.id === id) option.status = 50;
      return option;
    });
    setOptions(newList)
  }

  const handleMore = () => {
    notificationApi.getMany(notificationType, pageIndex + 1).then((data: any) => {
      setOptions((prev: any) => [...prev, ...data.list])
      setTotalRecord(data.paging.totalRecord);
    });
    setPageIndex((prev) => prev + 1);
  }

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
      {
        user &&
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
              maxHeight: ITEM_HEIGHT * 10,
              width: '500px ',
              transform: "translateX(-50%) ",
            },
          }}
        >
          <div className="px-3 py-1">
            <h1 className="font-bold text-[32px]">
              {t("notification.notification")}
            </h1>
            <div className="flex items-center">
              <button
                className={`${notificationType === "" ? "bg-green-700 text-white" : ""} hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded`}
                onClick={() => { setNotificationType("") }}
              >
                {t("notification.all")}
              </button>
              <span className='mx-2'></span>
              <button
                className={`${notificationType === "40" ? "bg-green-700  text-white" : ""} hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded`}
                onClick={() => { setNotificationType("40") }}
              >
                {t("notification.unread")}
              </button>
            </div>
          </div>
          {options.map((option: any, index: number) => {
            const time = caculateTime(new Date(option.sentAt));
            return (
              <MenuItem
                key={index}
                selected={option === 'Pyxis'}
                onClick={() => readNotification(option.id)}
                sx={{
                  marginBottom: '5px',
                }}
              >
                <div className="flex items-center border-b-2">
                  <img
                    className='w-[50px] h-[50px] object-cover rounded-full'
                    src="https://torinobucket.s3-ap-southeast-1.amazonaws.com/Products/17c2136c-0cf1-4d3a-9987-20562d796706.JPG" alt="" />
                  <div className='mx-3'>
                    <p className='font-semibold max-w-[400px] truncate'>{option.title}</p>
                    <p className='italic max-w-[360px] truncate'>{option.content}</p>
                    <p>{time?.count} {t(`notification.${time?.type}`)}</p>
                  </div>
                  {
                    option.status === 40 && <div className='w-[12px] h-[12px] bg-blue-600 rounded-full'></div>
                  }
                </div>
              </MenuItem>
            )
          })}
          {
            (pageIndex * 5 < totalRecord) && <div
              onClick={handleMore}
              className='text-blue-600 text-center hover:underline hover:cursor-pointer'>
              {t("notification.more")}
            </div>
          }
        </Menu>
      }
    </div>
  );
}

export default Notification;
