import { FormWithSchemaRegex } from "@/components";
import { Text, Title } from "@mantine/core";
import Head from "next/head";

export default function WithSchemaRegex() {
  return (
    <div>
      <Head>
        <title>React Hook Form With Regex Properties in Validation Schema</title>
      </Head>

      <Title order={1}>With regex</Title>
      <Text fz="md" mb="xl">
        Uses "zod" or "yup" and validates certain fields with regex.
      </Text>

      <FormWithSchemaRegex />
    </div>
  );
}
