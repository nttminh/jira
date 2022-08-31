import React, { ReactNode } from "react";
import Container from "@mui/material/Container";
import Head from "next/head";
import styles from "./styles.module.scss";
interface Props {
  children?: ReactNode;
  title?: string;
  // any props that come into the component
}

const Template = (props: Props) => {
  return (
    <Container maxWidth="lg" className={styles.container}>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
    </Container>
  );
};

export default Template;
