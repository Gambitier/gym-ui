import { Button } from "@/components/Elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import * as yup from "yup";
import { useLogin } from "../../api";

// step 1: add type for form
export type FormValues = {
  email: string;
  password: string;
};

// stpe 2: write schema (validations) for FormType
const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6, "Password should have at least 6 characters"),
});

// step 3: create fn useFormWithValidation
const useFormWithValidation = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return form;
};

// step 4: define the form component
const LoginForm = (
  onSubmit: SubmitHandler<FormValues>,
  isApiRequestPending: boolean
) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    control: _hookFormControl,
  } = useFormWithValidation();
  const { errors, isDirty, isValid, isSubmitSuccessful } = formState;
  const formId = v4();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const SubmitButton = () => (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={!isDirty || !isValid || isApiRequestPending}
      form={formId}
      isLoading={isApiRequestPending}
    >
      Submit
    </Button>
  );

  const Form = () => (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message ?? ""}
        />

        <TextField
          label="Password"
          variant="outlined"
          required
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message ?? ""}
        />

        <SubmitButton />
      </Box>
    </form>
  );

  return { SubmitButton, Form };
};

// step 5: add component prop type.
// These Props are passed from routes or other calling components
type Props = {
  onSuccess: () => void;
};

// step 6: Component to be exported.
// Keep the code in this component short - it should serve as top level for smaller components
// export const Sample: React.FC<Props> = ({destructure props here}) => {...}
export const Login: React.FC<Props> = ({ onSuccess }) => {
  const api = useLogin();
  const isApiRequestPending = api.isPending;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    await api.mutateAsync({
      data: data,
    });
    onSuccess();
  };

  const { Form } = LoginForm(onSubmit, isApiRequestPending);

  return (
    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
    >
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Form />
    </Stack>
  );
};
