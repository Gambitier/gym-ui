import * as yup from "yup";
import { GenderEnum, PrefixEnum } from "../../api/types";

type StepOneFormValues = {
  prefix: PrefixEnum;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: GenderEnum;
};

type StepTwoFormValues = {
  password: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
};

const stepOneSchema: yup.ObjectSchema<StepOneFormValues> = yup.object().shape({
  prefix: yup.mixed<PrefixEnum>().oneOf(Object.values(PrefixEnum)).required(),
  gender: yup.mixed<GenderEnum>().oneOf(Object.values(GenderEnum)).required(),
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
});

const stepTwoSchema: yup.ObjectSchema<StepTwoFormValues> = yup.object().shape({
  password: yup.string().required(),
  dateOfBirth: yup.date().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

// TODO: use valid name for key & type of FormValues
export type FormValues = {
  personalInfo: StepOneFormValues;
  stepTwo: StepTwoFormValues;
};

export const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  personalInfo: stepOneSchema,
  stepTwo: stepTwoSchema,
});
