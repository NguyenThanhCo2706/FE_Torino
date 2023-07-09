import { useEffect, useState } from "react";
import { thousandSeparator } from "../../utils";
import { Button, Card, Pagination, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import historyApi from "../../api/historyApi";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import moment from "moment";
import orderApi from "../../api/orderApi";
import { toast } from "react-toastify";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

enum StatusOrder {
  pending = 1,
  confirm,
  complete,
  cancel,
}

const History = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const [orders, setOrders] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [orderId, setOrderId] = useState(0);

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

  const handleConfirm = async () => {
    const result: any = await orderApi.cancelOrder(orderId);
    if (result.code !== 200) {
      toast.error(t("message.history.cancelFailure"))
      return;
    }
    await historyApi.getMany(status, currentPage, 3).then((data: any) => {
      setOrders(data.list);
      setTotalPage(data.paging.totalPages);
      setLoading(false);
    })
    setConfirm(false);
    toast.success(t("message.history.cancelSuccess"))
  }

  return (
    <>
      <div className="container mx-auto my-[20px]">
        <div className="flex justify-start w-full text-[40px] mb-3 font-semibold text-[#517A4D]">
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
        <Card className="!px-5 !mt-5">
          {
            orders.map((order: any, index: number) => {
              const totalPrice = order.orderDetails.reduce((prev: number, cur: any) => { return cur.price * cur.quantity + prev }, 0)
              return (
                <Paper key={index} sx={{ paddingX: 2, marginY: 2 }} elevation={4}>
                  <div className="">
                    <div className="italic text-gray-600 font-medium pt-3">
                      <span>{t("history.order")}:</span>
                      <span className="text-xl font-semibold">{order.id}</span>
                      {order.isPaid && <span> - Đã Thanh toán</span>}
                    </div>
                    <div className="flex justify-between border-b">
                      <span>
                        <span className="italic">{t("history.dateOfReceive")}: </span>
                        <span className="font-semibold text-[#385D36]">{moment(order.dateOfReceive).format("YYYY-MM-DD HH:mm:ss")}</span>
                      </span>
                      <span>
                        <span className="italic text-[1rem]">{t("history.status")}: </span>
                        <span className="text-xl font-semibold text-[#385D36]">{t(`history.${StatusOrder[order.status]}`)}</span>
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
                      <span className="italic">{t("history.deliveryType")}: <span className="font-semibold text-[#385D36]">
                        {
                          order.address ? `${order.address.detailAddress}, ${order.address.communeName}, ${order.address.districtName}, ${order.address.provinceName}` : t("history.shop")
                        }
                      </span></span>
                      <span>{t("history.totalPrice")}: <span className="text-xl font-semibold text-[#385D36]">{thousandSeparator(totalPrice)} VNĐ</span></span>
                    </div>
                    {
                      order.status === StatusOrder.pending && !order.isPaid &&
                      <div className="text-right">
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          style={{
                            backgroundColor: "red",
                          }}
                          onClick={() => {
                            setOrderId(order.id);
                            setConfirm(true);
                          }}
                        >{t('history.cancelOrder')}
                        </Button>
                      </div>
                    }
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
      {
        confirm &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.15)] bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ErrorOutlineIcon sx={{ color: "green" }} />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="font-semibold leading-6 text-gray-900" id="modal-title">{t('vnpay.title')}</h3>
                      <div className="mt-2">
                        {t('history.confirmCancel')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={handleConfirm}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-700 text-white shadow-sm  sm:ml-3 sm:w-auto"
                  >{t('vnpay.confirm')}</button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500 hover:ring-green-500 hover:text-white sm:mt-0 sm:w-auto"
                    onClick={() => setConfirm(false)}
                  >{t('vnpay.cancel')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default History;