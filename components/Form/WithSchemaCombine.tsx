import { Button, Checkbox, Space, TextInput } from "@mantine/core";
import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import z from "zod";
import * as yup from "yup";
import { ResultBlock } from "../ResultBlock";

type FormExtendedOptions = {
  age: boolean;
  email: boolean;
};

const generateExtendedZodSchema = (options: FormExtendedOptions) => {
  const combinedSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    age: options.age ? z.number().int("Cannot be decimal").positive("Must be a positive number").min(16, "Must be at least 16 years old") : null,
    email: options.email ? z.string().email() : null,
  });

  return combinedSchema;
};

type CombinedSchemaZodType = z.infer<ReturnType<typeof generateExtendedZodSchema>>;

const generateExtendedYupSchema = (options: FormExtendedOptions) => {
  const combinedSchema = yup.object({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    age: options.age
      ? yup.number().typeError("Must be a number").integer("Cannot be decimal").positive("Must be a positive number").min(16, "Must be at least 16 years old")
      : null,
    email: options.email ? yup.string().email("Valid email required").required("Email is required required") : null,
  });

  return combinedSchema;
};

type CombinedSchemaYupType = yup.InferType<ReturnType<typeof generateExtendedYupSchema>>;

export const FormWithCombinedSchema = () => {
  const [formData, setFormData] = useState<CombinedSchemaYupType | undefined>();
  const [availableOptions, setAvailableOptions] = useState({
    age: false,
    email: false,
  });

  const combinedYupSchema = useMemo(() => generateExtendedYupSchema(availableOptions), [availableOptions]);
  const combinedZodSchema = useMemo(() => generateExtendedZodSchema(availableOptions), [availableOptions]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<CombinedSchemaYupType>({
    // resolver: zodResolver(combinedZodSchema),
    resolver: yupResolver(combinedYupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const handleValidSubmit: SubmitHandler<CombinedSchemaYupType> = (data) => {
    setFormData(data);
  };

  return (
    <>
      <Checkbox label="Age" checked={availableOptions.age} onChange={() => setAvailableOptions((current) => ({ ...current, age: !current.age }))} />
      <Checkbox label="Email" checked={availableOptions.email} onChange={() => setAvailableOptions((current) => ({ ...current, email: !current.email }))} />
      <Space h="xl" />
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <TextInput label="First Name" {...register("firstName")} error={errors.firstName?.message} />
        <Space h="md" />
        <TextInput label="Last Name" {...register("lastName")} error={errors.lastName?.message} />

        {availableOptions.age && (
          <>
            <Space h="md" />
            {/* NOTE: Zod requires the input to use valueAsNumber to actually pass number to it. Yup handles the "string" that HTML inputs return by default and validates it to confirm that it's a number */}
            <TextInput name="age" label="Age" {...register("age", { valueAsNumber: true })} error={errors.age?.message} />
          </>
        )}

        {availableOptions.email && (
          <>
            <Space h="md" />
            <TextInput name="email" label="Email" {...register("email")} error={errors.email?.message} />
          </>
        )}

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
