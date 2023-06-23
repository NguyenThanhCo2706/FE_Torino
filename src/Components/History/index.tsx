import { useState } from "react";
import { thousandSeparator } from "../../utils";
import { Box, Card, Pagination, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";

import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import TabPanel from "../../Commons/TabPanel";

const History = () => {
  const [status, setStatus] = useState(1);
  const { t } = useTranslation();

  const Description = (id: number) => {
    switch (id) {
      case 1: {
        return <>

        </>
      }
      case 2: {
        return <>

        </>
      }
      case 3: {
        return <>

        </>
      }
      case 4: {
        return <>
        </>
      }
      case 5: {
        return <>
        </>
      }
      default: {
        return <></>
      }
    }
  }
  const [value, setValue] = useState(1);
  return (
    <>
      <div className="container mx-auto my-[20px]">
        <div className="flex justify-start w-full text-[40px] mb-3 font-semibold text-green-600">
          Lịch sử đơn hàng
        </div>
        <div className="flex p-1 text-xl w-full ">
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 1 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(1)}
          >{t("history.all")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 2 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(2)}
          >{t("history.pending")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 3 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(3)}
          >{t("history.confirm")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 4 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(4)}
          >{t("history.complete")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 5 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(5)}
          >{t("history.cancel")}</div>
          <div className="w-full border-b-2 border-[#385D36]"></div>
        </div>
        <Card className="!px-10 !mt-5">

          <div className="my-5 border-b-2">
            <div className="italic text-gray-600 font-medium">
              <span>Đơn hàng:</span>
              <span className="text-xl font-semibold">#123</span>
            </div>
            <div className="flex justify-between border-b">
              <span>
                <span className="italic">Ngày nhận hàng: </span>
                <span className="text-xl font-semibold text-[#385D36]">2001-01-01</span>
                <span className="text-[1rem] font-normal">08:00:00</span>
              </span>
              <span>
                <span className="italic text-[1rem]">Tình trạng: </span>
                <span className="text-xl font-semibold text-[#385D36]">Hoàn thành</span>

              </span>
            </div>
            <div>
              <div className="flex items-center py-3">
                <img
                  src="https://torinobucket.s3-ap-southeast-1.amazonaws.com/Products/e705b526-275f-446e-8bcc-b578338ecad0.JPG"
                  alt=""
                  className="w-[80px] h-[80px] object-cover"
                />
                <div className="w-full flex justify-between items-center">
                  <div className="ms-5">
                    <p className="font-semibold text-xl text-[#385D36]">Name</p>
                    <p>x 100</p>
                  </div>
                  <div>
                    {thousandSeparator(100000)} VNĐ
                  </div>
                </div>
              </div>
              <div className="flex items-center py-3">
                <img
                  src="https://torinobucket.s3-ap-southeast-1.amazonaws.com/Products/e705b526-275f-446e-8bcc-b578338ecad0.JPG"
                  alt=""
                  className="w-[80px] h-[80px] object-cover"
                />
                <div className="w-full flex justify-between items-center">
                  <div className="ms-5">
                    <p className="font-semibold text-xl text-[#385D36]">Name</p>
                    <p>x 100</p>
                  </div>
                  <div>
                    {thousandSeparator(100000)} VNĐ
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <span className="italic">Hình thức giao hàng: <span className="font-semibold text-[#385D36]">Giao hàng</span></span>
              <span>Thành tiền: <span className="text-xl font-semibold text-[#385D36]">{thousandSeparator(100000)} VNĐ</span></span>
            </div>
          </div>
        </Card>
        <div className="flex justify-center mt-10">
          <Pagination
            // onChange={handleChangePage}
            // count={totalPage} 
            variant="outlined"
            shape="rounded" />
        </div>
      </div>
    </>
    // <div className="container mx-auto">
    //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //     <Tabs value={value} onChange={(e, newVal) => setValue(newVal)} aria-label="basic tabs example">
    //       <Tab label="Item One" />
    //       <Tab label="Item Two" />
    //       <Tab label="Item Three" />
    //     </Tabs>
    //   </Box >
    //   <TabPanel value={value} index={0}>
    //     Item One
    //   </TabPanel>
    //   <TabPanel value={value} index={1}>
    //     Item Two
    //   </TabPanel>
    //   <TabPanel value={value} index={2}>
    //     Item Three
    //   </TabPanel>
    // </div>
  )
}

export default History;