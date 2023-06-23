import { Link } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import moment from "moment"
import { useDispatch } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"

import { thousandSeparator } from "../../utils"
import commonApi from "../../api/commonApi"
import { AddressOption } from "../../types"
import { initOrder } from "../../utils/common"
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom"
import { Modal } from "../../Commons/Modal"
import { useTranslation } from "react-i18next"
import SelectFieldValidate from "../../Commons/SelectFieldValidate"
import { createOrder } from "../../validations"
import TextFieldValidate from "../../Commons/TextFieldValidate"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { orderDetailActions } from "../../redux/reducers/orderDetailSlice"

export const Cart = () => {
  const { orderDetails } = useSelector((state: RootState) => state.orderDetail)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [districts, setDistricts] = useState<AddressOption[]>([]);
  const [communes, setCommunes] = useState<AddressOption[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { t } = useTranslation();

  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(createOrder),
  });
  console.log(errors);

  useEffect(() => {
    commonApi.getDistricts("48").then((data) => {
      setDistricts(data);
    }).catch(err => {
      alert(err);
      initOrder();
    });

  }, []);

  useEffect(() => {
    setTotalPrice(orderDetails.reduce((prev: number, cur: any) => prev + cur.quantity * cur.price, 0));
  }, [orderDetails]);

  const handleChangeQuantity = (productId: number, value: number) => {
    dispatch(orderDetailActions.changeQuantityOrderDetail({
      productId: productId,
      value: value
    }))
  }

  const handleRemoveItem = (productId: number) => {
    const newDetails = orderDetails.filter((item) => item.productId !== productId);
    dispatch(orderDetailActions.setOrderDetails(newDetails));
  }

  const onSubmit = () => {
    setConfirm(true);
  }

  const districtId = watch("address.districtId");
  const receiveType = watch("receiveType");
  console.log(receiveType);

  useEffect(() => {
    setValue("address.communeId", "");
    setLoading(true);
    districtId && commonApi.getCommunes(districtId).then((data) => {
      setCommunes(data);
    });
    setLoading(false);
  }, [districtId])

  return (
    <>
      <div className="bg-gray-50 p-5">
        <div className="container mx-auto" >
          <div className="flex shadow-md">
            <div className="w-3/5 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">{t('cart.cart')}</h1>
                <h2 className="font-semibold text-2xl">{orderDetails.length} {t('cart.product')}</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">{t('cart.detailOrder')}</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">{t('cart.quantity')}</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">{t('cart.price')}</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">{t('cart.totalPrice')}</h3>
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
                          >{t('cart.remove')}</p>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <svg
                          className="fill-current text-gray-600 w-3 hover:cursor-pointer"
                          viewBox="0 0 448 512"
                          onClick={() => handleChangeQuantity(detail.productId, -1)}
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                        <input className="mx-2 border text-center w-8" type="text" value={detail.quantity} readOnly />
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
                {t('cart.back')}
              </Link>
            </div>
            <div id="summary" className="w-2/5 px-8 py-10 bg-gray-100">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-semibold text-2xl border-b pb-8">{t('cart.summaryOrder')}</h1>
                <div className="mb-3">
                  <div className="">
                    <SelectFieldValidate
                      control={control}
                      errors={errors}
                      name="receiveType"
                      label={t('cart.receiveType')}
                      options={[{ id: '0', name: t('cart.store') }, { id: '1', name: t('cart.ship') }]}
                      defaultValue={'0'}
                    />
                  </div>
                </div>
                {
                  +receiveType === 1 &&
                  <div className="mb-3">
                    <label className="font-semibold inline-block text-sm uppercase my-2">{t('cart.address')}</label>
                    <div className="py-2">
                      <div className="flex flex-row mb-5">
                        <div className="w-1/3">
                          <SelectFieldValidate
                            control={control}
                            errors={errors}
                            name="address.provinceId"
                            label={t('cart.province')}
                            options={[{ id: '48', name: "Đà Nẵng" }]}
                            defaultValue={'48'}
                          />
                        </div>
                        <div className="w-1/3 mx-3">
                          <SelectFieldValidate
                            control={control}
                            errors={errors}
                            name="address.districtId"
                            label={t('cart.district')}
                            options={districts}
                          />
                        </div>
                        <div className="w-1/3">
                          <SelectFieldValidate
                            control={control}
                            errors={errors}
                            name="address.communeId"
                            label={t('cart.commune')}
                            options={communes}
                          />
                        </div>
                      </div>
                      <div>
                        <TextFieldValidate
                          control={control}
                          errors={errors}
                          name={"address.detailAddress"}
                          label={t('cart.addressDetail')}
                          size="small"
                        />
                      </div>
                    </div>
                  </div>

                }

                <div className="flex flex-row">
                  <div className="w-1/2 mr-2">
                    <label className="font-semibold inline-block mb-3 text-sm uppercase truncate">{t('cart.paymentType')}</label>
                    <SelectFieldValidate
                      control={control}
                      errors={errors}
                      name={"status"}
                      label={t('cart.paymentType')}
                      size="small"
                      defaultValue={1}
                      options={
                        [
                          { id: 1, name: t('cart.money') },
                          { id: 4, name: t('cart.bank') }
                        ]
                      }
                    />
                  </div>
                  <div className="w-1/2 ml-2">
                    <label className="font-semibold inline-block mb-3 text-sm uppercase truncate">{t('cart.dateOfReceive')}</label>
                    <TextFieldValidate
                      control={control}
                      errors={errors}
                      name={"dateOfReceive"}
                      label={t('cart.dateOfReceive')}
                      size="small"
                      type="date"
                      defaultValue={moment().format("YYYY-MM-DD")}
                    />
                  </div>
                </div>
                <div className="mt-3 w-full">
                  <Controller
                    name="note"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label={t('cart.note')}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Aa"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="border-t mt-8">
                  <div className="flex justify-between mt-3">
                    <span className="font-semibold text-sm">{t('cart.totalPrice')}</span>
                    <span className="font-semibold text-sm">{thousandSeparator(totalPrice)} VND</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="font-semibold text-sm">{t('cart.discount')}</span>
                    <span className="font-semibold text-sm">{thousandSeparator(0)} VND</span>
                  </div>
                  <div className="flex font-semibold justify-between py-3 text-sm uppercase">
                    <span>{t('cart.totalAmount')}</span>
                    <span>{thousandSeparator(totalPrice)} VND</span>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, p: "10px" }}
                    disabled={orderDetails.length === 0 ? true : false}
                  >
                    {t('cart.submit')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
      {
        loading && <CircularProgressCustom />
      }
      {
        confirm && <Modal
          setConfirm={setConfirm}
          setLoading={setLoading}
          order={{ ...watch(), orderDetails: orderDetails }} />
      }
    </>
  )
}
