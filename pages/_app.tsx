import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ClerkProvider } from "@clerk/nextjs";
function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Component {...pageProps} />
      </ClerkProvider>
    </Provider>
  );
}

export default MyApp;
