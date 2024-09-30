import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { useSignup } from "../../api/Signup";
import { SteppedForm } from "./SteppedForm";
import { FormValues } from "./schema";

type Props = {
  onSuccess: () => void;
};

// Component to be exported.
// Keep the code in this component short - it should serve as top level for smaller components
// export const Sample: React.FC<Props> = ({destructure props here}) => {...}
export const Signup: React.FC<Props> = ({ onSuccess }) => {
  const api = useSignup();
  const isApiRequestPending = api.isPending;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    await api.mutateAsync({
      data: { ...data.personalInfo, ...data.stepTwo },
    });
    onSuccess();
  };

  // TODO: define step titles here
  const stepTitles = ["Step One", "Step Two"];

  const { Form, SubmitButton, activeStep } = SteppedForm(
    onSubmit,
    isApiRequestPending,
    stepTitles.length
  );

  return (
    <Container>
      <Stepper activeStep={activeStep - 1} alternativeLabel>
        {stepTitles.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Form />
      {activeStep === stepTitles.length ? <SubmitButton /> : <></>}
    </Container>
  );
};
