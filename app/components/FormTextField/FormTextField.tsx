import { ChangeEvent } from "react";

// eslint-disable-next-line import/named
import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type FormTextFieldOwnProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: () => void;
};
type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  | "disabled"
  | "error"
  | "fullWidth"
  | "onBlur"
  | "onChange"
  | "required"
  | "type"
  | "value"
> &
  Omit<UseControllerProps<T>, "disabled"> &
  FormTextFieldOwnProps;

export function FormTextField<T extends FieldValues>({
  control,
  // https://mui.com/material-ui/react-text-field/#helper-text
  helperText = " ",
  isDisabled = false,
  isRequired = false,
  name,
  onChange = undefined,
  rules,
  ...rest
}: FormTextFieldProps<T>) {
  const {
    field: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      disabled: isReactHookFormFieldDisabled,
      onChange: reactHookFormOnChange,
      ref,
      value,
      ...field
    },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    control,
    name,
    rules,
  });

  function computeHtmlValue() {
    value !== 0 ? value : "";
  }

  function handleOnChange({ target }: ChangeEvent<HTMLInputElement>) {
    reactHookFormOnChange(
      isNaN(target.valueAsNumber) ? 0 : target.valueAsNumber,
    );

    if (onChange) onChange();
  }

  return (
    <TextField
      disabled={isDisabled || isSubmitting}
      error={!!error}
      fullWidth
      helperText={error?.message ?? helperText}
      inputRef={ref}
      onChange={handleOnChange}
      required={isRequired || !!rules?.required}
      type="number"
      value={computeHtmlValue()}
      {...field}
      {...rest}
    />
  );
}
