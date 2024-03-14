import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useForm } from "react-hook-form";

import { FormTextField } from "app/components/FormTextField";
import {
  MAXIMUM_10_ERROR_MESSAGE,
  MAXIMUM_10_RULE,
  MINIMUM_0_ERROR_MESSAGE,
  MINIMUM_1_RULE,
} from "app/components/NumberGuesser/NumberGuesser";
import { REQUIRED_RULE } from "app/utilities";

describe("test FormTextField", () => {
  const numberFieldName = "myNumberField";

  function getUseFormResults() {
    return renderHook(() =>
      useForm({
        defaultValues: {
          myNumberField: 0,
        },
        mode: "onChange",
      }),
    ).result.current;
  }

  test("renders the correct name", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
      />,
    );

    expect(screen.getByRole("spinbutton")).toHaveAttribute(
      "name",
      numberFieldName,
    );
  });

  test("renders the correct label", () => {
    const numberFieldLabel = "Search Criteria";

    render(
      <FormTextField
        control={getUseFormResults().control}
        label={numberFieldLabel}
        name={numberFieldName}
      />,
    );

    expect(screen.getByLabelText(numberFieldLabel)).toBeInTheDocument();
  });

  test("renders the correct placeholder", () => {
    const placeholder = "1 - 10";

    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
        placeholder={placeholder}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test("renders a spinbutton by default", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
      />,
    );

    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
  });

  test("renders a spinbutton that is not disabled", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
      />,
    );

    expect(screen.getByRole("spinbutton")).not.toBeDisabled();
  });

  test("renders a required spinbutton", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
        rules={REQUIRED_RULE}
      />,
    );

    expect(screen.getByRole("spinbutton")).toBeRequired();
  });

  test("renders a spinbutton with the correct default value", async () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
      />,
    );

    expect(screen.getByRole("spinbutton")).toHaveValue(null);
  });

  test("the default value is reflected in RHF", async () => {
    const { control, getValues } = getUseFormResults();

    render(<FormTextField control={control} name={numberFieldName} />);

    expect(getValues(numberFieldName)).toEqual(0);
  });

  test("changing the value of the spinbutton is reflected in RHF as a number", async () => {
    const { control, getValues } = getUseFormResults();
    const user = userEvent.setup();
    const value = "ts3ti4ng";

    render(<FormTextField control={control} name={numberFieldName} />);

    await user.type(screen.getByRole("spinbutton"), value);
    expect(getValues(numberFieldName)).toEqual(34);
  });

  test("renders the correct error message when the value is greater than the max", async () => {
    const user = userEvent.setup();

    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
        rules={MAXIMUM_10_RULE}
      />,
    );

    expect(
      screen.queryByText(MAXIMUM_10_ERROR_MESSAGE),
    ).not.toBeInTheDocument();
    await user.type(screen.getByRole("spinbutton"), "ts3ti4ng");
    expect(screen.getByText(MAXIMUM_10_ERROR_MESSAGE)).toBeInTheDocument();
  });

  test("renders the correct error message when the value is less than the min", async () => {
    const user = userEvent.setup();

    render(
      <FormTextField
        control={getUseFormResults().control}
        name={numberFieldName}
        rules={MINIMUM_1_RULE}
      />,
    );

    const numberField = screen.getByRole("spinbutton");

    expect(screen.queryByText(MINIMUM_0_ERROR_MESSAGE)).not.toBeInTheDocument();
    await user.type(numberField, "ts3ti4ng");
    await user.clear(numberField);
    expect(screen.getByText(MINIMUM_0_ERROR_MESSAGE)).toBeInTheDocument();
  });
});
