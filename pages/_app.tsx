import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
