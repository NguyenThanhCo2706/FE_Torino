import { useEffect, useState } from "react";
import { thousandSeparator } from "../../utils";
import { Card, Pagination, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import historyApi from "../../api/historyApi";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";

const History = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const [orders, setOrders] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    historyApi.getMany(status, currentPage, 3).then((data: any) => {
      setOrders(data.list);
      setTotalPage(data.paging.totalPages);
      setLoading(false);
    })
  }, [status, currentPage])

  const handleChangePage = (event: any, value: number) => {
    setCurrentPage(+value);
  }

  return (
    <>
      <div className="container mx-auto my-[20px]">
        <div className="flex justify-start w-full text-[40px] mb-3 font-semibold text-green-600">
          {t("history.history")}
        </div>
        <div className="flex p-1 text-xl w-full ">
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 0 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(0)}
          >{t("history.all")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 1 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(1)}
          >{t("history.pending")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 2 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(2)}
          >{t("history.confirm")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 3 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(3)}
          >{t("history.complete")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 4 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(4)}
          >{t("history.cancel")}</div>
          <div className="w-full border-b-2 border-[#385D36]"></div>
        </div>
        <Card className="!px-10 !mt-5">
          {
            orders.map((order: any, index: number) => {
              const totalPrice = order.orderDetails.reduce((prev: number, cur: any) => { return cur.price + prev }, 0)
              return (
                <Paper sx={{ paddingX: 2, marginY: 2 }} elevation={4}>
                  <div className="my-5 border-b-2" key={index}>
                    <div className="italic text-gray-600 font-medium">
                      <span>{t("history.order")}:</span>
                      <span className="text-xl font-semibold">{order.id}</span>
                    </div>
                    <div className="flex justify-between border-b">
                      <span>
                        <span className="italic">{t("history.dateOfReceive")}: </span>
                        <span className="font-semibold text-[#385D36]">{order.dateOfReceive}</span>
                      </span>
                      <span>
                        <span className="italic text-[1rem]">{t("history.status")}: </span>
                        <span className="text-xl font-semibold text-[#385D36]">Hoàn thành</span>
                      </span>
                    </div>
                    <div>
                      {
                        order.orderDetails.map((detail: any, index: number) => (
                          <div className="flex items-center py-3" key={index}>
                            <img
                              src={detail.image}
                              alt=""
                              className="w-[80px] h-[80px] object-cover"
                            />
                            <div className="w-full flex justify-between items-center">
                              <div className="ms-5">
                                <p className="font-semibold text-xl text-[#385D36]">{detail.productName}</p>
                                <p>x {detail.quantity}</p>
                              </div>
                              <div>
                                {thousandSeparator(detail.price)} VNĐ
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="italic">{t("history.deliveryType")}: <span className="font-semibold text-[#385D36]">Giao hàng</span></span>
                      <span>{t("history.totalPrice")}: <span className="text-xl font-semibold text-[#385D36]">{thousandSeparator(totalPrice)} VNĐ</span></span>
                    </div>
                  </div>
                </Paper>
              )
            })
          }
        </Card>
        <div className="flex justify-center mt-10">
          <Pagination
            onChange={handleChangePage}
            count={totalPage}
            variant="outlined"
            shape="rounded" />
        </div>
      </div>
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}

export default History;