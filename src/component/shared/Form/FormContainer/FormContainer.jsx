import { FormProvider } from "react-hook-form";

function FormContainer({ onSubmit, children, formMethods }) {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods?.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default FormContainer;
