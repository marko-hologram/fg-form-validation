import { Button, Checkbox, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import z from "zod";
import * as yup from "yup";
import { ResultBlock } from "../ResultBlock";

const basicZodSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().min(1, "First name is required"),
  // Cannot easily specify an error message when this is not checked. We get a generic message that says "Invalid literal value, expected true". Maybe with a custom ZodErrorMap (errorMap property) we could achieve this
  usePersonalData: z.literal(true, { required_error: "Required error text", invalid_type_error: "You must accept this" }),
});

type BasicZodSchemaType = z.infer<typeof basicZodSchema>;

const basicYupSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().required("First name is required"),
  // Easy to validate required checkbox (true/false) inputs
  usePersonalData: yup.boolean().oneOf([true], "You must accept this"),
});

type BasicYupSchemaType = yup.InferType<typeof basicYupSchema>;

export const FormWithSchema = () => {
  const [formData, setFormData] = useState<BasicYupSchemaType | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<BasicYupSchemaType>({
    // resolver: zodResolver(basicZodSchema),
    resolver: yupResolver(basicYupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      // With Zod schema we cannot set usePersonalData to false by default. Works with Yup
      usePersonalData: false,
    },
  });

  const handleValidSubmit: SubmitHandler<BasicYupSchemaType> = (data) => {
    setFormData(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <TextInput label="First Name" {...register("firstName")} error={errors.firstName?.message} />
        <Space h="md" />
        <TextInput label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
        <Space h="md" />
        <Checkbox label="Yes I want you to harvest all my personal data" {...register("usePersonalData")} error={errors.usePersonalData?.message} />
        <Space h="md" />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
      {isSubmitSuccessful && (
        <>
          <Space h="md" />
          <ResultBlock>{JSON.stringify(formData, null, 2)}</ResultBlock>
        </>
      )}
    </>
  );
};
