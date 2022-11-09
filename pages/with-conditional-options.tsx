import { FormWithConditionalSchema } from "@/components";
import { Text, Title } from "@mantine/core";
import Head from "next/head";

export default function WithConditionalSchema() {
  return (
    <div>
      <Head>
        <title>React Hook Form With Conditional Validation Schema</title>
      </Head>

      <Title order={1}>With basic schema</Title>
      <Text fz="md" mb="xl">
        Uses "zod" or "yup" for validation with conditional fields.
      </Text>

      <FormWithConditionalSchema />
    </div>
  );
}
