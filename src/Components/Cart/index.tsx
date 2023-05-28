import { Link } from "react-router-dom"
import { thousandSeparator } from "../../utils"
import { useEffect, useState } from "react"
import commonApi from "../../api/commonApi"
import { AddressOption, Order, OrderDetail } from "../../types"
import { initOrder } from "../../utils/common"
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom"
import moment from "moment"
import { Modal } from "../../Commons/Modal"


export const Cart = () => {
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [provinces, setProvinces] = useState<AddressOption[]>([]);
  const [districts, setDistricts] = useState<AddressOption[]>([]);
  const [communes, setCommunes] = useState<AddressOption[]>([]);

  const [dateOfReceive, setDateOfReceive] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const [isPaid, setIsPaid] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  useEffect(() => {
    try {
      const order: Order = JSON.parse(localStorage.getItem("order") || "");
      order && setOrder(order);
      setDateOfReceive(moment(new Date()).format("YYYY-MM-DD"));
      setDiscount(order.discount);
      setNote(order.note);
      setIsPaid(order.isPaid);
      setOrderDetails(order.orderDetails);
    }
    catch (err) {
      alert(err);
      initOrder();
      localStorage.removeItem("order");
    };

  }, []);

  useEffect(() => {
    setLoading(true);
    commonApi.getProvinces().then((data) => {
      setProvinces(data);
      setLoading(false);
    }).catch(err => {
      alert(err);
      initOrder();
      localStorage.removeItem("order");
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setTotalPrice(orderDetails.reduce((prev: number, cur: any) => prev + cur.quantity * cur.price, 0));
  }, [orderDetails]);

  const handleChangeQuantity = (productId: number, value: number) => {
    const newData = order && {
      ...order,
      orderDetails: order.orderDetails.map((detail: any) => {
        if (detail.productId === productId) {
          return { ...detail, quantity: detail.quantity !== 0 ? detail.quantity + value : 0 };
        }
        return detail;
      })
    }
    setOrder(newData)
    localStorage.setItem("order", JSON.stringify(newData));
  }

  const handleRemoveItem = (productId: number) => {
    const newData = order && {
      ...order,
      orderDetails: order.orderDetails.filter((item: any) => item.productId !== productId)
    }
    setOrder(newData);
    localStorage.setItem("order", JSON.stringify(newData));
  }

  const handleChangeProvinces = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const districts = await commonApi.getDistricts(e.target.value);
    setLoading(false);
    setDistricts(districts);
    setCommunes([]);
  }

  const handleChangeDistricts = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const communes = await commonApi.getCommunes(e.target.value);
    setLoading(false);
    setCommunes(communes);
  }

  const handleOrder = () => {
    if (isPaid) {
      setConfirm(true);
      return
    }
    const order: Order = {
      dateOfReceive: new Date(dateOfReceive),
      customerId: 1,
      discount: 0,
      totalPrice: totalPrice,
      note: note,
      isPaid: isPaid,
      orderDetails: orderDetails.map((detail: OrderDetail) => {
        return {
          productId: detail.productId,
          price: detail.price,
          quantity: detail.quantity
        }
      })
    }
    console.log(order);
  }

  return (
    <>
      {order &&
        <div className="bg-gray-50 p-5">
          <div className="container mx-auto" >
            <div className="flex shadow-md">
              <div className="w-3/5 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Giỏ hàng</h1>
                  <h2 className="font-semibold text-2xl">{orderDetails.length} Sản phẩm</h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Chi tiết đơn hàng</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Số lượng</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Giá</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Thành tiền</h3>
                </div>
                {
                  orderDetails.map((detail: any, index: number) => {
                    return (
                      <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={index}>
                        <div className="flex w-2/5" >
                          <div className="w-20">
                            <img className="h-24 m-auto" src={detail.productImage} alt="" />
                          </div>
                          <div className="flex flex-col justify-between ml-4 flex-grow">
                            <span className="font-bold text-sm">{detail.productName}</span>
                            <span className="text-red-500 text-xs">{detail.categoryName}</span>
                            <p
                              className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-xs"
                              onClick={() => handleRemoveItem(detail.productId)}
                            >Remove</p>
                          </div>
                        </div>
                        <div className="flex justify-center w-1/5">
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                            onClick={() => handleChangeQuantity(detail.productId, -1)}

                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                          <input className="mx-2 border text-center w-8" type="text" value={detail.quantity} />
                          <svg
                            className="fill-current text-gray-600 w-3 hover:cursor-pointer"
                            viewBox="0 0 448 512"
                            onClick={() => handleChangeQuantity(detail.productId, 1)}
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </div>
                        <span className="text-center w-1/5 font-semibold text-sm">{thousandSeparator(detail.price)} VND</span>
                        <span className="text-center w-1/5 font-semibold text-sm">{thousandSeparator(detail.quantity * detail.price)} VND</span>
                      </div>
                    )
                  })
                }
                <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                  <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                  Tiếp tục mua sắm
                </Link>
              </div>
              <div id="summary" className="w-2/5 px-8 py-10 bg-gray-100">
                <h1 className="font-semibold text-2xl border-b pb-8">Tóm tắt đơn hàng</h1>
                <div className="mb-3">
                  <label className="font-semibold inline-block text-sm uppercase my-2">Địa chỉ:</label>
                  <div className="flex flex-row">
                    <div className="w-1/3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tỉnh:</label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleChangeProvinces(e)}
                      >
                        {
                          provinces.map((option, index) => <option key={index} value={option.id}>{option.name}</option>)
                        }
                      </select>
                    </div>
                    <div className="w-1/3 mx-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Huyện:</label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleChangeDistricts(e)}
                      >
                        {
                          districts.map((option, index) => <option key={index} value={option.id}>{option.name}</option>)
                        }
                      </select>
                    </div>
                    <div className="w-1/3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xã:</label>
                      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {
                          communes.map((option, index) => <option key={index} value={option.id}>{option.name}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ chi tiết:</label>
                    <input type="input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-h-[40px]" placeholder="typing..." required />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-1/2 mr-2">
                    <label className="font-semibold inline-block mb-3 text-sm uppercase">Hình thức thanh toán</label>
                    <select
                      onChange={(e) => setIsPaid(+e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={0} selected>Tiền mặt</option>
                      <option value={1}>Chuyển khoản</option>
                    </select>
                  </div>
                  <div className="w-1/2 ml-2">
                    <label className="font-semibold inline-block mb-3 text-sm uppercase">Ngày giao hàng</label>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-h-[40px]" placeholder="John" required
                      value={dateOfReceive}
                      onChange={(e) => setDateOfReceive(e.target.value)}
                    // onChange={(e) => console.log(e.target.value)}

                    />
                  </div>
                </div>
                <div className="mt-3 w-full">
                  <label className="font-semibold inline-block mb-3 text-sm uppercase">Ghi Chú</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className="border-t mt-8">
                  <div className="flex justify-between mt-5">
                    <span className="font-semibold text-sm">Tổng tiền:</span>
                    <span className="font-semibold text-sm">{thousandSeparator(totalPrice)}VND</span>
                  </div>
                  <div className="flex justify-between mt-5">
                    <span className="font-semibold text-sm">Giảm giá:</span>
                    <span className="font-semibold text-sm">{thousandSeparator(discount)}VND</span>
                  </div>
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Thanh toán:</span>
                    <span>{thousandSeparator(totalPrice)}VND</span>
                  </div>
                  <button
                    className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                    onClick={handleOrder}
                  >Đặt Đơn</button>
                </div>
              </div>
            </div>
          </div>
        </div >
      }
      {
        loading && <CircularProgressCustom />
      }
      {
        confirm && <Modal />
      }
    </>
  )
}
