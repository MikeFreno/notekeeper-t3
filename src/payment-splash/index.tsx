import Head from "next/head";
import Link from "next/link";

import React from "react";

export default function PaymentSplash() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Keeper</title>
      </Head>
      <div>
        <div id="splash-screen">
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </div>
        <div
          className="relative flex flex-col justify-center text-center text-white"
          id="scroll"
        >
          <h2>Thanks!</h2>
          <p>
            Your support is greatly appreciated!
            <br />
            <Link className="edit-button bg-transparent" href={"/app"}>
              Back to the app
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
