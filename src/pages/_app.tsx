import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import styled, { keyframes } from "styled-components";
import { api } from "@/utils/api";
import { fadeInUp } from "react-animations";
import "bootstrap/dist/css/bootstrap.css";

import "@/styles/globals.css";

const BodyFadeUp = styled.div`
  animation: ${keyframes`${fadeInUp}`} 1.5s;
`;

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <BodyFadeUp>
        <Component {...pageProps} />
      </BodyFadeUp>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
