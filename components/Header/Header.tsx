import Link from "next/link";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navLink} href="/">
              No Schema
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/with-schema">
              With Schema
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/with-regex">
              Regex
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/with-conditional-options">
              Conditional
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/with-translations">
              With Translations
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/dynamic/5">
              Dynamic (5)
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/dynamic/16">
              Dynamic (16)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
