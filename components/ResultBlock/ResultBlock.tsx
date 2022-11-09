import { ReactNode } from "react";

import styles from "./ResultBlock.module.css";

type ResultBlockProps = {
  children: ReactNode;
};

export const ResultBlock = ({ children }: ResultBlockProps) => {
  return <code className={styles.block}>{children}</code>;
};
