import Head from "next/head";
import { BasicForm, Header } from "@/components";
import { Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <div>
      <Head>
        <title>React Hook Form showcase</title>
      </Head>

      <Title order={1}>Basic Form</Title>
      <Text fz="md" mb="xl">
        Basic form powered by react-hook-form. Without any external validation.
      </Text>

      <BasicForm />
    </div>
  );
}
