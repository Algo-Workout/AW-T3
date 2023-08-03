'use client'
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "~/components/Layout";
import { getSession } from "next-auth/react";
import { useState, createContext } from "react";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // const validSession = getSession();
  // const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // if (validSession) {
  //   setLoggedIn(true);
  // } else {
  //   setLoggedIn(false);
  // }
  const LoginContext = createContext(false);

  return (
    // <LoginContext.Provider value = {loggedIn}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    // </LoginContext.Provider>
  );
};
// Test PR
export default MyApp;
