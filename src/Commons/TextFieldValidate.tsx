import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextFieldValidate = (props: any) => {
  const { control, errors, name, label, type = "text", size = "medium" } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            type={type}
            label={label}
            variant="outlined"
            required
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
