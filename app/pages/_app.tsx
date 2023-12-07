import Header from "components/header/header";
import LoadingIndicator from "components/indicator/loadingIndicator";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { wrapper } from "src/redux/store";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  useEffect(() => {
    window.localStorage.sender = `/admin/id:${new Date().getTime()}`;
  }, []);

  return (
    <Provider store={store}>
      <LoadingIndicator />
      <Header />
      <Component {...props.pageProps} />
    </Provider>
  );
}
