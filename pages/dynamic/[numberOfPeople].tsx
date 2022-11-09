import { FormWithDynamicSchema } from "@/components";
import { Text, Title } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";

export default function WithDynamicValidation() {
  const router = useRouter();

  if (!router.query.numberOfPeople) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>React Hook Form With Dynamic Validation Schema</title>
      </Head>

      <Title order={1}>With dynamic schema</Title>
      <Text fz="md" mb="xl">
        Uses "zod" or "yup" for validation, but constructs schema based on some input values.
      </Text>

      <FormWithDynamicSchema minNumberOfPeople={Number(router.query.numberOfPeople)} />
    </div>
  );
}
