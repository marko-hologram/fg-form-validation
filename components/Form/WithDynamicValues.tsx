import { Button, Space, TextInput } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import z from "zod";
import * as yup from "yup";
import { ResultBlock } from "../ResultBlock";

const createDynamicZodSchema = (minPeople: number) => {
  const peopleText = minPeople === 1 ? "person" : "people";

  return z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().min(1, "First name is required"),
    numberOfPeople: z.number({ invalid_type_error: "Must be a number" }).min(minPeople, `Minimum of ${minPeople} ${peopleText} required`),
  });
};

type BasicZodSchemaType = z.infer<ReturnType<typeof createDynamicZodSchema>>;

const createDynamicYupSchema = (minPeople: number) => {
  const peopleText = minPeople === 1 ? "person" : "people";

  return yup.object({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().required("First name is required"),
    numberOfPeople: yup.number().typeError("Must be a number").min(minPeople, `Minimum of ${minPeople} ${peopleText} required`),
  });
};

type BasicYupSchemaType = yup.InferType<ReturnType<typeof createDynamicYupSchema>>;

type FormWithSchema = {
  minNumberOfPeople: number;
};

export const FormWithDynamicSchema = ({ minNumberOfPeople }: FormWithSchema) => {
  const [formData, setFormData] = useState<BasicYupSchemaType | undefined>();

  const dynamicYupSchema = useMemo(() => createDynamicYupSchema(minNumberOfPeople), [minNumberOfPeople]);
  const dynamicZodSchema = useMemo(() => createDynamicZodSchema(minNumberOfPeople), [minNumberOfPeople]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useForm<BasicYupSchemaType>({
    // resolver: zodResolver(dynamicZodSchema),
    resolver: yupResolver(dynamicYupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      numberOfPeople: 0,
    },
  });

  useEffect(() => {
    if (isSubmitted && minNumberOfPeople) {
      trigger();
    }
  }, [isSubmitted, minNumberOfPeople, trigger]);

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
        <TextInput label="Number of people" {...register("numberOfPeople")} error={errors.numberOfPeople?.message} />
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
