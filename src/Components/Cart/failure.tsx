import { useTranslation } from "react-i18next";

const Failure = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className=" flex justify-center my-3">
        <img
          className="text-center w-[250px]"
          src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png"
          alt="" />
      </div>
      <p className="text-center text-3xl font-semibold my-4">{t('payment.failure')}</p>

      <div className="h-[200px]">

      </div>
    </>
  )
}

export default Failure;
