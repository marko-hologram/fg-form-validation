import { Button, Checkbox, Space, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import z from "zod";
import * as yup from "yup";
import { ResultBlock } from "../ResultBlock";
import { useTranslation } from "next-i18next";

const basicYupSchema = yup.object({
  firstName: yup.string().trim().required("FormError.FirstNameRequired"),
  lastName: yup.string().required("FormError.LastNameRequired"),
  age: yup.number().typeError("Must be a number").positive("Must be a positive number").min(16, "Must be at least 16 years old"),
  sendMessage: yup.boolean(),
  messageEmailAddress: yup.string().when("sendMessage", {
    is: true,
    then: yup.string().email("Valid email required").required("Email recipient required"),
    otherwise: yup.string(),
  }),
});

type BasicYupSchemaType = yup.InferType<typeof basicYupSchema>;

export const FormWithTranslationSchema = () => {
  const [formData, setFormData] = useState<BasicYupSchemaType | undefined>();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<BasicYupSchemaType>({
    // resolver: zodResolver(basicZodSchema),
    resolver: yupResolver(basicYupSchema),
    defaultValues: {
      age: undefined,
      firstName: "",
      lastName: "",
      sendMessage: false,
      messageEmailAddress: "",
    },
  });

  const handleValidSubmit: SubmitHandler<BasicYupSchemaType> = (data) => {
    setFormData(data);
  };

  const isMessageEmailFieldVisible = watch("sendMessage");

  return (
    <>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <TextInput label="First Name" {...register("firstName")} error={t(errors.firstName?.message)} />
        <Space h="md" />
        <TextInput label="Last Name" {...register("lastName")} error={t(errors.lastName?.message)} />
        <Space h="md" />
        <TextInput label="Age" {...register("age")} error={errors.age?.message} />
        <Space h="md" />
        <Checkbox label="Send email notification" {...register("sendMessage")} />
        <Space h="md" />
        {isMessageEmailFieldVisible && <TextInput {...register("messageEmailAddress")} error={errors.messageEmailAddress?.message} />}
        <Space h="md" />
        <Text>{t("SomeText")}</Text>
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
