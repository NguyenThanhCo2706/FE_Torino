import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectFieldValidate = (props: any) => {
  const { control, errors, name, label, options, defaultValue = "", value } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormControl
            fullWidth
            size="small"
            error={Boolean(errors[name])}
            {...field}
          >
            <InputLabel id="demo-simple-select-small-label">{label}</InputLabel>
            <Select
              labelId="demo-simple-select-small-label"
              id="demo-simple-select"
              defaultValue={defaultValue}
              label={label}
              {...field}
            >
              {
                options.map((option: any, index: number) => (
                  <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                ))
              }
            </Select>
            {Boolean(errors[name]) && <FormHelperText>{errors[name]?.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  )
}

export default SelectFieldValidate;
