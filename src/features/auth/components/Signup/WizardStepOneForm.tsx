import { WizardStepProps } from "@/components/Elements";
import { Box, Button, TextField } from "@mui/material";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { GenderDropdown } from "./GenderDropdown";
import { PrefixDropdown } from "./PrefixDropdown";
import { FormValues } from "./schema";

export const WizardStepOneForm = forwardRef(
  ({ onSuccessValidation }: WizardStepProps, _ref) => {
    const {
      control: _hookFormControl,
      formState,
      trigger,
      register,
    } = useFormContext<FormValues>();
    const { errors } = formState;

    const onNext = async () => {
      // Triggers only the validation schema for this wizard-step/section
      const isValid = await trigger("personalInfo");
      if (isValid) {
        onSuccessValidation();
      }
    };

    return (
      <Box>
        <PrefixDropdown register={register} errors={errors} />
        <GenderDropdown register={register} errors={errors} />

        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          {...register("personalInfo.firstName")}
          error={!!errors.personalInfo?.firstName}
          helperText={errors.personalInfo?.firstName?.message ?? ""}
        />

        <TextField
          label="Middle Name"
          variant="outlined"
          fullWidth
          {...register("personalInfo.middleName")}
          error={!!errors.personalInfo?.middleName}
          helperText={errors.personalInfo?.middleName?.message ?? ""}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          {...register("personalInfo.lastName")}
          error={!!errors.personalInfo?.lastName}
          helperText={errors.personalInfo?.lastName?.message ?? ""}
        />

        <Button onClick={onNext}>Next</Button>
      </Box>
    );
  }
);
