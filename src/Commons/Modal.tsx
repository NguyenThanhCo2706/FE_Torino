import { useTranslation } from "react-i18next";
import commonApi from "../api/commonApi";
import orderApi from "../api/orderApi";
import { toast } from "react-toastify";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderDetailActions } from "../redux/reducers/orderDetailSlice";

interface ModalProps {
  setConfirm: Function;
  order: any;
  setLoading: any;
}

export const Modal = (props: ModalProps) => {
  const { setConfirm, order, setLoading } = props;
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOrder = async () => {
    order.dateOfReceive = new Date(order.dateOfReceive + " " + order.timeOfReceive + ":00")
    delete order.timeOfReceive;
    if (!user) {
      return navigate("/login");
    }
    setLoading(true);
    if (order.type === "1") {
      delete order.address;
    }
    order && await orderApi.create(order).then(async (response) => {
      if (response.data.CreatedDate) {
        if (order.status) {
          const url = await commonApi.payment(response.data.id, `${window.location.origin}/payment`);
          window.location.href = String(url);
        }
      }
      dispatch(orderDetailActions.setOrderDetails([]))
      toast.success(t("message.order.successOrder"))
    }).catch(() => {
      toast.error(t("message.order.failOrder"))
    })
    setConfirm(false);
    setLoading(false);
  }

  return (
    <>
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
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{t('vnpay.title')}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{t('vnpay.content')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleOrder}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold hover:bg-blue-700 text-white shadow-sm  sm:ml-3 sm:w-auto"
                >{t('vnpay.confirm')}</button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                  onClick={() => setConfirm(false)}
                >{t('vnpay.cancel')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
