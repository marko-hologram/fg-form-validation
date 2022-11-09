import { Box, createStyles } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const useHeaderStyles = createStyles((theme) => {
  return {
    header: {
      backgroundColor: theme.colors.blue[8],
      color: theme.white,
    },
    navList: {
      display: "flex",
      alignItems: "center",
      listStyle: "none",
    },
    navLink: {
      position: "relative",
      display: "block",
      padding: "1rem",

      "&::after": {
        content: "''",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 5,
        transform: "translateY(10px)",
        opacity: 0,
        transition: "0.15s all ease-in-out",
        backgroundColor: theme.colors.red[7],
      },

      "&:hover::after": {
        transform: "translateY(0)",
        opacity: 1,
      },
    },
    navLinkActive: {
      "&::after": {
        transform: "translateY(0)",
        opacity: 1,
      },
    },
  };
});

export const Header = () => {
  const { classes, cx } = useHeaderStyles();
  const router = useRouter();

  const checkIsLinkActive = (href: string) => router.asPath === href;

  return (
    <Box component="header" className={classes.header}>
      <nav>
        <ul className={classes.navList}>
          <li>
            <Link className={cx(classes.navLink, checkIsLinkActive("/") ? classes.navLinkActive : false)} href="/">
              No Schema
            </Link>
          </li>
          <li>
            <Link className={cx(classes.navLink, checkIsLinkActive("/with-schema") ? classes.navLinkActive : false)} href="/with-schema">
              With Schema
            </Link>
          </li>
          <li>
            <Link className={cx(classes.navLink, checkIsLinkActive("/with-regex") ? classes.navLinkActive : false)} href="/with-regex">
              Regex
            </Link>
          </li>
          <li>
            <Link
              className={cx(classes.navLink, checkIsLinkActive("/with-conditional-options") ? classes.navLinkActive : false)}
              href="/with-conditional-options"
            >
              Conditional
            </Link>
          </li>
          <li>
            <Link className={cx(classes.navLink, checkIsLinkActive("/with-translations") ? classes.navLinkActive : false)} href="/with-translations">
              With Translations
            </Link>
          </li>
          <li>
            <Link className={cx(classes.navLink, checkIsLinkActive("/with-custom-type") ? classes.navLinkActive : false)} href="/with-custom-type">
              Custom Type
            </Link>
          </li>
          <li>
            <Link className={cx(classes.navLink, checkIsLinkActive("/dynamic/5") ? classes.navLinkActive : false)} href="/dynamic/5">
              Dynamic (5)
            </Link>
          </li>
          <li>
            <Link className={cx(classes.navLink, checkIsLinkActive("/dynamic/16") ? classes.navLinkActive : false)} href="/dynamic/16">
              Dynamic (16)
            </Link>
          </li>
        </ul>
      </nav>
    </Box>
  );
};
