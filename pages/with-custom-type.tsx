import { FormWithCustomTypes } from "@/components";
import { Text, Title } from "@mantine/core";
import Head from "next/head";

export default function WithSchemaRegex() {
  return (
    <div>
      <Head>
        <title>React Hook Form with custom types in validation schema</title>
      </Head>

      <Title order={1}>With custom types</Title>
      <Text fz="md" mb="xl">
        Uses "zod" or "yup" and validates certain custom type fields.
      </Text>

      <FormWithCustomTypes />
    </div>
  );
}
