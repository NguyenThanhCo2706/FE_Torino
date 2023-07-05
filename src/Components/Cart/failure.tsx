import { useTranslation } from "react-i18next";

import DangerousIcon from '@mui/icons-material/Dangerous';

const Failure = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full max-w-[800px] mx-auto flex flex-col text-green-700 items-center text-center justify-center gap-y-6 my-10">
        <DangerousIcon
          sx={{ fontSize: "80px" }}
          style={{
            color: "red",
          }}
        />
        <h1 className="font-bold text-[40px] ">{t('payment.failure')}</h1>
        <div className="h-[200px]">
        </div>
      </div>
    </>
  )
}

export default Failure;
