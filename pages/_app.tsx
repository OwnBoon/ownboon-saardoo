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
import { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import { useRouter } from "next/router";

import { ThemeProvider } from '../chat-components/providers/theme-provider'
import { ModalProvider } from '../chat-components/providers/modal-provider'
import { SocketProvider } from '../chat-components/providers/socket-provider'
import { QueryProvider } from '../chat-components/providers/query-provider'

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const { isBrowser } = useSSR();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    
    const handleRouteChangeEnd = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <RecoilRoot>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
          <SocketProvider>
              <ModalProvider />
              <QueryProvider>
          {isBrowser && (
            <div className="fade">
              {loading && <CustomLoader />}
              <Component setLoading={setLoading} {...pageProps} />
              <Analytics />
            </div>
          )}
          </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </ClerkProvider>
      </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
