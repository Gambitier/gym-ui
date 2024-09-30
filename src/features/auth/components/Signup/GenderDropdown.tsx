import { SelectField } from "@/components/Elements";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { GenderEnum } from "../../api/types";
import { FormValues } from "./schema";

const mappings = {
  // TODO: add mappings
  // mappings is nothing but object of displayValue: (string or num)-Value/Enum.Variant
  // e.g.
  Male: GenderEnum.MALE,
  Female: GenderEnum.FEMALE,
  Other: GenderEnum.UNSPECIFIED,
  "Decline to specify": GenderEnum.UNSPECIFIED,
};

export const GenderDropdown: React.FC<{
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}> = ({ register, errors }) => {
  // TODO: set default value
  // valid defaultValue is - a key from mappings object defined as above
  const defaultValue =
    mappings[Object.keys(mappings)[0] as keyof typeof mappings];

  const Component = () => {
    return (
      <SelectField
        label="LABEL"
        registration={register("personalInfo.gender")}
        formError={errors.personalInfo?.gender}
        defaultValue={defaultValue}
        options={Object.entries(mappings).map(([displayValue, value]) => ({
          label: displayValue,
          value: value,
        }))}
      />
    );
  };

  return <Component />;
};
