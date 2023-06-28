import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import "../styles/prism.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ClerkProvider } from "@clerk/nextjs";
import { RecoilRoot } from "recoil";
import "reactflow/dist/style.css";
import { useSSR } from "@nextui-org/react";
import "../styles/chats.scss";
import { createTheme, NextUIProvider, Text } from "@nextui-org/react";
import { Analytics } from '@vercel/analytics/react'
function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const { isBrowser } = useSSR();
  return (
    <Provider store={store}>
      <RecoilRoot>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          {isBrowser && <Component {...pageProps} />}
          <Analytics />
        </ClerkProvider>
      </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
