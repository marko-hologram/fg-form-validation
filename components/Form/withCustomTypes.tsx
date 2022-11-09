import { Button, MultiSelect, Select, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import z from "zod";
import * as yup from "yup";
import { ResultBlock } from "../ResultBlock";

enum UserRole {
  Admin = "Admin",
  LibraryAdmin = "LibraryAdmin",
  Newbie = "Newbie",
  Guest = "Guest",
}

type User = {
  id: string;
  fullName: string;
  role: UserRole;
};

const usersArray: User[] = [
  { id: "1", fullName: "Jane Doe", role: UserRole.LibraryAdmin },
  { id: "2", fullName: "John Doe", role: UserRole.Guest },
  { id: "3", fullName: "Joe Pesci", role: UserRole.Admin },
];

const usersForSelect = usersArray.map((user) => {
  return {
    value: user.id,
    label: user.fullName,
  };
});

const userRolesForSelect = Object.keys(UserRole).map((key) => {
  return {
    value: key,
    label: UserRole[key],
  };
});

userRolesForSelect.push({ value: "InvalidRole", label: "Some Other Role" });

const customTypeZodSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().min(1, "First name is required"),
  role: z.nativeEnum(UserRole, {
    errorMap: (issue, ctx) => {
      let message = "User role is required";

      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        message = `User role must be one of the following values ${Object.values(UserRole).join(", ")}`;
      }

      return { message };
    },
  }),
});

type CustomTypeZodSchemaType = z.infer<typeof customTypeZodSchema>;

const customTypeYupSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().required("First name is required"),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole), `User role must be one of the following values ${Object.values(UserRole).join(", ")}`)
    .required("User role is required"),
  user: yup.array<User>().min(1, "At least one user must be selected").max(2, "Maximum of two users can be selected").required(),
});

type CustomTypeYupSchemaType = yup.InferType<typeof customTypeYupSchema>;

export const FormWithCustomTypes = () => {
  const [formData, setFormData] = useState<CustomTypeYupSchemaType | undefined>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<CustomTypeYupSchemaType>({
    // resolver: zodResolver(customTypeZodSchema),
    resolver: yupResolver(customTypeYupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      role: null,
      user: [],
    },
  });

  const handleValidSubmit: SubmitHandler<CustomTypeYupSchemaType> = (data) => {
    setFormData(data);
  };

  if (isSubmitSuccessful) {
    return <ResultBlock>{JSON.stringify(formData)}</ResultBlock>;
  }

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <TextInput label="First Name" {...register("firstName")} error={errors.firstName?.message} />
      <Space h="md" />
      <TextInput label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
      <Space h="md" />
      <Controller
        control={control}
        name="user"
        render={({ field }) => {
          return <MultiSelect label="User" data={usersForSelect} {...field} error={errors.user?.message} />;
        }}
      />
      <Space h="md" />
      <Controller
        control={control}
        name="role"
        render={({ field }) => {
          return <Select label="User role" data={userRolesForSelect} {...field} error={errors.role?.message} />;
        }}
      />
      <Space h="md" />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
