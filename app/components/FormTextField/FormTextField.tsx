import { ChangeEvent } from "react";

// eslint-disable-next-line import/named
import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type FormTextFieldProps<T extends FieldValues> = Pick<
  TextFieldProps,
  "helperText" | "label" | "placeholder"
> &
  Omit<UseControllerProps<T>, "defaultValue" | "disabled" | "shouldUnregister">;

export function FormTextField<T extends FieldValues>({
  control,
  // https://mui.com/material-ui/react-text-field/#helper-text
  helperText = " ",
  label,
  name,
  placeholder,
  rules,
}: FormTextFieldProps<T>) {
  const {
    field: { onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  function computeHtmlValue() {
    return value !== 0 ? value : "";
  }

  function handleOnChange({ target }: ChangeEvent<HTMLInputElement>) {
    onChange(isNaN(target.valueAsNumber) ? 0 : target.valueAsNumber);
  }

  return (
    <TextField
      error={!!error}
      fullWidth
      helperText={error?.message ?? helperText}
      inputRef={ref}
      label={label}
      name={name}
      onChange={handleOnChange}
      placeholder={placeholder}
      required={!!rules?.required}
      type="number"
      value={computeHtmlValue()}
    />
  );
}
