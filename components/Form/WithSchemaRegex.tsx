import { Button, PasswordInput, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import z from "zod";
import * as yup from "yup";
import { ResultBlock } from "../ResultBlock";

const regexZodSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().min(1, "First name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string(),
    passwordWithRegex: z
      .string()
      .regex(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character"
      ),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

type RegexZodSchemaType = z.infer<typeof regexZodSchema>;

const regexYupSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().required("First name is required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .oneOf([yup.ref("password")], "Passwords don't match."),
  passwordWithRegex: yup
    .string()
    .required("Password pattern is required")
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character"
    ),
});

type RegexYupSchemaType = yup.InferType<typeof regexYupSchema>;

export const FormWithSchemaRegex = () => {
  const [formData, setFormData] = useState<RegexYupSchemaType | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<RegexYupSchemaType>({
    // resolver: zodResolver(regexZodSchema),
    resolver: yupResolver(regexYupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",
      passwordWithRegex: "",
    },
  });

  const handleValidSubmit: SubmitHandler<RegexYupSchemaType> = (data) => {
    setFormData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <TextInput label="First Name" {...register("firstName")} error={errors.firstName?.message} />
        <Space h="md" />
        <TextInput label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
        <Space h="md" />
        <PasswordInput label="Password" {...register("password")} error={errors.password?.message} />
        <Space h="md" />
        <PasswordInput label="Repeat password" {...register("repeatPassword")} error={errors.repeatPassword?.message} />
        <Space h="md" />
        <PasswordInput label="Password pattern" {...register("passwordWithRegex")} error={errors.passwordWithRegex?.message} />
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
