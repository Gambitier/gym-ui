import { AppDatePicker, WizardStepProps } from "@/components/Elements";
import { Box, TextField } from "@mui/material";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./schema";

export const WizardStepTwoForm = forwardRef((_: WizardStepProps, _ref) => {
  const {
    control: _hookFormControl,
    formState,
    register,
    getValues,
  } = useFormContext<FormValues>();
  const { errors } = formState;

  return (
    <Box>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        {...register("stepTwo.email")}
        error={!!errors.stepTwo?.email}
        helperText={errors.stepTwo?.email?.message ?? ""}
      />

      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        {...register("stepTwo.password")}
        error={!!errors.stepTwo?.password}
        helperText={errors.stepTwo?.password?.message ?? ""}
      />

      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        {...register("stepTwo.phone")}
        error={!!errors.stepTwo?.phone}
        helperText={errors.stepTwo?.phone?.message ?? ""}
      />

      <AppDatePicker
        control={_hookFormControl}
        name={"stepTwo.dateOfBirth"}
        datePickerProps={{
          label: "Date of Birth",
          value: getValues("stepTwo.dateOfBirth") || null,
        }}
        errorHandlingProps={{
          formError: errors.stepTwo?.dateOfBirth,
        }}
      />
    </Box>
  );
});
