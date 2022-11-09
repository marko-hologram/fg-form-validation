import { FormWithTranslationSchema } from "@/components";
import { Text, Title } from "@mantine/core";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default function WithSchema() {
  return (
    <div>
      <Head>
        <title>React Hook Form With Error Translation</title>
      </Head>

      <Title order={1}>With translations</Title>
      <Text fz="md" mb="xl">
        Uses "zod" or "yup" for validation with translated errors.
      </Text>

      <FormWithTranslationSchema />
    </div>
  );
}
