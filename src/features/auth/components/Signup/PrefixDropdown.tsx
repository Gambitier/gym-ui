import { SelectField } from "@/components/Elements";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PrefixEnum } from "../../api/types";
import { FormValues } from "./schema";

const mappings = {
  Mr: PrefixEnum.MR,
  Mrs: PrefixEnum.MRS,
  Miss: PrefixEnum.MISS,
};

type MappingsKeys = keyof typeof mappings;

export const PrefixDropdown: React.FC<{
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}> = ({ register, errors }) => {
  const defaultValue = mappings[Object.keys(mappings)[0] as MappingsKeys];

  const Component = () => {
    return (
      <SelectField
        label="Prefix"
        registration={register("personalInfo.prefix")}
        formError={errors.personalInfo?.prefix}
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
