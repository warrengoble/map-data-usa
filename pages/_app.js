import React from "react";
import App from "next/app";

import { StoreProvider } from "../store";

import stylesAntd from "antd/dist/antd.css";

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
        <style jsx global>
          {stylesAntd}
        </style>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}
