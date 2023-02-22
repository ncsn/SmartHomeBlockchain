import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";

const LayoutAuth = (props) => {
  return (
    <div>
      <Container>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          ></link>
          <link rel="icon" href="/favicon.png?" type="image/x-icon"/>
          <title>Smarthome</title>
        </Head>
        {props.children}
      </Container>
    </div>
  );
};
export default LayoutAuth;
