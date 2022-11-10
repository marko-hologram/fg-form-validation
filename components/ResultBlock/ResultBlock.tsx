import { createStyles } from "@mantine/core";
import { ReactNode } from "react";

type ResultBlockProps = {
  children: ReactNode;
};

const useResultBlockStyles = createStyles((theme) => {
  return {
    container: {
      overflowWrap: "break-word",
      backgroundColor: theme.colors.dark[6],
      color: theme.white,
      padding: theme.spacing.lg,
      borderRadius: theme.radius.md,
    },
    codeblock: {
      margin: 0,
      fontFamily: theme.fontFamilyMonospace,
    },
  };
});

export const ResultBlock = ({ children }: ResultBlockProps) => {
  const { classes } = useResultBlockStyles();

  return (
    <div className={classes.container}>
      <pre className={classes.codeblock}>{children}</pre>
    </div>
  );
};
