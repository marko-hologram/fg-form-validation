import { Button, Checkbox, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import z from "zod";
import * as yup from "yup";
import { ResultBlock } from "../ResultBlock";

const conditionalZodSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().min(1, "First name is required"),
    age: z
      .number({ invalid_type_error: "Must be a number" })
      .int("Cannot be decimal")
      .positive("Must be a positive number")
      .min(16, "Must be at least 16 years old"),
    sendMessage: z.boolean(),
    messageEmailAddress: z.string().email(),
  })
  .refine((data) => {
    if (data.sendMessage) {
      const parsedValue = z.string().email().safeParse(data.messageEmailAddress);
      return parsedValue.success;
    } else {
      return true;
    }
  });

type ConditionalZodSchemaType = z.infer<typeof conditionalZodSchema>;

const conditionalYupSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().required("First name is required"),
  age: yup.number().typeError("Must be a number").integer("Cannot be decimal").positive("Must be a positive number").min(16, "Must be at least 16 years old"),
  sendMessage: yup.boolean(),
  messageEmailAddress: yup.string().when("sendMessage", {
    is: true,
    then: (property) => property.email("Valid email required").required("Message recipient required"),
  }),
});

type ConditionalYupSchemaType = yup.InferType<typeof conditionalYupSchema>;

export const FormWithConditionalSchema = () => {
  const [formData, setFormData] = useState<ConditionalYupSchemaType | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ConditionalYupSchemaType>({
    // resolver: zodResolver(conditionalZodSchema),
    resolver: yupResolver(conditionalYupSchema),
    defaultValues: {
      age: undefined,
      firstName: "",
      lastName: "",
      sendMessage: false,
      messageEmailAddress: "",
    },
  });

  const handleValidSubmit: SubmitHandler<ConditionalYupSchemaType> = (data) => {
    setFormData(data);
  };

  const isMessageEmailFieldVisible = watch("sendMessage");

  if (isSubmitSuccessful) {
    return <ResultBlock>{JSON.stringify(formData)}</ResultBlock>;
  }

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <TextInput label="First Name" {...register("firstName")} error={errors.firstName?.message} />
      <Space h="md" />
      <TextInput label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
      <Space h="md" />
      <TextInput label="Age" {...register("age")} error={errors.age?.message} />
      <Space h="md" />
      <Checkbox label="Send email notification" {...register("sendMessage")} />
      <Space h="md" />
      {isMessageEmailFieldVisible && <TextInput {...register("messageEmailAddress")} error={errors.messageEmailAddress?.message} />}
      <Space h="md" />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
