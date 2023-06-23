import { Box, Button, Checkbox, FormControl, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextFieldValidate from "../Commons/TextFieldValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../validations";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const { t } = useTranslation();

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center container mx-auto my-[30px]"
    >
      <div className="flex justify-start w-full text-[40px] mb-3 font-semibold text-green-600">
        Liên hệ chúng tôi
      </div>
      <div className="grid grid-cols-2 w-full gap-x-6 rounded border border-green-600 px-4">
        <div className="flex flex-col gap-y-6 border-r border-green-500 px-2 pr-6 py-6">
          <TextFieldValidate
            control={control}
            errors={errors}
            name="name"
            label={t("contact.name")}
          />
          <TextFieldValidate
            control={control}
            errors={errors}
            name="email"
            label={t("contact.email")}
          />
          <TextFieldValidate
            control={control}
            errors={errors}
            name="phone"
            label={t("contact.phone")}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label={t('contact.content')}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                placeholder="Aa"
                {...field}
              />
            )}
          />
          <div className="flex items-center">
            <Controller
              name="check"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Checkbox {...field} />
                </FormControl>
              )}
            />
            Tôi đã đồng ý và đọc kỹ
            <Button
              type="submit"
              variant="contained"
              className="!bg-green-600 !text-white !ml-auto"
            >
              {t("contact.submit")}
            </Button>
          </div>
        </div>
        <div className="py-6 flex flex-col gap-y-4 text-[20px]">
          <div>
            Cảm ơn bạn đã quan tâm đến việc liên hệ với chúng tôi! Điền vào biểu
            mẫu và một thành viên trong nhóm của chúng tôi sẽ sớm liên lạc.
          </div>
          <div>
            <h1 className="font-bold text-green-600">ĐỊA CHỈ CỬA HÀNG:</h1>
            <p>162 Châu Thị Vĩnh Tế, Mỹ An, Ngũ Hành Sơn, Đà Nẵng</p>
          </div>
          <div>
            <h1 className="font-bold text-green-600">SỐ ĐIỆN THOẠI</h1>
            <p>+84 123456789 (Anh Nhật Quang)</p>
          </div>
          <div>
            <h1 className="font-bold text-green-600">THỜI GIAN MỞ CỬA</h1>
            <p>8:00 - 21:00 (từ Thứ Ba đến Chủ Nhật)</p>
          </div>
          <div className="mt-auto">
            <hr className="border-[1px] border-green-500" />
            <p className="font-bold text-green-600 pt-2">MẠNG XÃ HỘI</p>
          </div>
        </div>
      </div>
    </Box>
  );
};
