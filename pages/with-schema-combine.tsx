import { FormWithCombinedSchema } from "@/components";
import { Text, Title } from "@mantine/core";
import Head from "next/head";

export default function WithSchemaCombine() {
  return (
    <div>
      <Head>
        <title>React Hook Form With Validation Schema</title>
      </Head>

      <Title order={1}>With combined schema</Title>
      <Text fz="md" mb="xl">
        Uses "zod" or "yup" for validation.
      </Text>

      <FormWithCombinedSchema />
    </div>
  );
}
