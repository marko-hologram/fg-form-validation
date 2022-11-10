import { Button, Checkbox, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ResultBlock } from "../ResultBlock";

type BasicFormData = {
  firstName: string;
  lastName: string;
  usePersonalData: boolean;
};

export const BasicForm = () => {
  const [formData, setFormData] = useState<BasicFormData | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<BasicFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      usePersonalData: false,
    },
  });

  const handleValidSubmit: SubmitHandler<BasicFormData> = (data) => {
    setFormData(data);
  };

  if (isSubmitSuccessful) {
    return <ResultBlock>{JSON.stringify(formData, null, 2)}</ResultBlock>;
  }

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <TextInput
        label="First Name"
        {...register("firstName", {
          required: "First name is required",
          minLength: {
            message: "First name must contain at least three characters",
            value: 3,
          },
        })}
        error={errors.firstName?.message}
      />
      <Space h="md" />
      <TextInput label="Last Name" {...register("lastName", { required: "Last name is required" })} error={errors.lastName?.message} />
      <Space h="md" />
      <Checkbox
        label="Yes I want you to harvest all my personal data"
        {...register("usePersonalData", { required: "You must accept this" })}
        error={errors.usePersonalData?.message}
      />
      <Space h="md" />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
