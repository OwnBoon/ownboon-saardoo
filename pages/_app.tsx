import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/react-quill.css";
import "../styles/prism.css";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { ClerkProvider } from "@clerk/nextjs";
import { RecoilRoot } from "recoil";
import "reactflow/dist/style.css";
import { useSSR } from "@nextui-org/react";
import { createTheme, NextUIProvider, Text } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import { useRouter } from "next/router";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../styles/nprogress.css";
import SpotifyEmbed from "../components/lofi/Spotify/SpotifyEmbed";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const { isBrowser } = useSSR();
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  // useEffect(() => {
  //   const handleRouteChangeStart = () => {
  //     setLoading(true);
  //   };

  //   const handleRouteChangeEnd = () => {
  //     setLoading(false);
  //   };

  //   router.events.on("routeChangeStart", handleRouteChangeStart);
  //   router.events.on("routeChangeComplete", handleRouteChangeEnd);
  //   router.events.on("routeChangeError", handleRouteChangeEnd);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //     router.events.off("routeChangeComplete", handleRouteChangeEnd);
  //     router.events.off("routeChangeError", handleRouteChangeEnd);
  //   };
  // }, [router]);

  return (
    <Provider store={store}>
      <RecoilRoot>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          {isBrowser && (
            <div className="fade">
              {loading && <CustomLoader />}
              <Component setLoading={setLoading} {...pageProps} />
              <Analytics />


              <SpotifyEmbed />
            </div>
          )}
        </ClerkProvider>
      </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
