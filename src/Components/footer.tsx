import TextFieldValidate from "../Commons/TextFieldValidate"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../validations";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const { t } = useTranslation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = () => {

  }

  return (
    <footer className=" bg-[#517A4D] text-white">
      <div className="container mx-auto pt-5">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-1/3 sm:w-full sm:border-b">
            <div>
              <h1 className="uppercase font-semibold text-[20px]">{t("footer.openingHour")}</h1>
              <div className="my-2">
                <p>08:00 - 21:00</p>
                <p>{t("footer.openingDetail")}</p>
              </div>
            </div>
            <div>
              <h1 className="uppercase font-semibold text-[20px]">{t("footer.location")}</h1>
              <div className="my-2">
                <p>{t("footer.locationDetail")}</p>
              </div>
            </div>
            <div>
              <h1 className="uppercase font-semibold text-[20px]">{t("footer.phone")}</h1>
              <div className="my-2">
                <p>+84 1234567890 (Mr.Tran Nhan Quang)</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 sm:w-full flex flex-row sm:border-b">
            <div className="w-1/3">
              <h1 className="uppercase font-semibold text-[20px]">{t("footer.company")}</h1>
              <div className="my-2">
                <p>{t("footer.ourStory")}</p>
                <p>{t("footer.careers")}</p>
              </div>
            </div>
            <div className="w-1/3">
              <h1 className="uppercase font-semibold text-[20px]">{t("footer.ourMenu")}</h1>
              <div className="my-2">
                {
                  categories.map((category) => <p><Link to={`/product/category/${category.id}`}>{category.name}</Link></p>)
                }
              </div>
            </div>
            <div className="w-1/3">
              <h1 className="uppercase font-semibold text-[20px]">{t("footer.help")}</h1>
              <div className="my-2">
                <p>FAQ</p>
                <p>{t("footer.contact")}</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 sm:w-full ">
            <h1 className="uppercase font-semibold text-[20px]">{t("footer.inbox")}</h1>
            <div className="my-2">
              <p>{t("footer.inboxDetail")}</p>
              <p>{t("footer.mail")}</p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row mt-3">
                <TextFieldValidate
                  control={control}
                  errors={errors}
                  name={"email"}
                  label="email"
                  size="small"
                  sx={{
                    "& .MuiFormLabel-root": {
                      color: 'white'
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: 'white'
                    },
                    "& input": {
                      color: 'white'
                    },
                    "& .MuiOutlinedInput-root": {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginLeft: "10px" }}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap border-t-2 py-3">
          <div className="w-1/2">
            <div>
              Opportunity For All
              <span className="mx-2">|</span>
              Terms Of Use
              <span className="mx-2">|</span>
              Accessibility
            </div>
            <div>
              VietNam Supply Chain Act
              <span className="mx-2">|</span>
              Cookie Notice
              <span className="mx-2">|</span>
              Private Policy
            </div>
          </div>
          <div className="w-1/2 text-right">
            <div className="">
              oooo
            </div>
            <div>
              Ls Torino Bakery. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
