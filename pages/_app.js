import React from "react";
import App from "next/app";

import { StoreProvider } from "../store";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <StoreProvider>
        <style jsx global>
          {`
            body {
              margin: 0;
              padding: 0;
            }
          `}
        </style>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}
