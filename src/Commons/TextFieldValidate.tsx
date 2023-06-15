import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextFieldValidate = (props: any) => {
  const { control, errors, name, label, type = "text", size = "medium", defaultValue = "", sx } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            sx={sx}
            type={type}
            label={label}
            variant="outlined"
            fullWidth
            size={size}
            error={Boolean(errors[name])}
            helperText={errors[name]?.message}
            {...field}
          />
        )}
      />
    </>
  )
}

export default TextFieldValidate;
